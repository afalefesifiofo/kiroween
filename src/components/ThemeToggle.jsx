import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.button onClick={toggleTheme} className="fixed top-4 right-4 p-3 bg-white rounded-full shadow-lg z-40" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <motion.span animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-xl block">
        {isDark ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  )
}
