# 🚀 Quick Start: Enable AI in 2 Minutes

## Step 1: Get Your Free API Key

1. Open: https://makersuite.google.com/app/apikey
2. Sign in with your Google account (you have Gemini Pro!)
3. Click **"Create API Key"**
4. Copy the key (starts with `AIza...`)

## Step 2: Add to Project

Open the `.env` file in your project root and paste your key:

```env
VITE_GEMINI_API_KEY=AIzaSyC...your_actual_key_here
```

## Step 3: Restart Server

The server should auto-restart. If not:
```bash
# Press Ctrl+C to stop
npm run dev
```

## Step 4: Test It! 🎉

1. Open http://localhost:5173
2. Look for the green **"✨ AI Active"** badge
3. Click Clippy and chat
4. Get real AI responses!

---

## 🎭 Try These Prompts

### Helper Mode 📎
- "How do I format this better?"
- "Give me tips for organizing my code"
- "Help me structure this document"

### Mentor Mode 🧑‍🏫
- "Explain how React hooks work"
- "Why should I use TypeScript?"
- "What's the difference between let and const?"

### Haunted Mode 👻
- "I have a bug and I'm frustrated"
- "Help me debug this error"
- "Why isn't my code working?"

---

## 🔍 Verify AI is Working

Look for these indicators:
- ✅ Green **"✨ AI Active"** badge in the UI
- ✅ Responses are unique and contextual
- ✅ Clippy adapts tone to your questions
- ✅ No "fallback mode" warning

---

## 💡 Pro Tips

1. **Longer conversations**: AI remembers last 3 exchanges
2. **Context matters**: Clippy knows your current mode and activity
3. **Be specific**: Better questions = better answers
4. **Try all modes**: Each personality has different AI behavior

---

## 🐛 Troubleshooting

**"Fallback Mode" warning?**
- Check `.env` file exists
- Verify key is correct
- Restart dev server

**No response?**
- Check browser console (F12)
- Verify internet connection
- Check API quota (60/min, 1500/day)

**API Error?**
- Verify key is valid
- Check Gemini API is enabled
- Try regenerating key

---

## 🎯 What's Different with AI?

### Without AI (Fallback):
- Pre-written responses
- Keyword matching
- Limited variety

### With AI (Gemini):
- Unique responses every time
- Understands context
- Adapts to conversation
- Real personality

---

## 📚 Next Steps

- Read `SETUP_AI.md` for advanced configuration
- Customize personalities in `src/agents/clippy-agent.js`
- Adjust AI temperature and token limits
- Build your own personality modes!

---

**Enjoy your AI-powered Clippy! 🎉**
