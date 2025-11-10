import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function StatsPanel() {
  const [stats, setStats] = useState({ totalInteractions: 0, helperTime: 0, mentorTime: 0, hauntedTime: 0, mostUsedMode: 'helper' })

  useEffect(() => {
    const stored = localStorage.getItem('clippy-stats')
    if (stored) setStats(JSON.parse(stored))

    const interval = setInterval(() => {
      const history = JSON.parse(localStorage.getItem('clippy-history') || '[]')
      const modeCounts = { helper: 0, mentor: 0, haunted: 0 }
      history.forEach(entry => { if (modeCounts[entry.mode] !== undefined) modeCounts[entry.mode]++ })
      const mostUsed = Object.entries(modeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'helper'
      const newStats = { totalInteractions: history.length, helperTime: modeCounts.helper, mentorTime: modeCounts.mentor, hauntedTime: modeCounts.haunted, mostUsedMode: mostUsed }
      setStats(newStats)
      localStorage.setItem('clippy-stats', JSON.stringify(newStats))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getModeEmoji = (mode) => {
    const emojis = { helper: '📎', mentor: '🧑‍🏫', haunted: '👻' }
    return emojis[mode] || '📎'
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Stats</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.totalInteractions}</div>
          <div className="text-xs text-gray-600">Interactions</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl">{getModeEmoji(stats.mostUsedMode)}</div>
          <div className="text-xs text-gray-600">Most Used</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm"><span className="text-gray-600"> Helper</span><span className="font-semibold">{stats.helperTime}</span></div>
        <div className="flex items-center justify-between text-sm"><span className="text-gray-600"> Mentor</span><span className="font-semibold">{stats.mentorTime}</span></div>
        <div className="flex items-center justify-between text-sm"><span className="text-gray-600"> Haunted</span><span className="font-semibold">{stats.hauntedTime}</span></div>
      </div>
    </motion.div>
  )
}
