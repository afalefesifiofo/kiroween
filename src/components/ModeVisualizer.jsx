import { motion } from 'framer-motion'

export default function ModeVisualizer({ context }) {
  const getModeColor = () => {
    switch (context.mode) {
      case 'helper': return 'from-blue-400 to-blue-600'
      case 'mentor': return 'from-purple-400 to-purple-600'
      case 'haunted': return 'from-gray-600 to-gray-900'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${getModeColor()}`}
        initial={{ width: 0 }}
        animate={{ width: `${context.confidence * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
