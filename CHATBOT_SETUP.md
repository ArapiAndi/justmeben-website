# JUSTMEBEN LTD Chatbot Integration Guide

## Overview

The Chatbot system is an intelligent AI assistant powered by Google Gemini 1.5 Flash. It provides users with conversational access to website content, helping them understand services, navigate pages, and get personalized advisory insights.

## Features

✅ **Real-time Conversational AI** - Uses Gemini for natural language understanding
✅ **Content-Aware Responses** - Understands site structure and suggests relevant pages
✅ **Multi-language Support** - Responds in Italian or English based on user language preference
✅ **Persistent Conversation History** - Maintains context throughout the session
✅ **Responsive Design** - Mobile-optimized floating chat interface
✅ **Smart Link Suggestions** - Recommends related pages and resources
✅ **Non-intrusive UI** - Floating button in bottom-right corner

## Setup Instructions

### 1. Get a Google Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new API key or use an existing one
4. Copy the key (keep it secure!)

### 2. Configure Environment Variables

Create or update your `.env` file:

```bash
# Copy from .env.example
cp .env.example .env

# Edit .env and add your API key
VITE_GOOGLE_API_KEY=your_actual_gemini_api_key_here
```

**Important**: Never commit your API key to version control. The `.gitignore` should already exclude `.env` files.

### 3. Install Dependencies

Gemini SDK is already in `package.json`:

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` and look for the chat icon in the bottom-right corner.

## Architecture

### Components

#### `src/components/Chatbot.tsx`
- Main UI component
- Floating button that opens/closes the chat window
- Message display and input handling
- Responsive design with Tailwind CSS

**Key Features:**
- Auto-scroll to latest messages
- Auto-focus input when opening
- Loading states and error handling
- Clear history functionality
- Multi-language UI text

#### `src/services/ChatbotService.ts`
- Core AI logic
- Conversation history management
- Content indexing and retrieval
- Related link extraction

**Key Methods:**
- `sendMessage(userMessage, language)` - Send user message and get AI response
- `extractRelevantLinks(userMessage, language)` - Find related pages
- `clearHistory()` - Reset conversation
- `getHistory()` - Retrieve conversation history

### Context & Hooks

- `useLanguage()` - Get current language (IT/EN) from app context
- Seamless integration with existing language switcher

## Customization

### Adding Site Content

Edit `src/services/ChatbotService.ts` in the `initializeSiteContent()` method:

```typescript
this.siteContent = [
  {
    title: "Page Title",
    url: "/page-url",
    content: "Page description and key content...",
    category: "category-name",
    language: "en", // or "it"
  },
  // ... more pages
];
```

### Styling

The chatbot uses Tailwind CSS and inherits the site's design:

- **Colors**: Dark text (#121316) on light background (#FAF9F6)
- **Font**: Plus Jakarta Sans (from site)
- **Animations**: Smooth fade-in, slide-in effects
- **Responsive**: Adapts to mobile, tablet, desktop

Key CSS classes to modify:
- `.bottom-6 .right-6` - Button position
- `w-96 h-[600px]` - Chat window size
- `rounded-2xl` - Corner radius

### System Prompts

Customize AI behavior by editing the `buildSystemPrompt()` method in `ChatbotService.ts`. Current prompts include:

- Welcoming, professional tone
- Context awareness from site content
- Multi-language support
- Clear instruction set

## Conversation Flow

```
User Opens Chat
    ↓
Welcome Message Displayed
    ↓
User Types Message
    ↓
ChatbotService Sends to Gemini
    ↓
Gemini Analyzes Context + Site Content
    ↓
Response Generated + Related Links Extracted
    ↓
Messages Display in Chat
    ↓
User Continues Conversation
```

## Performance Optimization

- **Lazy Loading**: Chatbot service only initializes when needed
- **Smart Caching**: Conversation history stored in component state
- **Efficient APIs**: Uses Gemini 1.5 Flash (faster, cheaper than full Gemini)
- **Content Indexing**: Pre-indexed site structure for fast link suggestions

## Troubleshooting

### API Key Not Working

```
❌ Error: Could not generate a response
```

**Solution:**
1. Verify key is valid: `https://ai.google.dev/`
2. Check `.env` file has `VITE_GOOGLE_API_KEY`
3. Restart dev server after env change
4. Check browser console for specific errors

### Chatbot Not Appearing

**Solution:**
1. Check browser console for JavaScript errors
2. Verify `Chatbot` component imported in `App.tsx`
3. Ensure CSS is loading (check Tailwind compilation)

### Slow Responses

**Solution:**
1. Check network tab in DevTools
2. Verify Gemini API isn't rate-limited
3. Reduce conversation history if very long

### Language Not Switching

**Solution:**
1. Clear browser cache and local storage
2. Verify `useLanguage()` hook is working
3. Check that `VITE_GOOGLE_API_KEY` is in env

## Production Deployment

### Vercel

1. Add `VITE_GOOGLE_API_KEY` to Vercel Environment Variables:
   - Project Settings → Environment Variables
   - Add key → Value

2. Redeploy:
   ```bash
   git push
   ```

### Self-Hosted

1. Set environment variable on server:
   ```bash
   export VITE_GOOGLE_API_KEY="your_key"
   npm run build
   npm start
   ```

2. Or use `.env.local` for production (if not version controlled)

## API Usage & Costs

**Gemini 1.5 Flash Pricing** (as of 2024):
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens

**Typical Usage:**
- Average conversation: 1-5 KB = ~250-1,250 tokens
- Cost per message: < $0.001

Monitor usage:
- Google Cloud Console → APIs & Services → Credentials
- Check quota and usage stats

## Future Enhancements

### Planned Features
- [ ] Analytics - Track popular questions and topics
- [ ] Caching - Store frequently asked questions
- [ ] Integration - Connect to knowledge base / CRM
- [ ] Custom Training - Fine-tune on company documents
- [ ] Voice Input - Speech-to-text support
- [ ] Export - Download conversation history

### Possible Integrations
- Contact form pre-fill based on chat intent
- Automatic lead qualification
- Knowledge base articles indexing
- Blog post recommendations based on conversation
- Calendar booking for advisory sessions

## Support & Documentation

- **Google Gemini API Docs**: https://ai.google.dev/docs
- **Google Generative AI SDK**: https://github.com/google/generative-ai-js
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Documentation**: https://react.dev/

## Questions?

For questions about the chatbot implementation, refer to:
1. Code comments in `src/components/Chatbot.tsx`
2. Service logic in `src/services/ChatbotService.ts`
3. System prompts documentation
4. Google Gemini API documentation

---

**Last Updated**: February 2025
**Status**: Production Ready
