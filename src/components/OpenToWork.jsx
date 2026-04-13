import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function OpenToWork() {
  const [expanded, setExpanded] = useState(false)
  const [visible,  setVisible]  = useState(false)

  // Show badge after page loads (give preloader time to exit)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{   opacity: 0, x: 60 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={() => setExpanded((p) => !p)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-bg-card border border-accent/40 shadow-lg shadow-accent/10 cursor-pointer select-none"
            aria-label="Open to work — click for details"
          >
            {/* Pulse dot */}
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-accent text-sm font-semibold font-mono whitespace-nowrap">
              Open to Work
            </span>
          </motion.button>

          {/* Expanded card */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{   opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute bottom-14 right-0 w-64 rounded-2xl bg-bg-card border border-accent/25 shadow-2xl shadow-accent/10 p-5 text-left"
              >
                <div className="text-accent text-xs font-mono uppercase tracking-widest mb-3">
                  Available For
                </div>
                <ul className="space-y-2 text-sm text-text-body mb-4">
                  {[
                    'Full-time roles',
                    'Freelance / Contract',
                    'Open-source collaboration',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-accent font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => {
                    setExpanded(false)
                    window.__lenis?.scrollTo('#contact')
                  }}
                  className="block w-full text-center py-2 rounded-xl bg-accent text-bg-primary text-sm font-bold hover:bg-accent-hover transition-colors"
                >
                  Let's Talk →
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
