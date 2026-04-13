import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useSmoothScroll from '../hooks/useSmoothScroll'

const NAV_LINKS = [
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Contact',    id: 'contact'    },
]

export default function Navbar() {
  const [hidden, setHidden]         = useState(false)
  const [atTop, setAtTop]           = useState(true)
  const [active, setActive]         = useState('')
  const [menuOpen, setMenuOpen]     = useState(false)
  const lastScrollY                 = useRef(0)
  const scrollTo                    = useSmoothScroll()

  // Hide/show on scroll direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < 20)
      setHidden(y > lastScrollY.current && y > 80)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const observers = []
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNav = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(`#${id}`)
  }

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        atTop ? 'bg-transparent' : 'bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('top')}
          className="font-mono font-bold text-xl text-accent tracking-tight hover:opacity-80 transition-opacity"
        >
          AK<span className="text-text-muted">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNav(e, id)}
                className={`relative text-sm font-medium transition-colors duration-200 group ${
                  active === id ? 'text-accent' : 'text-text-body hover:text-text-heading'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    active === id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Hire me CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, 'contact')}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/40 text-accent text-sm font-medium hover:bg-accent/10 transition-colors duration-200"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-body hover:text-accent transition-colors"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-card/95 backdrop-blur-md border-b border-border-subtle px-6 pb-6 pt-2"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleNav(e, id)}
                    className={`block text-base font-medium py-1 transition-colors ${
                      active === id ? 'text-accent' : 'text-text-body'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, 'contact')}
                  className="inline-block mt-2 px-5 py-2 rounded-lg bg-accent text-bg-primary text-sm font-semibold"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
