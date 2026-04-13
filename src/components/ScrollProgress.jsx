import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      bar.style.width  = `${pct}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9990] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full bg-accent rounded-r-full"
        style={{
          width: '0%',
          boxShadow: '0 0 8px rgba(12,252,168,0.6)',
          transition: 'width 0.08s linear',
        }}
      />
    </div>
  )
}
