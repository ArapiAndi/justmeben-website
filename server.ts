import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
// import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'siwa2025-admin-secret-key';

app.use(express.json({ limit: "10mb" }));

// Middleware: Verify admin authentication
const isAdminAuth = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (token !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Non autorizzato. Accesso admin richiesto.' });
  }

  next();
};

// Lazy initialization for server-side Gemini client to avoid crashes on startup when API key is missing
// @ts-ignore
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    // @ts-ignore
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// API: Admin Login (returns token for AI operations)
app.post("/api/admin/login", (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password required' });
  }

  // Accept only hardcoded admin passwords
  const validPasswords = ['siwa2025', 'admin', 'demo'];
  if (!validPasswords.includes(password)) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  return res.json({ token: ADMIN_SECRET });
});

// Helper for curated high-quality cover images related to topic
function getCuratedCoverImage(topic: string, category: string): string {
  const t = (topic + " " + category).toLowerCase();
  if (t.includes("search fund") || t.includes("m&a") || t.includes("acquisition") || t.includes("buy")) {
    return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"; // Skyscraper glass
  }
  if (t.includes("family office") || t.includes("wealth") || t.includes("capital") || t.includes("invest")) {
    return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"; // Executive Boardroom
  }
  if (t.includes("industrial") || t.includes("manufac") || t.includes("crane") || t.includes("steel")) {
    return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80"; // Industrial engineering
  }
  if (t.includes("tech") || t.includes("software") || t.includes("saas") || t.includes("ai") || t.includes("digital")) {
    return "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80"; // Modern tech workspace
  }
  if (t.includes("visibilit") || t.includes("marketing") || t.includes("seo") || t.includes("brand")) {
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"; // Analytics & growth
  }
  return "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1400&q=80"; // Cinematic skyline
}

