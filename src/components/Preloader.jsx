import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onDone }) {
  const overlayRef  = useRef(null)
  const logoRef     = useRef(null)
  const lineRef     = useRef(null)
  const counterRef  = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Block body scroll while loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()

    // 1. Fade in logo + line
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    // 2. Animate counter 0 → 100
    tl.to({}, {
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate() {
        const progress = Math.round(this.progress() * 100)
        setCount(progress)
      },
    }, '-=0.2')
    // 3. Line fill
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power2.inOut', transformOrigin: 'left center' },
      '<'
    )
    // 4. Brief pause at 100
    tl.to({}, { duration: 0.2 })
    // 5. Slide overlay up and out
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        document.body.style.overflow = ''
        onDone()
      },
    })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-primary"
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />

      <div className="relative flex flex-col items-center gap-8 w-56">

        {/* Logo */}
        <div ref={logoRef} className="opacity-0 text-center">
          <div className="font-mono font-black text-5xl text-accent tracking-tight leading-none">
            AK<span className="text-text-muted">.</span>
          </div>
          <div className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">
            Full Stack AI Engineer
          </div>
        </div>

        {/* Progress track */}
        <div className="w-full space-y-2">
          <div className="h-px w-full bg-border-subtle overflow-hidden rounded-full">
            <div
              ref={lineRef}
              className="h-full bg-accent rounded-full"
              style={{ transformOrigin: 'left center', scaleX: 0 }}
            />
          </div>
          {/* Counter */}
          <div
            ref={counterRef}
            className="flex justify-end font-mono text-xs text-accent tabular-nums"
          >
            {String(count).padStart(3, '0')}%
          </div>
        </div>
      </div>
    </div>
  )
}
