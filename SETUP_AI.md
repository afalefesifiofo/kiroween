# Setting Up AI with Google Gemini

## 🚀 Quick Setup

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key

### 2. Add API Key to Project

Open the `.env` file in the project root and add your key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. Test It!

1. Open http://localhost:5173
2. Click Clippy to open chat
3. Type a message
4. Get AI-powered responses! 🎉

---

## 🎭 How AI Personalities Work

### Helper Mode 📎
```
System Prompt: "You are a friendly, practical assistant..."
Temperature: 0.9 (creative but focused)
Max Tokens: 200 (short, concise responses)
```

### Mentor Mode 🧑‍🏫
```
System Prompt: "You are a patient, educational guide..."
Temperature: 0.9 (thoughtful explanations)
Max Tokens: 200 (informative but not overwhelming)
```

### Haunted Mode 👻
```
System Prompt: "You are sarcastic but helpful with dark humor..."
Temperature: 0.9 (playful and creative)
Max Tokens: 200 (witty but supportive)
```

---

## 🔧 Configuration

### Adjust AI Behavior

Edit `src/agents/clippy-agent.js`:

```javascript
generationConfig: {
  temperature: 0.9,      // 0.0 = focused, 1.0 = creative
  maxOutputTokens: 200,  // Response length
  topP: 0.95            // Diversity of responses
}
```

### Change Personalities

Edit the `systemPrompts` in `clippy-agent.js`:

```javascript
systemPrompts: {
  helper: `Your custom helper personality...`,
  mentor: `Your custom mentor personality...`,
  haunted: `Your custom haunted personality...`
}
```

---

## 🛡️ Fallback Mode

If the API key is missing or there's an error, Clippy automatically falls back to:
- Pre-written responses
- Keyword matching
- Still functional, just not AI-powered

---

## 💰 Pricing

**Gemini Pro is FREE** with generous limits:
- 60 requests per minute
- 1,500 requests per day
- Perfect for development and demos!

[Check current pricing](https://ai.google.dev/pricing)

---

## 🔒 Security

✅ API key stored in `.env` (not committed to git)  
✅ Only used client-side (for demo purposes)  
✅ For production, use a backend proxy  

### Production Setup (Recommended)

```javascript
// Create a backend endpoint
// POST /api/chat
// Forward requests to Gemini from server
// Keep API key secret on backend
```

---

## 🐛 Troubleshooting

### "API key not found"
- Check `.env` file exists
- Verify key starts with `VITE_`
- Restart dev server

### "API error 400"
- Check API key is valid
- Verify key has Gemini API enabled

### "No response"
- Check browser console for errors
- Verify internet connection
- Check API quota limits

---

## 🎯 Testing Without API Key

The app works without an API key! It uses fallback responses:
- Still switches personalities
- Still detects context
- Just uses pre-written responses instead of AI

---

## 📚 Resources

- [Gemini API Docs](https://ai.google.dev/docs)
- [Get API Key](https://makersuite.google.com/app/apikey)
- [Pricing Info](https://ai.google.dev/pricing)
- [API Reference](https://ai.google.dev/api/rest/v1beta/models/generateContent)