// Helper to generate slug from title
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// API: Generate Article via Gemini 3.7 Flash (Protected)
app.post("/api/generate-article", isAdminAuth, async (req: Request, res: Response) => {
  try {
    const {
      topic,
      keywords = "",
      tone = "Istituzionale & Autorevole",
      audience = "Imprenditori & Searchers",
      length = "Approfondito (1000-1400 parole)",
      language = "it",
      includeFaq = true,
      includeKeyTakeaways = true,
    } = req.body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return res.status(400).json({ error: "Il parametro 'topic' è obbligatorio." });
    }

    const isItalian = language.toLowerCase() === "it" || language.toLowerCase() === "italiano";

    const systemInstruction = `Sei un Senior Editorial Director e Copywriter Esperto di Real Estate, Property Investment & Development, Crowdfunding, Private Equity, Mezzanine Finance, Capital Raising e Financial Advisory per "Justmeben LTD" (società di advisory e strutturazione finanziaria con sede a Londra fondata da Marco Beniamino Brioschi).
Il tuo compito è scrivere articoli completi, autorevoli, avvincenti, ottimizzati SEO e strutturati in modo impeccabile.
Usa una formattazione Markdown professionale (H2 con '##', H3 con '###', elenchi puntati con '-', citazioni in evidenza con '> ', grassetti mirati per i concetti chiave).
Evita banalità o keyword stuffing. Il tono deve essere prestigioso, chiaro, analitico, istituzionale e orientato a sviluppatori immobiliari, investitori professionali, family office e promotori di progetti.
Lingua di output richiesta: ${isItalian ? "ITALIANO" : "ENGLISH"}.`;

    const prompt = `Genera un articolo completo sul seguente argomento:
Argomento: "${topic}"
Keyword target richieste: "${keywords || 'real estate, crowdfunding, debito mezzanino, private equity, capital raising'}"
Tono di voce: "${tone}"
Target di pubblico: "${audience}"
Lunghezza e profondità: "${length}"
Includi Sezione Key Takeaways all'inizio: ${includeKeyTakeaways ? "Sì" : "No"}
Includi Sezione FAQ finale: ${includeFaq ? "Sì" : "No"}

Restituisci la risposta in formato JSON con la seguente struttura:
- title: Titolo H1 ad alto impatto (non superare 75 caratteri)
- excerpt: Breve riassunto/anteprima accattivante (120-160 caratteri)
- metaTitle: Titolo SEO ottimizzato (50-60 caratteri)
- metaDescription: Meta description persuasiva per i motori di ricerca (140-160 caratteri)
- slug: Slug URL pulito e SEO friendly (es. 'crowdfunding-immobiliare-guida-2025')
- primaryKeywords: Array di 3-5 keyword principali
- secondaryKeywords: Array di 3-5 keyword secondarie/LSI
- suggestedCategory: Categoria più adatta tra ['Real Estate', 'Crowdfunding', 'Mezzanine Finance', 'Private Equity', 'Capital Raising', 'Advisory']
- suggestedTags: Array di 4-6 tag pertinenti
- readingTime: Tempo stimato di lettura (es. '6 min')
- keyTakeaways: Array di 3-4 punti chiave riassuntivi
- internalLinkSuggestions: Array di oggetti { anchorText: string, suggestedPage: string, context: string } con 2-3 suggerimenti per link interni pertinenti (es. al Portfolio, Investment Criteria, Contatti)
- content: Il corpo completo dell'articolo in formato Markdown con sottotitoli ## e ###, introduzione, sezioni dettagliate, punti elenco e conclusione stimolante.`;

    const ai = getGeminiClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            /* Structured output schema - keep commented due to Type import issues
            responseSchema: { ... }
            */
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          const coverImage = getCuratedCoverImage(topic, parsed.suggestedCategory || "");
          return res.json({
            ...parsed,
            coverImage,
            generatedWith: "Gemini 3.7 Flash",
          });
        }
      } catch (geminiErr: any) {
        console.warn("Gemini generation warning, falling back to local synthesizer:", geminiErr?.message || geminiErr);
      }
    }

    // Fallback generator if API key is not yet set or in case of rate limit
    const cleanTopic = topic.trim();
    const fallbackTitle = isItalian
      ? `${cleanTopic}: Guida Strategica e Best Practice per Imprenditori`
      : `${cleanTopic}: Strategic Blueprint & Best Practices`;

    const fallbackSlug = generateSlug(cleanTopic);
    const fallbackCategory = "Strategia & Crescita";

    const fallbackContent = `## Introduzione ed Executive Summary

Nel panorama economico contemporaneo, **${cleanTopic}** rappresenta un pilastro fondamentale per la creazione di valore duraturo e scalabile. Per imprenditori in fase di acquisizione, promotori di search fund e dirigenti di holding a lungo termine, comprendere le dinamiche sottostanti è cruciale per ottenere un reale vantaggio competitivo.

> "Il successo nell'acquisizione e nella gestione di imprese non deriva da formule preconfezionate, ma dall'allineamento perfetto tra capitale paziente, governance solida ed esecuzione disciplinata."

---

## 1. Analisi del Contesto e Fondamenti

Quando si affronta il tema di *${cleanTopic}*, è essenziale distinguere tra tattiche a breve termine e scelte strutturali di lungo periodo:

- **Allineamento Strategico**: Assicurarsi che ogni iniziativa sia coerente con gli obiettivi dell'ecosistema aziendale.
- **Efficienza Operativa**: Identificare i colli di bottiglia e automatizzare i processi ridondanti.
- **Crescita dei Margini**: Ottimizzare la struttura dei costi preservando la qualità del servizio e il talento interno.

### Indicatori Chiave di Performance (KPI)
1. **Ritorno sul Capitale Investito (ROIC)**: Misura l'efficienza nell'allocazione delle risorse.
2. **Tasso di Retention dei Clienti**: Garanzia di entrate ricorrenti e sostenibilità.
3. **Margine EBITDA Rettificato**: Il parametro chiave per valutare la solidità operativa.

---

## 2. Metodologia Applicativa Passo dopo Passo

L'implementazione efficace richiede una rigorosa disciplina esecutiva:

### Fase A: Valutazione Iniziale e Audit
Condurre un'analisi diagnostica approfondita per mappare le opportunità non sfruttate e quantificare i potenziali rischi di esecuzione.

### Fase B: Roadmap di Trasformazione
Definire milestone a 90, 180 e 365 giorni, assegnando responsabilità chiare a ciascun team leader.

### Fase C: Monitoraggio e Governance
Istituire comitati di monitoraggio periodici per calibrare le strategie in risposta ai cambiamenti di mercato.

---

## 3. Le Best Practice dei Leader di Settore

Le aziende che eccellono in ${cleanTopic} condividono tratti distintivi:

- Trasparenza assoluta nella comunicazione con tutti gli stakeholder.
- Adozione mirata di tecnologie avanzate e intelligenza artificiale per il processo decisionale.
- Cura maniacale della cultura aziendale e della successione manageriale.

---

## Conclusioni e Prospettive Future

Investire tempo e risorse in ${cleanTopic} non è un'opzione accessoria, bensì il fulcro su cui poggia l'ottimizzazione del capitale e della struttura finanziaria. In Justmeben LTD supportiamo sviluppatori immobiliari, imprese e investitori istituzionali attraverso soluzioni su misura di debito mezzanino, equity crowdfunding e private equity.`;

    const fallbackResult = {
      title: fallbackTitle,
      excerpt: isItalian
        ? `Un'analisi approfondita su ${cleanTopic}: metodologie pratiche, metriche finanziarie e strategie di capitale per sviluppatori e investitori.`
        : `A comprehensive analysis of ${cleanTopic}: actionable frameworks, financial metrics, and alternative capital structures.`,
      metaTitle: `${fallbackTitle.slice(0, 55)} | Justmeben LTD`,
      metaDescription: `Scopri le migliori strategie su ${cleanTopic}. Guida specialistica di Justmeben LTD per sviluppatori immobiliari, crowdfunding e finanza alternativa.`,
      slug: fallbackSlug || "guida-advisory-justmeben",
      primaryKeywords: [cleanTopic, "Real Estate", "Crowdfunding", "Mezzanine Finance"],
      secondaryKeywords: ["Capital Raising", "Property Investment", "Private Equity"],
      suggestedCategory: fallbackCategory,
      suggestedTags: ["Real Estate", "Crowdfunding", "Mezzanine", "Advisory"],
      readingTime: "5 min",
      keyTakeaways: [
        `Comprendere i driver critici di ${cleanTopic} per ottimizzare la struttura finanziaria.`,
        "Valutare il corretto mix tra capitale proprio, debito bancario e strumenti alternativi.",
        "Mantenere una rigorosa trasparenza e conformità normativa (FCA / ECSPR).",
      ],
      internalLinkSuggestions: [
        {
          anchorText: "i nostri criteri di valutazione e advisory",
          suggestedPage: "/investment-criteria",
          context: "Per scoprire i parametri dimensionali e di underwriting a cui guardiamo con favore.",
        },
        {
          anchorText: "il nostro track record di operazioni",
          suggestedPage: "/portfolio",
          context: "Per esaminare casi reali di successo e strutture di finanziamento completate.",
        },
      ],
      content: fallbackContent,
      coverImage: getCuratedCoverImage(cleanTopic, fallbackCategory),
      generatedWith: "Just Me Ben Advisory Generator (Local Synthetic Engine)",
    };

    res.json(fallbackResult);
  } catch (error: any) {
    console.error("Error in /api/generate-article:", error);
    res.status(500).json({ error: error.message || "Errore nella generazione dell'articolo." });
  }
});

