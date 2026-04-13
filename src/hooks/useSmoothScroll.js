import { useCallback } from 'react'

/**
 * Returns a scrollTo helper that uses the Lenis instance
 * stored on window.__lenis (set in App.jsx).
 *
 * Usage:
 *   const scrollTo = useSmoothScroll()
 *   scrollTo('#projects')          // scroll to id
 *   scrollTo(someElement)          // scroll to DOM element
 *   scrollTo('top')                // scroll to top
 */
export function useSmoothScroll() {
  const scrollTo = useCallback((target, options = {}) => {
    const lenis = window.__lenis
    if (!lenis) {
      // Fallback: native smooth scroll
      if (typeof target === 'string' && target !== 'top') {
        const el = document.querySelector(target)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    lenis.scrollTo(target, { duration: 1.2, ...options })
  }, [])

  return scrollTo
}

export default useSmoothScroll
