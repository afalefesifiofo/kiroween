// Clippy Agent - Simple & Smart (No AI needed!)

export class ClippyAgent {
  constructor() {
    this.currentMode = 'helper'
    this.conversationHistory = []
  }

  switchMode(mode) {
    this.currentMode = mode
    console.log(`Clippy switched to ${mode} mode`)
  }

  async getResponse(userInput) {
    // Simulate thinking
    await new Promise(resolve => setTimeout(resolve, 300))

    const input = userInput.toLowerCase()
    let response = ''

    // Helper Mode Responses
    if (this.currentMode === 'helper') {
      if (input.includes('how')) {
        response = 'Let me guide you through it step by step. What specifically would you like help with?'
      } else if (input.includes('format') || input.includes('organize')) {
        response = 'Try breaking it into clear sections with headings. Use bullet points for lists!'
      } else if (input.includes('code') || input.includes('bug')) {
        response = 'First, check the console for errors. Then verify your syntax. I can help debug!'
      } else if (input.includes('help')) {
        response = 'I\'m here to help! Tell me what you\'re working on and I\'ll assist you.'
      } else {
        response = 'What can I help you with today? I\'m ready to assist!'
      }
    }
    
    // Mentor Mode Responses
    else if (this.currentMode === 'mentor') {
      if (input.includes('why')) {
        response = 'Great question! It works this way because of the underlying principles. Think of it like building blocks.'
      } else if (input.includes('what')) {
        response = 'Let me explain: it\'s a concept that helps you understand how things connect together.'
      } else if (input.includes('how')) {
        response = 'Good question! The process involves several steps. Let me break it down for you.'
      } else if (input.includes('learn') || input.includes('understand')) {
        response = 'Learning is a journey! Start with the basics, then build up. What would you like to understand better?'
      } else {
        response = 'That\'s an interesting topic! I\'m here to help you learn. What would you like to explore?'
      }
    }
    
    // Haunted Mode Responses
    else if (this.currentMode === 'haunted') {
      const hour = new Date().getHours()
      if (input.includes('error') || input.includes('bug')) {
        response = `👻 Ah, bugs haunting your code at ${hour}:00? Let me help exorcise them. What's the error message?`
      } else if (input.includes('help') || input.includes('fix')) {
        response = '👻 The spirits sense your frustration... Fear not! Even the spookiest bugs have solutions.'
      } else if (input.includes('tired') || input.includes('late')) {
        response = '👻 Still awake? The code whispers to you in the darkness... Maybe take a break?'
      } else {
        response = `👻 Coding at ${hour}:00? The ghost of Clippy is here to help... if you dare ask.`
      }
    }

    // Store in history
    this.conversationHistory.push({ role: 'user', text: userInput })
    this.conversationHistory.push({ role: 'assistant', text: response })
    
    return response
  }

  getConversationHistory() {
    return this.conversationHistory
  }

  clearHistory() {
    this.conversationHistory = []
  }
}

export default new ClippyAgent()
