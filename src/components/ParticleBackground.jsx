import { useEffect, useRef } from 'react'

const CONFIG = {
  count:       55,    // particles
  maxDist:     130,   // px — connect if closer than this
  speed:       0.28,  // drift speed
  dotRadius:   1.2,   // particle radius
  dotOpacity:  0.55,  // particle fill opacity
  lineOpacity: 0.13,  // max line opacity (fades with distance)
  color:       '12,252,168',   // accent RGB — #0CFCA8
  colorAlt:    '56,189,248',   // sky RGB   — #38BDF8  (used on 1/4 particles)
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    let particles = []
    let W = 0, H = 0

    const isMobile = () => window.innerWidth < 768

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    function makeParticle() {
      const useAlt = Math.random() < 0.25
      return {
        x:    Math.random() * W,
        y:    Math.random() * H,
        vx:   (Math.random() - 0.5) * CONFIG.speed,
        vy:   (Math.random() - 0.5) * CONFIG.speed,
        r:    Math.random() * CONFIG.dotRadius + 0.4,
        c:    useAlt ? CONFIG.colorAlt : CONFIG.color,
      }
    }

    function initParticles() {
      const count = isMobile() ? Math.floor(CONFIG.count * 0.45) : CONFIG.count
      particles   = Array.from({ length: count }, makeParticle)
    }

    function tick() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -5)  p.x = W + 5
        if (p.x > W + 5) p.x = -5
        if (p.y < -5)  p.y = H + 5
        if (p.y > H + 5) p.y = -5

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},${CONFIG.dotOpacity})`
        ctx.fill()

        // Draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d  = Math.sqrt(dx * dx + dy * dy)

          if (d < CONFIG.maxDist) {
            const alpha = (1 - d / CONFIG.maxDist) * CONFIG.lineOpacity
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            // blend the two particle colors if different
            const lineColor = p.c === q.c ? p.c : CONFIG.color
            ctx.strokeStyle = `rgba(${lineColor},${alpha})`
            ctx.lineWidth   = 0.6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(tick)
    }

    let resizeTimer
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        initParticles()
      }, 150)
    }

    resize()
    initParticles()
    tick()

    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.75 }}
    />
  )
}
