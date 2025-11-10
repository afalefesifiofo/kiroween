import { motion } from 'framer-motion'

export default function PersonalityCard({ mode, isActive, onClick }) {
  const personalities = {
    helper: { emoji: '📎', name: 'Helper', description: 'Fast typing', gradient: 'from-blue-400 to-blue-600' },
    mentor: { emoji: '🧑‍🏫', name: 'Mentor', description: 'Text selection', gradient: 'from-purple-400 to-purple-600' },
    haunted: { emoji: '👻', name: 'Haunted', description: 'Late night', gradient: 'from-gray-600 to-gray-900' }
  }

  const p = personalities[mode]
  const activeClass = isActive ? 'bg-gradient-to-br ' + p.gradient + ' text-white shadow-xl' : 'bg-white border-2 border-gray-200'

  return (
    <motion.div onClick={onClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={'relative p-4 rounded-xl cursor-pointer ' + activeClass}>
      {isActive && <motion.div className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}><span className="text-xs">✓</span></motion.div>}
      <div className="text-3xl mb-2">{p.emoji}</div>
      <div className={'font-semibold mb-1 ' + (isActive ? 'text-white' : 'text-gray-900')}>{p.name}</div>
      <div className={'text-xs ' + (isActive ? 'text-white/90' : 'text-gray-600')}>{p.description}</div>
    </motion.div>
  )
}
