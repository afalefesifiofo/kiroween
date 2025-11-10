import { useState, useEffect, useRef } from 'react'
import ClippyWidget from './components/ClippyWidget'
import AISetupBanner from './components/AISetupBanner'
import { detectContext, trackTyping, detectFrustration, saveContext } from './utils/context-detector'

function App() {
  const [context, setContext] = useState({ mode: 'helper', activity: 'idle', confidence: 0.5 })
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = () => {
      trackTyping()
      updateContext()
    }

    const handleSelection = () => {
      updateContext()
    }

    const updateContext = () => {
      const newContext = detectContext()
      
      // Check for frustration in text
      if (text) {
        detectFrustration(text)
      }
      
      setContext(newContext)
      saveContext(newContext)
    }

    // Listen to user activity
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mouseup', handleSelection)
    
    // Periodic context check
    const interval = setInterval(updateContext, 3000)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mouseup', handleSelection)
      clearInterval(interval)
    }
  }, [text])

  const handleTextChange = (e) => {
    setText(e.target.value)
    trackTyping()
  }

  const triggerMode = (mode) => {
    setContext({ mode, activity: 'manual', confidence: 1.0, reason: 'Manual trigger' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Clippy 2.0 Demo
          </h1>
          <p className="text-gray-600">
            Try typing, selecting text, or triggering different modes. Clippy adapts to your context!
          </p>
        </div>

        <AISetupBanner />

        {/* Mode triggers */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => triggerMode('helper')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            📎 Helper Mode
          </button>
          <button
            onClick={() => triggerMode('mentor')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
          >
            🧑‍🏫 Mentor Mode
          </button>
          <button
            onClick={() => triggerMode('haunted')}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            👻 Haunted Mode
          </button>
        </div>

        {/* Context display */}
        <div className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Current Mode:</span> {context.mode} • 
              <span className="font-semibold ml-2">Activity:</span> {context.activity} • 
              <span className="font-semibold ml-2">Confidence:</span> {Math.round(context.confidence * 100)}%
              {context.reason && (
                <>
                  <br />
                  <span className="text-xs text-gray-500">Reason: {context.reason}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">✨ Smart Responses</span>
            </div>
          </div>
        </div>
        
        {/* Main textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none shadow-sm font-mono text-sm"
          placeholder="Start typing here... Clippy is watching 👀

Try:
- Typing fast to trigger Helper mode
- Selecting text to trigger Mentor mode  
- Typing 'error' or 'bug' to trigger Haunted mode
- Or just wait until late night (10 PM - 5 AM) for automatic Haunted mode"
        />

        {/* Tips */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl mb-2">📎</div>
            <div className="text-sm font-semibold text-blue-900">Helper Mode</div>
            <div className="text-xs text-blue-700 mt-1">Fast typing, productive work</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl mb-2">🧑‍🏫</div>
            <div className="text-sm font-semibold text-purple-900">Mentor Mode</div>
            <div className="text-xs text-purple-700 mt-1">Text selection, thoughtful pace</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
            <div className="text-2xl mb-2">👻</div>
            <div className="text-sm font-semibold text-gray-900">Haunted Mode</div>
            <div className="text-xs text-gray-700 mt-1">Late night, frustration detected</div>
          </div>
        </div>
      </div>

      <ClippyWidget context={context} />
    </div>
  )
}

export default App