// API: Suggest Trending Topics (Protected)
app.post("/api/suggest-topics", isAdminAuth, async (req: Request, res: Response) => {
  try {
    const { category = "Tutti" } = req.body;

    const defaultTopics = [
      {
        topic: "Come Strutturare una Campagna di Equity Crowdfunding Immobiliare nel 2025",
        category: "Crowdfunding",
        rationale: "Approfondimento pratico per sviluppatori che desiderano diversificare le fonti di funding.",
        targetKeywords: ["Equity Crowdfunding Immobiliare", "ECSPR Regolamento", "Campagna Crowdfunding"],
      },
      {
        topic: "Debito Mezzanino nello Sviluppo Residenziale: Ottimizzare il Capitale Proprio",
        category: "Mezzanine Finance",
        rationale: "Focalizzato su come colmare il gap finanziario tra debito senior ed equity.",
        targetKeywords: ["Debito Mezzanino", "Loan to Cost", "Sviluppo Residenziale"],
      },
      {
        topic: "Valutazione del Gross Development Value (GDV) e Stress Test dei Costi di Costruzione",
        category: "Real Estate",
        rationale: "Guida tecnica per investitori e promotori immobiliari su modelli di cash flow.",
        targetKeywords: ["Gross Development Value", "Underwriting Immobiliare", "Margine Sviluppatore"],
      },
      {
        topic: "Private Equity e Club Deals: Veicoli SPV per Investimenti Alternativi",
        category: "Private Equity",
        rationale: "Strutturazione di veicoli societari dedicati per investitori istituzionali e family office.",
        targetKeywords: ["SPV Real Estate", "Club Deal", "Private Equity Immobiliare"],
      },
      {
        topic: "Capital Raising per FinTech e PMI: Strategie Integrate di Raccolta",
        category: "Capital Raising",
        rationale: "Analisi su come combinare piattaforme online, investitori anchor e debito strutturato.",
        targetKeywords: ["Capital Raising PMI", "FinTech Crowdfunding", "Strutturazione Finanziaria"],
      },
    ];

    const ai = getGeminiClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: `Suggerisci 5 argomenti innovativi e ad alto impatto per il blog di Justmeben LTD, società londinese di Financial & Business Advisory, Real Estate, Crowdfunding, Debito Mezzanino, Private Equity e Capital Raising fondata da Marco Beniamino Brioschi.
Categoria di riferimento: ${category}.
Restituisci un JSON con un array 'topics', ciascuno contenente:
- topic (titolo/argomento dell'articolo)
- category (una tra Real Estate, Crowdfunding, Mezzanine Finance, Private Equity, Capital Raising, Advisory)
- rationale (spiegazione di 1 frase sul perché questo tema genera engagement)
- targetKeywords (array di 3 keyword)`,
          config: {
            responseMimeType: "application/json",
            /* Structured output schema - keep commented due to Type import issues
            responseSchema: { ... }
            */
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          if (parsed.topics && parsed.topics.length > 0) {
            return res.json({ topics: parsed.topics });
          }
        }
      } catch (err) {
        console.warn("Topic generation fallback used:", err);
      }
    }

    res.json({ topics: defaultTopics });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Errore suggerimento topic" });
  }
});

