# Chatbot Quick Start Guide

## 5-Minute Setup

### Step 1: Get Your API Key
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Select or create a Google Cloud project
4. Generate a new API key

### Step 2: Add to Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env and paste your key
VITE_GOOGLE_API_KEY=sk-... (your key here)
```

### Step 3: Start Development Server
```bash
npm install  # if needed
npm run dev
```

### Step 4: Test
1. Open http://localhost:5173
2. Look for chat icon in bottom-right corner
3. Click it and start chatting!

---

## Features Overview

### 💬 Natural Conversation
- Understand your questions and provide relevant answers
- Maintain conversation context
- Suggest related pages and resources

### 🌍 Multi-Language
- Responds in Italian or English
- Auto-detects from site language
- Smooth language switching

### 🎨 Elegant UI
- Matches site design perfectly
- Responsive on mobile/tablet/desktop
- Smooth animations

### 🔗 Smart Suggestions
- Recommends portfolio, blog, investment criteria pages
- Context-aware link suggestions
- Beautiful link formatting

---

## Common Use Cases

### For Visitors
- "Tell me about your crowdfunding services"
- "What investment types do you offer?"
- "Show me your portfolio"
- "How do I request advisory?"

### For Investment Inquiries
- "What are your investment criteria?"
- "Do you finance real estate projects?"
- "Can you help with mezzanine financing?"

### For General Questions
- "What's the difference between equity and debt crowdfunding?"
- "Who is Just Me Ben?"
- "How can I contact the team?"

---

## Customization Tips

### Change Welcome Message
Edit `src/locales/translations.ts`:
```typescript
chatbot: {
  welcome: "Your custom welcome message here",
  // ... other translations
}
```

### Adjust Chat Window Size
Edit `src/components/Chatbot.tsx`:
```typescript
<div className="...w-96 h-[600px]...">
  {/* Change w-96 (width) and h-[600px] (height) */}
</div>
```

### Add More Site Content
Edit `src/services/ChatbotService.ts`:
```typescript
this.siteContent = [
  {
    title: "Your Page Title",
    url: "/your-page",
    content: "Description of page content...",
    category: "category-name",
    language: "en",
  },
  // ... add more
];
```

### Change Colors
Edit `src/config/chatbotConfig.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
  // ... other colors
}
```

---

## Troubleshooting

### ❌ "API Key is invalid"
- Verify key at https://ai.google.dev/
- Check `.env` file has correct key
- Restart dev server after env changes
- Try generating a new key

### ❌ Chatbot not showing
- Open browser console (F12)
- Check for JavaScript errors
- Verify `.env` file exists
- Check that Chatbot is imported in App.tsx

### ❌ Responses are slow
- Check network in DevTools
- Verify internet connection
- Check API rate limits
- Consider reducing conversation history

### ❌ Language not switching
- Clear browser cache
- Check localStorage is enabled
- Verify language switcher works for other content
- Check browser console for errors

### ❌ Links not showing
- Verify `showSuggestedLinks` is true in config
- Check ChatbotService keyword mapping
- Verify pages exist (no typos in URLs)

---

## Production Deployment

### Vercel
1. Add environment variable:
   - Go to Project Settings → Environment Variables
   - Add `VITE_GOOGLE_API_KEY` = `your_key`
   - Redeploy

### Self-Hosted
```bash
# Build
npm run build

# Set environment variable
export VITE_GOOGLE_API_KEY="your_key"

# Start
npm start
```

---

## API Costs

**Gemini 1.5 Flash is very affordable:**
- Input: ~$0.000075 per 1K tokens
- Output: ~$0.00030 per 1K tokens

**Typical conversation:**
- ~250-1,000 tokens per message = ~0.001 cents
- 1,000 conversations ≈ $1

Monitor usage in Google Cloud Console.

---

## What's Included

✅ Smart AI-powered responses using Gemini 1.5 Flash
✅ Content indexing from your site
✅ Multi-language support (English/Italian)
✅ Suggested relevant links
✅ Conversation history management
✅ Responsive mobile design
✅ Customizable configuration
✅ Error handling & fallbacks

---

## Next Steps

1. **Customize**: Edit `chatbotConfig.ts` to match your brand
2. **Add Content**: Expand `siteContent` array with more pages
3. **Monitor**: Track usage in Google Cloud Console
4. **Improve**: Use analytics to understand popular questions
5. **Integrate**: Connect with forms/CRM if needed

---

## Support

- **Setup Questions**: See CHATBOT_SETUP.md
- **Customization**: See chatbotConfig.ts and code comments
- **API Docs**: https://ai.google.dev/docs
- **TypeScript Issues**: Check src/types.ts

---

**Ready to chat?** Click the 💬 icon in the bottom-right corner!
