import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatBubble from './ChatBubble'
import clippyAgent from '../agents/clippy-agent'

const PERSONALITIES = {
  helper: {
    color: 'bg-blue-500',
    emoji: '📎',
    mode: 'Helper',
    greeting: 'Hi! Need help with formatting?',
    greetings: [
      'Hi! Need help with formatting?',
      'Ready to assist with your writing!',
      'Let me help you organize that.',
    ]
  },
  mentor: {
    color: 'bg-purple-500',
    emoji: '🧑‍🏫',
    mode: 'Mentor',
    greeting: 'Let me explain that concept...',
    greetings: [
      'Let me explain that concept...',
      'Great question! Let me break that down.',
      'I see you\'re learning. Want some guidance?',
    ]
  },
  haunted: {
    color: 'bg-gray-800',
    emoji: '👻',
    mode: 'Haunted',
    greeting: 'Debugging at 2 AM again? I see you...',
    greetings: [
      'Debugging at 2 AM again? I see you...',
      'The ghost of Clippy past is here to help.',
      'Still awake? Your code is haunted by bugs.',
    ]
  }
}

export default function ClippyWidget({ context }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [previousMode, setPreviousMode] = useState(context.mode)
  
  const personality = PERSONALITIES[context.mode] || PERSONALITIES.helper

  // Auto-open when mode changes
  useEffect(() => {
    if (context.mode !== previousMode && context.confidence > 0.7) {
      setPreviousMode(context.mode)
      
      // Pick random greeting
      const greetings = personality.greetings || [personality.greeting]
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
      setMessage(randomGreeting)
      
      // Auto-open for 5 seconds
      setIsOpen(true)
      const timer = setTimeout(() => setIsOpen(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [context.mode, previousMode, personality, context.confidence])

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      const greetings = personality.greetings || [personality.greeting]
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
      setMessage(randomGreeting)
    }
  }

  const handleSend = async (userInput) => {
    clippyAgent.switchMode(context.mode)
    const response = await clippyAgent.getResponse(userInput, context)
    return response
  }

  // Different animations per personality
  const getAnimation = () => {
    switch (context.mode) {
      case 'haunted':
        return {
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
        }
      case 'mentor':
        return {
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
        }
      default:
        return {
          y: [0, -10, 0],
        }
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <ChatBubble 
            message={message}
            personality={personality}
            context={context}
            onClose={() => setIsOpen(false)}
            onSend={handleSend}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className={`${personality.color} text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center text-3xl cursor-pointer relative`}
        animate={getAnimation()}
        transition={{
          duration: context.mode === 'haunted' ? 3 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        {personality.emoji}
        
        {/* Pulse ring for high confidence */}
        {context.confidence > 0.8 && (
          <motion.div
            className={`absolute inset-0 rounded-full ${personality.color} opacity-30`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>

      {/* Mode indicator tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-20 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap"
      >
        {personality.mode} Mode
      </motion.div>
    </div>
  )
}
