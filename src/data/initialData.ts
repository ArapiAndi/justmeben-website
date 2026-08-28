import { BlogPost, BlogCategory, PortfolioItem, InvestmentCriterion, TeamMember } from '../types';

export const INITIAL_CATEGORIES: BlogCategory[] = [
  {
    id: 'cat-1',
    name: 'Real Estate & Sviluppo',
    slug: 'real-estate-sviluppo',
    description: 'Underwriting, sviluppo immobiliare residenziale e commerciale, e valorizzazione asset.',
    color: '#0284C7',
    articleCount: 4,
  },
  {
    id: 'cat-2',
    name: 'Crowdfunding Advisory',
    slug: 'crowdfunding-advisory',
    description: 'Campagne di equity e debt crowdfunding, conformità normativa FCA/ECSPR e investor relations.',
    color: '#3B82F6',
    articleCount: 6,
  },
  {
    id: 'cat-3',
    name: 'Mezzanine Finance & Debito',
    slug: 'mezzanine-finance-debito',
    description: 'Strutturazione del capital stack, debito mezzanino e bridge financing per colmare il funding gap.',
    color: '#8B5CF6',
    articleCount: 4,
  },
  {
    id: 'cat-4',
    name: 'Private Equity & Venture',
    slug: 'private-equity-venture',
    description: 'Co-investimenti, veicoli speciali (SPV), aumento di capitale e strategie di crescita aziendale.',
    color: '#10B981',
    articleCount: 3,
  },
  {
    id: 'cat-5',
    name: 'Financial & Business Advisory',
    slug: 'financial-business-advisory',
    description: 'Modellizzazione finanziaria, pianificazione strategica, governance e capital raising.',
    color: '#F59E0B',
    articleCount: 6,
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Guida al Crowdfunding Immobiliare: Strutturazione, Regolamentazione e Best Practice',
    slug: 'guida-crowdfunding-immobiliare-strutturazione-regolamentazione',
    excerpt: "Dall'analisi di fattibilità alla syndication con investitori anchor: come massimizzare il successo di una campagna di real estate crowdfunding conforme alle normative europee ed UK.",
    content: `## Executive Summary & Introduzione
Nel moderno ecosistema dei mercati dei capitali, il **Crowdfunding Immobiliare** (nelle sue declinazioni Equity e Debt) ha smesso di essere un canale sperimentale per diventare una componente stabile e complementare della struttura finanziaria degli sviluppatori immobiliari.

Per promotori e investitori istituzionali, combinare il crowdfunding con linee di credito senior consente di ridurre l'equity iniziale richiesto, diversificare le fonti di funding e accelerare il time-to-market.

> "Una campagna di crowdfunding non si vince con il marketing di superficie, ma con un solido underwriting immobiliare, una governance trasparente e un capital stack calibrato al millimetro."

---

## 1. Architettura della Campagna e Posizionamento Normativo

Una preparazione di livello istituzionale richiede il presidio di 4 aree cardine:
- **Scelta della Tipologia di Strumento**: Equity (partecipazione al veicolo SPV) vs. Debt/P2P (prestito obbligazionario o contrattuale con rendimento cedolare fisso).
- **Conformità Regolamentare**: Rispetto dei quadri normativi FCA nel Regno Unito e del regolamento europeo ECSPR (European Crowdfunding Service Providers Regulation).
- **Trasparenza Documentale (KIIS / Prospectus)**: Scheda informativa chiave sull'investimento, risk disclosure e business plan dettagliato.
- **Struttura di Garanzia**: Pegno su quote, ipoteca di secondo grado o debentures a tutela degli investitori.

---

## 2. La Regola del 30% nel Pre-Launch
I dati storici evidenziano che oltre l'85% delle campagne di successo raccoglie almeno il **30-40% del target totale** durante la fase privata di pre-lancio da investitori cornerstone e partner strategici prima dell'apertura al pubblico.

1. **Cornerstone Syndication**: Coinvolgimento preventivo di family office e high-net-worth individuals (HNWI).
2. **Materiali di Conversione**: Pitch deck ad alta leggibilità, video-tour del cantiere e computo metrico validato.
3. **Escrow Account & Milestone Release**: Rilascio dei fondi legato all'avanzamento effettivo dei lavori (SAL).

---

## 3. L'Approccio di Justmeben LTD
In Justmeben LTD affianchiamo promotori e sviluppatori nell'intero ciclo di vita: dalla validazione economica del cantiere alla selezione della piattaforma idonea, fino alla gestione delle relazioni con gli investitori post-chiusura.`,
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    category: 'Crowdfunding Advisory',
    tags: ['Crowdfunding', 'Real Estate', 'Capital Raising', 'FCA Compliance', 'ECSPR'],
    author: {
      name: 'Marco Beniamino Brioschi',
      role: 'Founder & Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    readingTime: '6 min',
    status: 'published',
    publishedAt: '2025-02-18T10:00:00.000Z',
    createdAt: '2025-02-18T09:30:00.000Z',
    updatedAt: '2025-02-18T10:00:00.000Z',
    metaTitle: 'Guida al Crowdfunding Immobiliare & Advisory | Justmeben LTD',
    metaDescription: 'Analisi strategica su come strutturare una campagna di crowdfunding immobiliare conforme ed efficace secondo Justmeben LTD.',
    primaryKeywords: ['Crowdfunding Immobiliare', 'Capital Raising', 'Real Estate Advisory'],
    secondaryKeywords: ['Mezzanine Debt', 'Property Investment', 'FCA Regulated'],
    keyTakeaways: [
      "Il crowdfunding immobiliare ottimizza il capital stack e abbatte l'assorbimento di equity puro.",
      "Raccogliere il 30-40% del target nel pre-launch privato è cruciale per la credibilità pubblica.",
      "La governance trasparente e i conti vincolati (escrow) proteggono sponsor e sottoscrittori.",
    ],
    internalLinkSuggestions: [
      {
        anchorText: 'i nostri parametri di investimento e advisory',
        suggestedPage: '/investment-criteria',
        context: 'Per comprendere i criteri di ammissibilità dei progetti immobiliari.',
      },
      {
        anchorText: 'i casi studio e opportunità selezionate',
        suggestedPage: '/portfolio',
        context: 'Per visualizzare le operazioni precedentemente strutturate.',
      },
    ],
    viewsCount: 1650,
    featured: true,
  },
  {
    id: 'post-2',
    title: 'Il Mezzanine Finance nello Sviluppo Immobiliare: Ottimizzazione del Capital Stack',
    slug: 'mezzanine-finance-sviluppo-immobiliare-capital-stack',
    excerpt: 'Come colmare il divario tra debito bancario senior ed equity dello sponsor, preservando il controllo azionario e massimizzando il rendimento IRR.',
    content: `## Cos'è il Finanziamento Mezzanino e Perché è Strategico
Negli ultimi anni gli istituti di credito tradizionali hanno progressivamente ridotto la propria propensione al rischio, abbassando i limiti di Loan-to-Cost (LTC) al 55-65%.

Il **Mezzanine Finance** si inserisce esattamente tra il debito bancario senior (garantito da ipoteca di primo grado) e il capitale proprio dello sviluppatore (common equity).

### Benefici Strutturali per lo Sviluppatore
1. **Minore Diluizione del Capitale**: Lo sviluppatore mantiene la quota di maggioranza e la maggior parte del capital gain finale.
2. **Maggiore Flessibilità Finanziaria**: Struttura cedolare adattabile (Cash interest, Payment-in-Kind o Warrants).
3. **Velocità di Erogazione**: Gestito da fondi di private debt e family office con iter deliberativi più rapidi rispetto al canale bancario.

---

## Esempio di Capital Stack Ottimizzato
- **Senior Debt (Bank Loan)**: 60% del Gross Development Cost
- **Mezzanine Capital (Just Me Ben Syndication)**: 20-25% del Gross Development Cost
- **Developer Equity**: 15-20% del Gross Development Cost

Questo assetto consente agli sviluppatori di strutturare in modo equilibrato le fonti di finanziamento, distribuendo il rischio operativo tra multiple parti.`,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    category: 'Mezzanine Finance & Debito',
    tags: ['Mezzanine Finance', 'Capital Stack', 'Private Debt', 'Sviluppo Immobiliare'],
    author: {
      name: 'Marco Beniamino Brioschi',
      role: 'Founder & Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    readingTime: '5 min',
    status: 'published',
    publishedAt: '2025-02-10T14:30:00.000Z',
    createdAt: '2025-02-10T11:00:00.000Z',
    updatedAt: '2025-02-10T14:30:00.000Z',
    metaTitle: 'Mezzanine Finance nello Sviluppo Immobiliare | Justmeben LTD',
    metaDescription: 'Analisi sul debito mezzanino e ottimizzazione del capital stack per sviluppatori e investitori.',
    primaryKeywords: ['Mezzanine Finance', 'Capital Stack', 'Debito Mezzanino'],
    secondaryKeywords: ['Sviluppo Immobiliare', 'Funding Gap', 'LTV'],
    keyTakeaways: [
      "Il debito mezzanino colma il gap fino all'80-85% del LTC complessivo.",
      "Le cedole PIK evitano uscite di cassa anticipate durante la fase di costruzione.",
      "Permette agli sviluppatori di moltiplicare la capacità di scaling dei cantieri.",
    ],
    viewsCount: 1220,
    featured: false,
  },
  {
    id: 'post-3',
    title: 'Metodologie di Underwriting e Due Diligence per Investimenti Immobiliari Complessi',
    slug: 'metodologie-underwriting-due-diligence-investimenti-immobiliari',
    excerpt: 'I 4 livelli di verifica tecnica, legale, finanziaria e urbanistica per mitigare il rischio di ribasso e garantire la bancabilità.',
    content: `## Il Rigore nell'Analisi del Rischio
Ogni investimento o raccolta di capitale deve superare un processo di screening quantitativo e qualitativo prima di essere proposta a partner e investitori.

---

## I 4 Pilastri del Protocollo Justmeben LTD
1. **Due Diligence Urbanistica e Tecnica**: Verifica titoli edilizi, vincoli paesaggistici, bonifiche e perizie con tecnici abilitati.
2. **Stress Testing Finanziario**: Simulazione di scenari avversi (incremento tassi d'interesse +200bps, ritardo vendite +6 mesi, extracosti di costruzione +15%).
3. **Analisi del Mercato Locale**: Valutazione dei prezzi di vendita al mq effettivi (comparabili registrati) e tempo medio di assorbimento (absorption rate).
4. **Audit della Controparte**: Solidità finanziaria del general contractor e copertura assicurativa decennale postuma.`,
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80',
    category: 'Real Estate & Sviluppo',
    tags: ['Underwriting', 'Due Diligence', 'Risk Management', 'Real Estate'],
    author: {
      name: 'Marco Beniamino Brioschi',
      role: 'Founder & Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    readingTime: '5 min',
    status: 'published',
    publishedAt: '2025-01-28T09:00:00.000Z',
    createdAt: '2025-01-28T08:00:00.000Z',
    updatedAt: '2025-01-28T09:00:00.000Z',
    metaTitle: 'Underwriting e Due Diligence Immobiliare | Justmeben LTD',
    metaDescription: 'La metodologia di valutazione e controllo dei rischi nelle operazioni immobiliari e di private equity.',
    primaryKeywords: ['Underwriting Immobiliare', 'Due Diligence', 'Risk Management'],
    secondaryKeywords: ['Stress Testing', 'Valutazione GDV', 'Real Estate'],
    viewsCount: 1340,
    featured: false,
  },
  {
    id: 'post-4',
    title: 'Private Equity e Co-Investimenti: La Convergenza tra Family Office e Club Deal',
    slug: 'private-equity-co-investimenti-family-office-club-deal',
    excerpt: 'Perché la syndication diretta e i club deal offrono maggiore allineamento di interessi e costi commissionali inferiori rispetto ai fondi tradizionali.',
    content: `## L'Evoluzione dei Club Deal
Sempre più family office e investitori professionali preferiscono partecipare a singoli deal specifici (deal-by-deal co-investment) piuttosto che vincolare capitale in fondi di private equity ciechi a 10 anni (blind pools).

### I Vantaggi Chiave:
- **Discrezione e Controllo Totale**: Possibilità di approvare singolarmente ciascun asset o azienda partecipata.
- **Struttura di Gestione Trasparente**: Definizione chiara della governance e della ripartizione delle responsabilità di gestione.
- **Allineamento di Interessi**: Sponsor e advisor partecipano attivamente al progetto al fianco dei consulenti.`,
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    category: 'Private Equity & Venture',
    tags: ['Private Equity', 'Club Deal', 'Family Office', 'Co-Investimenti'],
    author: {
      name: 'Marco Beniamino Brioschi',
      role: 'Founder & Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    readingTime: '4 min',
    status: 'published',
    publishedAt: '2025-01-15T11:00:00.000Z',
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-01-15T11:00:00.000Z',
    metaTitle: 'Private Equity e Club Deal Immobiliari | Justmeben LTD',
    metaDescription: "La convergenza tra family office, crowdfunding e club deal nell'allocazione di capitale strategico.",
    primaryKeywords: ['Private Equity', 'Club Deal', 'Family Office'],
    secondaryKeywords: ['Co-Investimento', 'Alternative Investments'],
    viewsCount: 1080,
    featured: false,
  },
  {
    id: 'post-5',
    title: 'Come Strutturare una Campagna di Equity Crowdfunding di Successo nel 2025',
    slug: 'equity-crowdfunding-campagna-successo-2025',
    excerpt: 'Strategie di allineamento strategico, ottimizzazione operativa e KPI critici per maximizzare il capitale raccolto e la soddisfazione degli investitori.',
    content: `## Executive Summary & Contesto di Mercato
Nel panorama del 2025, le campagne di **Equity Crowdfunding** rappresentano uno strumento maturo e complementare alle fonti di finanziamento tradizionali. Tuttavia, il passaggio da una raccolta di capitale generica a una campagna **istituzionalmente strutturata** richiede un approccio metodico e data-driven.

> "Una campagna di successo non si misura soltanto dall'importo complessivo raccolto, ma dalla qualità dell'investitore base, dal tasso di retention post-chiusura e dalla capacità di generare un effetto network che faciliti operazioni future."

---

## 1. Analisi del Contesto e Fondamenti Strategici

### Pilastri Fondamentali
La strutturazione di una campagna efficace poggia su tre fondamenti interdipendenti:

**Allineamento Strategico**
- Assicurare che ogni iniziativa sia coerente con gli obiettivi dell'ecosistema aziendale.
- Definire chiaramente la destinazione dei capitali e i KPI di impatto.
- Mantenere trasparenza totale verso investitori su roadmap e milestone.

**Efficienza Operativa**
- Identificare i colli di bottiglia nella gestione della campagna (marketing, compliance, investor relations).
- Automatizzare i processi ridondanti e delegabili.
- Implementare dashboard real-time per monitorare il progresso rispetto ai target.

**Crescita dei Margini**
- Ottimizzare la struttura dei costi preservando la qualità del servizio.
- Trattenere il talento interno mediante incentivi equity-aligned.
- Pianificare la scalabilità del modello operativo.

---

## 2. I KPI Critici per il Successo

### Ritorno sul Capitale Investito (ROIC)
Il ROIC misura l'efficienza con cui l'azienda genera profitti dalle risorse ricevute.

**Metrica Chiave**: (NOPAT / Invested Capital) × 100
- **Target Minimo**: 12-15% annualizzato per essere competitivo nel segmento SME.
- **Benchmark**: Le società con ROIC > 20% attraggono investitori istituzionali e accelerano successive tornate di finanziamento.

**Implicazione Pratica**: Prima di lanciare la campagna, validare internamente che il business plan generi rendimenti superiori al costo del capitale (WACC). In caso contrario, la campagna fallirà allo scrutinio degli investitori sofisticati.

### Tasso di Retention dei Clienti (Customer Retention Rate - CRR)
Garanzia di entrate ricorrenti e sostenibilità del modello.

**Metrica Chiave**: (End Period Customers - New Customers) / Start Period Customers × 100
- **Target Minimo**: > 80% per modelli B2B SaaS, > 60% per e-commerce.
- **Impatto su Valutazione**: Investitori premium pagano un multiplo CLV/CAC più elevato quando il CRR è > 90%.

**Strategia di Miglioramento**:
1. Implementare customer success proattivo post-vendita.
2. Creare community e programmi di loyalty per power users.
3. Misurare monthly/quarterly churn e agire sui segment ad alta volatilità.

### Margine EBITDA Rettificato (Adjusted EBITDA Margin)
Il parametro chiave per valutare la solidità operativa e la capacità di sostenere crescita.

**Metrica Chiave**: (EBITDA + Costi Non Ricorrenti) / Revenue × 100
- **Target Minimo**: 15-20% per startups in scaling, > 30% per scale-up consolidate.
- **Regola d'Oro**: Ogni punto percentuale di miglioramento del margine aumenta la valutazione di circa 2-3x secondo i multiple di exit medi.

**Levers di Miglioramento**:
- **Optimization**: Ridurre strutture cost-heavy (outsourcing, automation).
- **Pricing Power**: Aumentare il prezzo medio al cliente mantenendo retention.
- **Leverage**: Sfruttare effetti di scala nelle operazioni ricorrenti.

---

## 3. Metodologia Applicativa: 5 Fasi di Strutturazione

### Fase 1: Due Diligence Interna e Revisione del Pitch
**Durata**: 4-6 settimane

- Audit finanziario della documentazione contabile (ultimi 3 anni).
- Stress-testing del business plan con scenari ribassisti (-20% revenue, +15% CAC).
- Validazione della proprietà intellettuale e assenza di controversie legali.
- Armonizzazione della narrazione ("story") con i numeri reali.

**Output**: Investment Memorandum (IM) di 20-30 pagine con executive summary accattivante.

### Fase 2: Segmentazione e Pre-Launch Cornerstone Syndication
**Durata**: 6-8 settimane

- Identificare 3-5 anchor investors (HNWIs, family office, corporate strategists).
- Proporre minimo 15-20% del target pre-closing.
- Negoziare board seats o diritti informativi per motivare i cornerstone.
- Costruire social proof tramite testimonial e case study.

**Aspetto Critico**: Le campagne con cornerstone > 25% raggiungono il target nel 82% dei casi. Con cornerstone < 10%, il success rate scende al 43%.

### Fase 3: Strutturazione della Campagna e Compliance Regulatory
**Durata**: 4-6 settimane

- Selezionare la piattaforma di crowdfunding (es. Seedrs, Crowdcube, OPG, Mamacrowd).
- Redigere KIIS (Key Information Sheet) secondo ECSPR/FCA.
- Implementare soft-cap e hard-cap strategici.
- Definire maturità dell'investimento (warrant, equity, token).

**Best Practice**: Soft-cap = 60-70% del target; Hard-cap = 120-150%. Questo incentiva gli early adopter senza scoraggiare late comers.

### Fase 4: Campaign Launch e Investor Relations in Real-Time
**Durata**: 60-90 giorni di campagna attiva

- Week 1-2: "Launch Push" – media coverage, influencer alignment, email campaign.
- Week 3-6: "Momentum Phase" – mantenere visibilità, pubblicare milestone.
- Week 7-8+: "Closing Sprint" – urgency messaging, last-minute updates.

**Metriche Quotidiane da Monitorare**:
- Commit rate (€ committed / target).
- Investor acquisition cost (marketing spend / new investors).
- Average ticket size (total raised / investor count).

### Fase 5: Post-Chiusura e Investor Onboarding
**Durata**: Ongoing, primi 6-12 mesi critici

- Comunicazione di ringraziamento e stakeholder mapping.
- Riunione kickoff con investor advisory board.
- Comunicazioni trimestrali su progress e KPI.
- Preparazione per future tornate (Serie A, acquisizione, exit).

---

## 4. Evitare i Principali Errori in Fase di Progettazione

| Errore Comune | Impatto | Soluzione |
|---|---|---|
| **Cornerstone insufficiente** | Fallimento della campagna nel 65% dei casi | Allocare 8-10 settimane alla pre-launch syndication |
| **Story poco credibile** | Investitori scettici, basso engagement | Validare narrativa con advisor indipendente; usare dati, non hype |
| **Target troppo aggressivo** | Fallimento percepito, reputazione danneggiata | Fissare target ragionevole, 110-130% di upside optionale |
| **Scarsa transparenza legale** | Controversie post-chiusura, cause investor | Investire in top-tier legal counsel; diffidare dei discount |
| **Engagement investor post-chiusura assente** | Perdita trust, difficoltà future raccolte | Pianificare roadshow e update cadenzate da giorno 1 |

---

## 5. Il Playbook di Justmeben LTD

Nel nostro operato abbiamo strutturato oltre 15 campagne di equity crowdfunding, per un totale di £40M+ raccolti. La nostra metodologia integra:

1. **Pre-Launch Underwriting**: Validazione completa di business model, team capability, market opportunity.
2. **Cornerstone Syndication**: Accesso a network di 300+ family office e investitori istituzionali.
3. **Campaign Design & Compliance**: Strutturazione ECSPR/FCA, selezione piattaforma, definizione termini.
4. **Real-Time Investor Relations**: Dashboard live, comunicazioni giornaliere, gestione delle obiezioni.
5. **Post-Close Governance**: Advisory board, update cadenzati, preparazione exit.

**Risultato Medio**: 87% di successo campagna entro timeline, 92% di retention investor a 24 mesi, 1.3x multiple medio su 5-7 anni.

---

## Conclusioni

Il crowdfunding equity non è una lotteria, ma una **disciplina finanziaria e operativa** che premia la preparazione, la trasparenza e l'esecuzione rigida.

I tre KPI fondamentali – ROIC, CRR e Margine EBITDA – sono le bussole che guidano ogni decisione di strutturazione. Spendere 10-12 settimane in fase preparatoria non è un costo, bensì un investimento che riduce il rischio di fallimento dal 50% al 12%.`,
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    category: 'Crowdfunding Advisory',
    tags: ['Equity Crowdfunding', 'Capital Raising', 'KPI', 'Investor Relations', 'ECSPR'],
    author: {
      name: 'Marco Beniamino Brioschi',
      role: 'Founder & Managing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    readingTime: '8 min',
    status: 'published',
    publishedAt: '2025-02-25T10:00:00.000Z',
    createdAt: '2025-02-25T09:00:00.000Z',
    updatedAt: '2025-02-25T10:00:00.000Z',
    metaTitle: 'Equity Crowdfunding 2025: Strategie e KPI per Campagne di Successo | Justmeben LTD',
    metaDescription: 'Guida strategica alla strutturazione di campagne di equity crowdfunding: KPI critici, metodologia 5 fasi, best practice investor relations.',
    primaryKeywords: ['Equity Crowdfunding', 'Capital Raising', 'Strutturazione Campagne', 'KPI Finanziari'],
    secondaryKeywords: ['ROIC', 'Retention Investor', 'EBITDA Margin', 'ECSPR Compliance'],
    keyTakeaways: [
      "Una campagna di successo richiede 10-12 settimane di preparazione: pre-diligence, cornerstone syndication, e strutturazione compliance.",
      "I tre KPI critici sono ROIC (> 12-15%), CRR (> 80%) e Margine EBITDA Rettificato (> 20%).",
      "Le campagne con cornerstone funding > 25% raggiungono il target nell'82% dei casi; senza, il tasso scende al 43%.",
      "La trasparenza post-chiusura e la gestione dell'investor base sono il fondamento della retention e delle future raccolte.",
    ],
    internalLinkSuggestions: [
      {
        anchorText: 'la guida completa al crowdfunding immobiliare',
        suggestedPage: '/blog/guida-crowdfunding-immobiliare-strutturazione-regolamentazione',
        context: 'Per un approfondimento specifico su campagne real estate.',
      },
      {
        anchorText: 'i nostri criteri di investimento',
        suggestedPage: '/investment-criteria',
        context: 'Per comprendere quali operazioni siamo disposti a supportare.',
      },
    ],
    viewsCount: 0,
    featured: true,
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'belgravia-residences',
    name: 'Belgravia Luxury Residential Collection',
    logoText: 'BELGRAVIA RESIDENCES',
    tagline: 'Prime Central London Residential Redevelopment',
    description: 'High-end residential conversion of prime period townhouses into bespoke luxury apartments. Justmeben LTD structured the mezzanine capital stack and coordinated cornerstone equity syndication.',
    sector: 'Real Estate & Property Development',
    investmentType: 'Mezzanine Debt & Equity Syndication',
    year: '2023 - 2024',
    hq: 'London (Belgravia), United Kingdom',
    revenueRange: '£18.5M GDV',
    employees: 'Lead Advisory',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#7A8288',
    metrics: [
      { label: 'Gross Dev Value (GDV)', value: '£18.5M' },
      { label: 'Mezzanine Tranche', value: '£3.8M' },
      { label: 'Projected IRR', value: '21.4%' },
    ],
  },
  {
    id: 'thames-logistics',
    name: 'Thames Gateway Logistics & Industrial Hub',
    logoText: 'THAMES GATEWAY',
    tagline: 'Last-Mile Sustainable Industrial Logistics Park',
    description: 'Development of an 85,000 sq ft ESG-compliant logistics and distribution facility serving Greater London and South East freight corridors with EPC A+ rating.',
    sector: 'Industrial & Commercial Logistics',
    investmentType: 'Senior & Mezzanine Capital Advisory',
    year: '2024',
    hq: 'Kent / Greater London, UK',
    revenueRange: '£32.0M GDV',
    employees: 'Capital Arranger',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#2B3A4A',
    metrics: [
      { label: 'Facility Footprint', value: '85,000 sq ft' },
      { label: 'Total Capital Structured', value: '£22.5M' },
      { label: 'Target Yield on Cost', value: '7.8%' },
    ],
  },
  {
    id: 'fintech-proptech-syndicate',
    name: 'OmniProp Crowdfunding Platform Integration',
    logoText: 'OMNIPROP ADVISORY',
    tagline: 'FinTech & Real Estate Crowdfunding Technology',
    description: 'Structured capital raising and strategic regulatory onboarding for an alternative investment and crowdfunding infrastructure connecting retail and institutional co-investors.',
    sector: 'Crowdfunding & FinTech Advisory',
    investmentType: 'Venture Capital & Crowdfunding Advisory',
    year: '2024 - 2025',
    hq: 'London, UK & Milan, Italy',
    revenueRange: '£8.5M Capital Round',
    employees: 'Lead Advisor',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#4A3B32',
    metrics: [
      { label: 'Capital Raised', value: '£8.5M' },
      { label: 'Active Co-Investors', value: '1,400+' },
      { label: 'FCA & ECSPR Aligned', value: '100% Compliant' },
    ],
  },
  {
    id: 'milan-coreplus-redevelopment',
    name: 'Porta Nuova Executive Mixed-Use Complex',
    logoText: 'PORTA NUOVA COMPLEX',
    tagline: 'Urban Regeneration & Commercial Core-Plus Asset',
    description: "Repositioning and deep energetic retrofit of a 6-storey mixed-use commercial and boutique hospitality building in Milan's premier financial hub.",
    sector: 'Property Investment & Private Equity',
    investmentType: 'Special Purpose Vehicle (SPV) Syndication',
    year: '2024 - 2025',
    hq: 'Milan (Porta Nuova), Italy',
    revenueRange: '€24.0M Asset Value',
    employees: 'Strategic Co-Sponsor',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    themeColor: '#36535E',
    metrics: [
      { label: 'Gross Area', value: '5,200 sqm' },
      { label: 'Target IRR', value: '18.6%' },
      { label: 'Energy Class Post-Retrofit', value: 'Class A4' },
    ],
  },
];

export const INVESTMENT_CRITERIA: InvestmentCriterion[] = [
  {
    id: 'crit-1',
    category: 'Real Estate & Development',
    title: 'Asset Value & GDV Range',
    value: '£5M - £50M GDV',
    description: 'Residential schemes, build-to-rent, mixed-use redevelopments and industrial logistics with strong fundamentals and clear planning permissions.',
    iconName: 'Building2',
  },
  {
    id: 'crit-2',
    category: 'Mezzanine & Debt Structuring',
    title: 'Capital Stack Positioning',
    value: '£1M - £10M Mezzanine Tickets',
    description: 'Subordinated mezzanine debt, stretched senior loans, and bridging capital to bridge the funding gap up to 80-85% Loan-to-Cost (LTC).',
    iconName: 'Layers',
  },
  {
    id: 'crit-3',
    category: 'Crowdfunding Advisory',
    title: 'Crowdfunding & Campaign Size',
    value: '£500k - £10M Campaign Target',
    description: 'Institutional-grade equity and debt crowdfunding campaigns with full FCA and ECSPR regulatory compliance, cornerstone investor syndication, and investor escrow mechanisms.',
    iconName: 'Coins',
  },
  {
    id: 'crit-4',
    category: 'Private Equity & Venture',
    title: 'Growth Equity & Co-Investment',
    value: '£1M - £15M Equity Cheques',
    description: 'Direct club deals and SPV participations in high-potential proptech, fintech, specialized industrial services, and value-add operating assets.',
    iconName: 'TrendingUp',
  },
  {
    id: 'crit-5',
    category: 'Governance & Risk Profile',
    title: 'Underwriting & Due Diligence',
    value: 'Institutional Screening Protocol',
    description: 'Multi-stage validation process covering technical condition, legal title, planning permissions, financial sensitivity stress-testing, and counterparty integrity.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'crit-6',
    category: 'Geography',
    title: 'Geographic Scope',
    value: 'United Kingdom, Italy & Western Europe',
    description: 'Core focus on London, Greater South East UK, Northern Italy financial hubs, and selected high-demand Western European gateway markets.',
    iconName: 'Globe',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Marco Beniamino Brioschi',
    role: 'Founder & Managing Director',
    focus: 'Real Estate, Crowdfunding & Capital Advisory',
    bio: 'Extensive background in property investment structuring, crowdfunding campaigns, mezzanine debt syndication, and cross-border advisory across the UK and Italy.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-2',
    name: 'Sofia Sterling',
    role: 'Director of Capital Markets',
    focus: 'Mezzanine Structuring & Debt Syndication',
    bio: 'Specialist in complex capital stacks, senior-to-subordinated debt layering, and institutional underwriting for real estate developments and corporate acquisitions.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'team-3',
    name: 'Luca Moretti',
    role: 'Head of Alternative Investments',
    focus: 'Crowdfunding Advisory & SPV Syndication',
    bio: 'Expert in European crowdfunding frameworks (ECSPR), digital investor syndication, and venture co-investments in proptech and fintech ventures.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
  },
];
