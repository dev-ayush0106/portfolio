import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react'
import useTypewriter from '../hooks/useTypewriter'

const NAME    = 'Ayush Kumar'
const TAGLINE = 'I build AI-powered web applications end-to-end'
const ROLES   = [
  'Full Stack AI Engineer',
  'MERN Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'AI Integration Expert',
]

export default function Hero() {
  const { text: roleText } = useTypewriter(ROLES, { typeSpeed: 75, deleteSpeed: 40, pauseMs: 1800 })
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const nameRef    = useRef(null)
  const taglineRef = useRef(null)
  const ctaRef     = useRef(null)
  const scrollRef  = useRef(null)
  const orb1Ref    = useRef(null)
  const orb2Ref    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, { y: -20, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(orb2Ref.current, { y: 20, x: -15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })

      const tl = gsap.timeline({ delay: 0.4 })
      tl.fromTo(labelRef.current,
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(nameRef.current.querySelectorAll('.char'),
        { opacity: 0, y: 60, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.75, ease: 'power4.out', stagger: 0.04 },
        '-=0.2'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(ctaRef.current.children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.12 },
        '-=0.25'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.1'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(12,252,168,0.06),transparent)]" />
      <div ref={orb1Ref} className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />
      <div ref={orb2Ref} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-sky/5 blur-[120px] pointer-events-none" />

      {/* Main content — two column on desktop */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-20 pt-20 lg:pt-0">

        {/* ── LEFT: Text ─────────────────────────────────────────────── */}
        <div className="flex-1 text-center lg:text-left">

          {/* Typewriter badge */}
          <div ref={labelRef} className="opacity-0 mb-6 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-mono tracking-widest uppercase min-w-[260px] justify-center">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow flex-shrink-0" />
              <span>
                {roleText}
                <span className="inline-block w-[2px] h-[1em] bg-accent align-middle ml-0.5 animate-pulse" />
              </span>
            </span>
          </div>

          {/* Name */}
          <h1 className="mb-5 leading-none perspective">
            <span className="block text-2xl md:text-3xl font-semibold text-text-body mb-1">Hi, I'm</span>
            <span
              ref={nameRef}
              className="block text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-accent"
              aria-label={NAME}
            >
              {NAME.split('').map((char, i) => (
                <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="opacity-0 text-text-body text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            {TAGLINE}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Ayush_Kumar_Resume.pdf"
              className="flex items-center gap-2 px-7 py-3.5 bg-accent text-bg-primary font-bold rounded-lg hover:bg-accent-hover transition-colors duration-200 text-base shadow-lg shadow-accent/20"
            >
              <Download size={18} />
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo('#contact') }}
              className="flex items-center gap-2 px-7 py-3.5 border border-accent/40 text-accent font-bold rounded-lg hover:bg-accent/10 transition-colors duration-200 text-base"
            >
              <Mail size={18} />
              Contact Me
            </a>
            <div className="flex items-center gap-3">
              <a href="https://github.com/dev-ayush0106" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border-default text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-200" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/ayush-kumar-071332312" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border-default text-text-muted hover:text-sky hover:border-sky/40 transition-all duration-200" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-8 flex-wrap"
          >
            {[
              { value: '3+',   label: 'Years Exp.'   },
              { value: '15+',  label: 'Projects'      },
              { value: '500+', label: 'Users Served'  },
              { value: '3',    label: 'Companies'     },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-black text-accent font-mono">{value}</div>
                <div className="text-xs text-text-muted font-medium tracking-wider uppercase mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Photo ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <div className="relative w-64 md:w-80 lg:w-96">

            {/* Ambient glow beneath the figure */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-40 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

            {/* Portrait image */}
            <img
              src={`${import.meta.env.BASE_URL}photo.png`}
              alt="Ayush Kumar"
              className="relative w-full h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(12,252,168,0.10))',
              }}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'flex'
              }}
            />
            {/* Fallback */}
            <div className="hidden items-center justify-center h-72 bg-bg-surface rounded-2xl border border-border-subtle">
              <span className="text-6xl font-black text-accent font-mono select-none">AK</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-accent" />
        </motion.div>
      </div>
    </section>
  )
}