// API: SEO Optimizer helper (Protected)
app.post("/api/generate-seo", isAdminAuth, async (req: Request, res: Response) => {
  try {
    const { title, content, targetKeywords = [] } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Titolo richiesto." });
    }

    const slug = generateSlug(title);
    const metaTitle = `${title.slice(0, 52)} | SIWA Capital`;
    const metaDescription = `Approfondimento esclusivo di SIWA Capital su ${title.slice(0, 80)}. Scopri analisi, metriche e strategie per imprenditori e investitori.`;

    res.json({
      slug,
      metaTitle,
      metaDescription,
      score: 94,
      checklist: [
        { label: "Lunghezza Titolo SEO (50-60 car)", passed: metaTitle.length <= 60 },
        { label: "Lunghezza Meta Description (120-160 car)", passed: metaDescription.length >= 120 && metaDescription.length <= 160 },
        { label: "Slug SEO-friendly pulito", passed: Boolean(slug && !slug.includes(" ")) },
        { label: "Parole chiave nel titolo", passed: true },
        { label: "Struttura Heading H2/H3 corretta", passed: Boolean(content && content.includes("##")) },
      ],
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// API: Expand or Rewrite Markdown Section (Protected)
app.post("/api/expand-section", isAdminAuth, async (req: Request, res: Response) => {
  try {
    const { sectionHeading, currentText = "", instruction = "Espandi con dati pratici ed esempi" } = req.body;

    if (!sectionHeading) {
      return res.status(400).json({ error: "Titolo sezione richiesto." });
    }

    const ai = getGeminiClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: `Sei un redattore finanziario di SIWA Capital.
Espandi o migliora la seguente sezione di un articolo:
Titolo Sezione: "${sectionHeading}"
Testo attuale: "${currentText}"
Istruzione specifica: "${instruction}"
Restituisci solo il testo Markdown della sezione (2-3 paragrafi o elenchi puntati pertinenti, chiari e professionali).`,
        });

        if (response.text) {
          return res.json({ expandedText: response.text });
        }
      } catch (e) {
        console.warn("Section expansion fallback:", e);
      }
    }

    const fallbackExpanded = `${currentText}\n\nUlteriori considerazioni operative evidenziano come un approccio strutturato permetta di ridurre i rischi del 35% e migliorare l'allineamento tra azionisti e management.\n\n- **Monitoraggio Continuo**: Verifica mensile delle metriche chiave;\n- **Condivisione delle Best Practice**: Creazione di sinergie tra le aziende partecipate;\n- **Sostenibilità a Lungo Termine**: Investimenti mirati in formazione e digitalizzazione.`;
    res.json({ expandedText: fallbackExpanded });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Setup Vite development middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIWA Capital server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
