import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  relatedLinks?: Array<{ title: string; url: string; context: string }>;
}

export interface SiteContent {
  title: string;
  url: string;
  content: string;
  category: string;
  language: string;
}

class ChatbotService {
  private apiKey: string;
  private client: GoogleGenAI;
  private siteContent: SiteContent[] = [];
  private conversationHistory: Array<{ role: string; parts: string[] }> = [];
  private messageCounter = 0;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = new GoogleGenAI({ apiKey });
    this.initializeSiteContent();
  }

  private initializeSiteContent() {
    this.siteContent = [
      {
        title: "Home",
        url: "/",
        content:
          "JUSTMEBEN LTD - Expert consultancy in crowdfunding, private equity, and venture capital guidance. Specializing in strategic planning, financial analysis, and operational excellence for startups and growing organizations.",
        category: "home",
        language: "en",
      },
      {
        title: "About Us - Strategic Planning & Financial Excellence",
        url: "/about",
        content:
          "We empower entrepreneurs and organizations through expert consultancy in crowdfunding, private equity, and venture capital. Our comprehensive approach covers strategic planning, market research, business development, and financial analysis.",
        category: "about",
        language: "en",
      },
      {
        title: "Investment Criteria & Parameters",
        url: "/criteria",
        content:
          "Our investment parameters cover real estate development, crowdfunding platforms, mezzanine finance, venture capital, and private equity opportunities.",
        category: "investment",
        language: "en",
      },
      {
        title: "Portfolio - Investment Opportunities",
        url: "/portfolio",
        content:
          "Proven deployment history across prime real estate developments, private equity, and growth debt syndications.",
        category: "portfolio",
        language: "en",
      },
      {
        title: "Blog & Research",
        url: "/blog",
        content:
          "Research and market insights on real estate, crowdfunding, alternative finance, mezzanine finance, and venture capital.",
        category: "blog",
        language: "en",
      },
      {
        title: "Home - Chi Siamo",
        url: "/",
        content:
          "JUSTMEBEN LTD - Consulenza strategica in crowdfunding immobiliare, private equity e venture capital.",
        category: "home",
        language: "it",
      },
      {
        title: "Chi Siamo - Pianificazione Strategica ed Eccellenza Finanziaria",
        url: "/about",
        content:
          "Potenziamo imprenditori e organizzazioni attraverso la consulenza esperta in crowdfunding immobiliare, private equity e capital raising.",
        category: "about",
        language: "it",
      },
      {
        title: "Criteri di Investimento",
        url: "/criteria",
        content:
          "I nostri parametri di investimento coprono sviluppo immobiliare, piattaforme di crowdfunding, finanziamento mezzanino, venture capital e opportunità di private equity.",
        category: "investment",
        language: "it",
      },
      {
        title: "Portfolio - Opportunità di Investimento",
        url: "/portfolio",
        content:
          "Track record collaudato nello sviluppo immobiliare, private equity e syndication di debito di crescita.",
        category: "portfolio",
        language: "it",
      },
      {
        title: "Blog & Ricerca",
        url: "/blog",
        content:
          "Ricerca e insights di mercato su real estate, crowdfunding, finanza alternativa, mezzanine finance e venture capital.",
        category: "blog",
        language: "it",
      },
    ];
  }

  private buildSystemPrompt(language: string): string {
    const basePrompt =
      language === "it"
        ? `Sei un assistente intelligente per JUSTMEBEN LTD, una società specializzata in consulenza strategica, crowdfunding immobiliare, finanziamento mezzanino, private equity e venture capital.

Istruzioni:
1. Rispondi sempre in italiano quando l'utente usa l'italiano
2. Sii accogliente, professionale e informativo
3. Fornisci risposte chiare e concise
4. Quando pertinente, suggerisci sezioni del sito o contenuti correlati
5. Se non conosci una risposta, dirlo onestamente
6. Mantieni il contesto della conversazione
7. Usa un linguaggio amichevole ma professionale
8. Personalizza le risposte in base al contesto mostrato dall'utente`
        : `You are an intelligent assistant for JUSTMEBEN LTD, a company specializing in strategic consulting, real estate crowdfunding, mezzanine financing, private equity, and venture capital.

Instructions:
1. Always respond in English when the user uses English
2. Be welcoming, professional, and informative
3. Provide clear and concise answers
4. When relevant, suggest sections of the website or related content
5. If you don't know an answer, be honest about it
6. Maintain context from the conversation
7. Use a friendly but professional tone
8. Personalize responses based on context provided by the user`;

    const siteContext =
      language === "it"
        ? `\n\nContesti del sito:\n${this.siteContent
            .filter((c) => c.language === language)
            .map((c) => `- ${c.title}: ${c.content}`)
            .join("\n")}`
        : `\n\nWebsite Context:\n${this.siteContent
            .filter((c) => c.language === language)
            .map((c) => `- ${c.title}: ${c.content}`)
            .join("\n")}`;

    return basePrompt + siteContext;
  }

  async sendMessage(
    userMessage: string,
    language: string = "en"
  ): Promise<ChatMessage> {
    try {
      this.conversationHistory.push({
        role: "user",
        parts: [userMessage],
      });

      const response = await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: this.buildSystemPrompt(language) + "\n\n" + userMessage }],
          },
          ...this.conversationHistory.slice(0, -1).map((msg) => ({
            role: msg.role === "user" ? ("user" as const) : ("model" as const),
            parts: [{ text: msg.parts[0] }],
          })),
        ],
      });

      const textContent = response.text;
      const assistantMessage =
        textContent ||
        (language === "it"
          ? "Mi scuso, non ho potuto generare una risposta."
          : "I apologize, I could not generate a response.");

      this.conversationHistory.push({
        role: "model",
        parts: [assistantMessage],
      });

      const relatedLinks = this.extractRelevantLinks(userMessage, language);

      return {
        id: `msg-${++this.messageCounter}`,
        role: "assistant",
        content: assistantMessage,
        timestamp: Date.now(),
        relatedLinks,
      };
    } catch (error) {
      const errorMessage =
        language === "it"
          ? "Si è verificato un errore nella comunicazione. Riprova più tardi."
          : "An error occurred in communication. Please try again later.";
      return {
        id: `msg-${++this.messageCounter}`,
        role: "assistant",
        content: errorMessage,
        timestamp: Date.now(),
      };
    }
  }

  private extractRelevantLinks(
    userMessage: string,
    language: string
  ): Array<{ title: string; url: string; context: string }> {
    const message = userMessage.toLowerCase();
    const links: Array<{ title: string; url: string; context: string }> = [];

    // Keyword mapping for link suggestions
    const keywordMap: Record<string, string[]> = {
      "/criteria": [
        "criteri",
        "parametri",
        "investimento",
        "requirements",
        "criteria",
        "parameters",
      ],
      "/portfolio": [
        "portfolio",
        "opportunità",
        "case study",
        "progetti",
        "opportunities",
        "projects",
      ],
      "/blog": [
        "blog",
        "articoli",
        "ricerca",
        "insights",
        "articles",
        "research",
      ],
      "/about": [
        "chi siamo",
        "about",
        "team",
        "squadra",
        "esperienza",
        "experience",
      ],
    };

    for (const [url, keywords] of Object.entries(keywordMap)) {
      if (keywords.some((kw) => message.includes(kw))) {
        const titleMap: Record<string, Record<string, string>> = {
          "/criteria": {
            it: "Criteri di Investimento",
            en: "Investment Criteria",
          },
          "/portfolio": { it: "Portfolio", en: "Portfolio" },
          "/blog": { it: "Blog & Ricerca", en: "Blog & Research" },
          "/about": { it: "Chi Siamo", en: "About Us" },
        };

        const contextMap: Record<string, Record<string, string>> = {
          "/criteria": {
            it: "Scopri i nostri parametri di investimento",
            en: "Discover our investment parameters",
          },
          "/portfolio": {
            it: "Esplora i nostri progetti",
            en: "Explore our projects",
          },
          "/blog": {
            it: "Leggi i nostri articoli e ricerche",
            en: "Read our articles and research",
          },
          "/about": {
            it: "Scopri di più su Just Me Ben",
            en: "Learn more about Just Me Ben",
          },
        };

        links.push({
          title: titleMap[url][language],
          url,
          context: contextMap[url][language],
        });
      }
    }

    return links.slice(0, 2);
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  getHistory(): ChatMessage[] {
    return this.conversationHistory
      .filter((msg) => msg.role === "user" || msg.role === "model")
      .map((msg, idx) => ({
        id: `msg-${idx}`,
        role: msg.role === "model" ? "assistant" : ("user" as const),
        content: msg.parts[0],
        timestamp: Date.now(),
      }));
  }
}

export default ChatbotService;
