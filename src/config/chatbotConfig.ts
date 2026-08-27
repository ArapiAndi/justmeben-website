/**
 * Chatbot Configuration
 * Customize chatbot behavior, styling, and content here
 */

export const chatbotConfig = {
  // UI Configuration
  ui: {
    // Position of the floating button: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    position: 'bottom-right' as const,

    // Offset from screen edge (in rem units)
    offsetX: 24,
    offsetY: 24,

    // Chat window dimensions
    width: 384, // 96 in Tailwind = 24rem = 384px
    height: 600,

    // Corner radius
    borderRadius: 16,

    // Animation speed (ms)
    animationDuration: 300,

    // Show welcome message on first open
    showWelcomeMessage: true,
  },

  // Behavior Configuration
  behavior: {
    // Max conversation history to maintain (older messages are discarded)
    maxHistoryLength: 50,

    // Auto-scroll to latest message
    autoScroll: true,

    // Auto-focus input when opening
    autoFocus: true,

    // Clear history on close (set to false to persist across sessions)
    clearOnClose: false,

    // Typing animation (ms delay before showing response)
    typingDelay: 300,
  },

  // AI Configuration
  ai: {
    // Model to use
    model: 'gemini-1.5-flash' as const,

    // Response temperature (0-1, higher = more creative)
    temperature: 0.7,

    // Max tokens per response
    maxOutputTokens: 1024,

    // Number of relevant links to suggest
    maxSuggestedLinks: 2,
  },

  // Content Configuration
  content: {
    // Enable/disable suggested links
    showSuggestedLinks: true,

    // Enable/disable conversation history display
    showHistory: true,

    // Max message length (characters)
    maxMessageLength: 1000,
  },

  // System Prompts (by language)
  systemPrompts: {
    en: {
      role: 'You are an intelligent customer service assistant for JUSTMEBEN LTD, a leading consultancy in real estate, crowdfunding, private equity, and venture capital.',
      tone: 'Professional yet approachable, knowledgeable and helpful',
      instructions: [
        'Provide accurate information about our services and investment opportunities',
        'Suggest relevant pages and resources when appropriate',
        'Maintain conversation context and history',
        'Ask clarifying questions if needed',
        'Be honest about limitations and direct users to contact info when needed',
      ],
    },
    it: {
      role: 'Sei un assistente intelligente di JUSTMEBEN LTD, una consultoria leader in real estate, crowdfunding, private equity e venture capital.',
      tone: 'Professionale ma accessibile, competente e disponibile',
      instructions: [
        'Fornisci informazioni accurate su i nostri servizi e opportunità di investimento',
        'Suggerisci pagine e risorse pertinenti quando appropriato',
        'Mantieni il contesto e la cronologia della conversazione',
        'Poni domande di chiarimento se necessario',
        'Sii onesto sui limiti e indirizza gli utenti alle informazioni di contatto quando necessario',
      ],
    },
  },

  // Styling Configuration
  styling: {
    // Color scheme
    colors: {
      // Button and header background
      primary: '#121316',
      primaryHover: '#2a2a2f',

      // Text colors
      textPrimary: '#121316',
      textSecondary: '#666666',
      textInverse: '#FFFFFF',

      // Background colors
      bgLight: '#FAF9F6',
      bgCard: '#FFFFFF',
      bgInput: '#F3F3F3',

      // Border colors
      borderLight: '#E5E5E5',
      borderFocus: '#121316',

      // Message bubbles
      userBubble: '#121316',
      userText: '#FFFFFF',
      assistantBubble: '#FFFFFF',
      assistantText: '#121316',
      assistantBorder: '#E5E5E5',
    },

    // Font configuration
    font: {
      family: '"Plus Jakarta Sans", sans-serif',
      size: {
        sm: '14px',
        base: '16px',
        lg: '18px',
      },
    },
  },

  // Analytics Configuration (optional)
  analytics: {
    // Enable analytics tracking
    enabled: false,

    // Track which questions are asked most
    trackQuestions: true,

    // Track user satisfaction
    trackSatisfaction: true,
  },
};

export type ChatbotConfig = typeof chatbotConfig;
