import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100   // mouse
    let rx = -100, ry = -100   // ring (lagged)
    let hovered = false
    let clicked = false
    let animId
    let visible = false

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity  = '1'
        ring.style.opacity = '1'
      }
    }

    // Detect hoverable elements
    const onEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        hovered = true
      }
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, label')) {
        hovered = false
      }
    }

    const onDown = () => { clicked = true }
    const onUp   = () => { clicked = false }

    function tick() {
      // Snap dot to mouse
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`

      // Ring lerps toward mouse
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12

      const scale = hovered ? 2.2 : clicked ? 0.7 : 1
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`

      if (hovered) {
        ring.style.borderColor  = 'rgba(12,252,168,0.5)'
        ring.style.background   = 'rgba(12,252,168,0.06)'
      } else {
        ring.style.borderColor  = 'rgba(12,252,168,0.35)'
        ring.style.background   = 'transparent'
      }

      animId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseover',  onEnter)
    document.addEventListener('mouseout',   onLeave)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout',  onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#0CFCA8',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(12,252,168,0.35)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          transition: 'opacity 0.3s, border-color 0.2s, background 0.2s, transform 0.08s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
