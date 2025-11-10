# Clippy 2.0 — The Contextual Companion

> "The ghost of Clippy returns — smarter, adaptive, and actually helpful this time."

## 💡 Overview

Clippy 2.0 reimagines Microsoft's iconic assistant as an AI-powered, multi-personality companion that adapts to your workflow and mood. Using Kiro's agent hooks, vibe coding, and steering docs, Clippy dynamically shifts tone, expertise, and visual behavior depending on what you're doing.

## 🎭 Personality Modes

- **🤓 Helper Mode** → Guides documentation and formatting
- **🧑‍🏫 Mentor Mode** → Explains concepts clearly
- **👻 Haunted Mode** → Sarcastic support for late-night coding

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# (Optional) Add your Gemini API key for AI responses
# Edit .env file: VITE_GEMINI_API_KEY=your_key_here
# Get free key: https://makersuite.google.com/app/apikey

# Start dev server
npm run dev
```

Open http://localhost:5173 and interact with Clippy!

**📖 AI Setup Guide**: See [QUICK_START_AI.md](QUICK_START_AI.md) for enabling real AI responses

## 🤖 AI-Powered Features

- **Google Gemini Integration**: Real AI conversations with personality
- **Context-Aware Responses**: AI knows your current mode and activity
- **Conversation Memory**: Remembers last 3 exchanges
- **Fallback Mode**: Works without API key using smart responses
- **Free Tier**: 60 requests/min, 1500/day with Gemini Pro

## 🏗️ Architecture

- **Frontend**: React + Framer Motion
- **AI Engine**: Google Gemini Pro API
- **Personality System**: Kiro steering docs (`.kiro/steering/`)
- **Context Detection**: Browser APIs + activity patterns
- **State**: LocalStorage for session persistence

## 🎨 Features

- Floating animated Clippy widget
- Context-aware personality switching
- Real-time activity detection
- Smooth animations and transitions
- Chat interface for direct interaction

## 📅 Development Roadmap

- [x] Week 1: Base React widget + 3 personality modes
- [ ] Week 2: Advanced context detection
- [ ] Week 3: Enhanced animations + reactions
- [ ] Week 4: Polish + demo video

## 🧠 Why It's Special

- Fully client-side and instant
- Showcases Kiro's vibe coding beautifully
- Playful, nostalgic, and deeply interactive
- Combines humor, design, and AI personality engineering

---

Built with ❤️ and a touch of nostalgia
