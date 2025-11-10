import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ActivityIndicator({ context }) {
  const [recentActivities, setRecentActivities] = useState([])

  useEffect(() => {
    setRecentActivities(prev => {
      const newActivities = [...prev, { mode: context.mode, activity: context.activity, timestamp: Date.now(), confidence: context.confidence }]
      return newActivities.slice(-5)
    })
  }, [context.mode, context.activity])

  const getActivityIcon = (activity) => {
    const icons = { 'late-night': '🌙', 'frustrated': '😤', 'reading': '📖', 'thinking': '💭', 'productive': '⚡', 'idle': '💤', 'typing': '⌨️', 'manual': '👆' }
    return icons[activity] || '•'
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold text-gray-600 mb-2">Recent Activity</div>
      <div className="space-y-1">
        {recentActivities.map((item, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-xs text-gray-600">
            <span>{getActivityIcon(item.activity)}</span>
            <span className="flex-1">{item.activity}</span>
            <span className="text-gray-400">{Math.round(item.confidence * 100)}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
