import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Provides a GSAP context scoped to a container ref.
 * The callback receives the scoped gsap context — all animations
 * inside will be cleaned up automatically on unmount.
 *
 * Usage:
 *   const containerRef = useGsap((ctx) => {
 *     gsap.from('.item', { opacity: 0, y: 30, stagger: 0.1 })
 *   })
 */
export function useGsap(callback, deps = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      callback(ctx)
    }, containerRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

export default useGsap
