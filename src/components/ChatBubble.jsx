import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ChatBubble({ message, personality, onClose, onSend, context }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { text: message, sender: 'clippy' }
  ])

  const handleSend = () => {
    if (!input.trim()) return
    
    // Add user message
    const newMessages = [...messages, { text: input, sender: 'user' }]
    setMessages(newMessages)
    
    // Get Clippy response
    if (onSend) {
      onSend(input)
        .then(response => {
          setMessages([...newMessages, { text: response, sender: 'clippy' }])
        })
        .catch(error => {
          setMessages([...newMessages, { 
            text: `❌ Error: ${error.message}. Please check your API key in .env file.`, 
            sender: 'clippy' 
          }])
        })
    }
    
    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className={`${personality.color} text-white px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{personality.emoji}</span>
          <div>
            <div className="font-semibold text-sm">Clippy 2.0</div>
            <div className="text-xs opacity-90">{personality.mode} mode</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 max-h-64 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Context indicator */}
      {context && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Activity: {context.activity} • Confidence: {Math.round(context.confidence * 100)}%
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Clippy..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSend}
          className={`${personality.color} text-white px-4 py-2 rounded-md text-sm hover:opacity-90`}
        >
          Send
        </button>
      </div>
    </motion.div>
  )
}
