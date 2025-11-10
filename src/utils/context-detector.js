// Advanced context detection with activity tracking
class ContextDetector {
  constructor() {
    this.typingSpeed = []
    this.lastKeyTime = Date.now()
    this.errorCount = 0
    this.idleTime = 0
    this.lastActivity = Date.now()
  }

  trackTyping() {
    const now = Date.now()
    const timeSinceLastKey = now - this.lastKeyTime
    this.typingSpeed.push(timeSinceLastKey)
    
    // Keep only last 10 keystrokes
    if (this.typingSpeed.length > 10) {
      this.typingSpeed.shift()
    }
    
    this.lastKeyTime = now
    this.lastActivity = now
  }

  getTypingSpeed() {
    if (this.typingSpeed.length === 0) return 0
    const avg = this.typingSpeed.reduce((a, b) => a + b, 0) / this.typingSpeed.length
    return avg
  }

  detectFrustration(text) {
    const frustrationWords = ['error', 'bug', 'broken', 'wtf', 'help', 'why', 'damn']
    const count = frustrationWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length
    
    this.errorCount = count
    return count > 0
  }

  getIdleTime() {
    return Date.now() - this.lastActivity
  }

  detectContext() {
    const hour = new Date().getHours()
    const selection = window.getSelection().toString()
    const typingSpeed = this.getTypingSpeed()
    const idleTime = this.getIdleTime()
    
    // Haunted mode for late night coding
    if (hour >= 22 || hour <= 5) {
      return { 
        mode: 'haunted', 
        activity: 'late-night',
        confidence: 0.9,
        reason: 'Late night detected'
      }
    }
    
    // Haunted mode if frustrated
    if (this.errorCount > 2) {
      return { 
        mode: 'haunted', 
        activity: 'frustrated',
        confidence: 0.8,
        reason: 'Frustration detected'
      }
    }
    
    // Mentor mode when text is selected (learning/reading)
    if (selection.length > 20) {
      return { 
        mode: 'mentor', 
        activity: 'reading',
        confidence: 0.85,
        reason: 'Text selection detected'
      }
    }
    
    // Mentor mode if typing slowly (thinking/learning)
    if (typingSpeed > 500 && typingSpeed < 2000) {
      return { 
        mode: 'mentor', 
        activity: 'thinking',
        confidence: 0.7,
        reason: 'Thoughtful typing pace'
      }
    }
    
    // Helper mode if typing fast (productive)
    if (typingSpeed > 0 && typingSpeed < 300) {
      return { 
        mode: 'helper', 
        activity: 'productive',
        confidence: 0.75,
        reason: 'Fast typing detected'
      }
    }
    
    // Helper mode by default
    return { 
      mode: 'helper', 
      activity: 'idle',
      confidence: 0.5,
      reason: 'Default mode'
    }
  }
}

export const detector = new ContextDetector()

export function detectContext() {
  return detector.detectContext()
}

export function trackTyping() {
  detector.trackTyping()
}

export function detectFrustration(text) {
  return detector.detectFrustration(text)
}

// Store activity in localStorage for persistence
export function saveContext(context) {
  localStorage.setItem('clippy-context', JSON.stringify(context))
  
  // Save history
  const history = JSON.parse(localStorage.getItem('clippy-history') || '[]')
  history.push({ ...context, timestamp: Date.now() })
  
  // Keep only last 50 entries
  if (history.length > 50) history.shift()
  
  localStorage.setItem('clippy-history', JSON.stringify(history))
}

export function loadContext() {
  const stored = localStorage.getItem('clippy-context')
  return stored ? JSON.parse(stored) : { mode: 'helper', activity: 'idle' }
}

export function getContextHistory() {
  return JSON.parse(localStorage.getItem('clippy-history') || '[]')
}
