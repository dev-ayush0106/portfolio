import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Layers } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillCategories } from '../data/skills'

gsap.registerPlugin(ScrollTrigger)

const TAG_COLOR = {
  Expert:     'bg-accent/10 text-accent border-accent/20',
  Advanced:   'bg-sky/10 text-sky border-sky/20',
  Proficient: 'bg-lavender/10 text-lavender border-lavender/20',
}

function TiltCard({ children, className }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = ((e.clientY - cy) / (rect.height / 2)) * 8
    const ry = -((e.clientX - cx) / (rect.width / 2)) * 8
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id)
  const sectionRef = useRef(null)

  const activeCategory = skillCategories.find((c) => c.id === activeTab)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-heading', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.skills-tabs',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-tabs', start: 'top 88%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-28 px-6 bg-bg-surface/30 relative">
      {/* Subtle divider lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="skills-heading text-center mb-12">
          <span className="inline-block font-mono text-accent text-sm tracking-widest uppercase mb-3">
            02 — Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-text-heading">
            Tech Stack
          </h2>
          <p className="text-text-muted mt-3 max-w-md mx-auto">
            Tools and technologies I use to build production-ready applications
          </p>
        </div>

        {/* Category tabs */}
        <div className="skills-tabs flex items-center justify-center gap-2 flex-wrap mb-12">
          {skillCategories.map(({ id, title, icon, colorHex }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                activeTab === id
                  ? 'border-transparent text-bg-primary'
                  : 'border-border-default text-text-body hover:text-text-heading hover:border-border-default/80'
              }`}
              style={activeTab === id ? { backgroundColor: colorHex } : {}}
            >
              <span>{icon}</span>
              {title}
              {activeTab === id && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl -z-10"
                  style={{ backgroundColor: colorHex }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {activeCategory.skills.map(({ name, tag, years, proof }) => (
              <TiltCard
                key={name}
                className="rounded-2xl border border-border-subtle bg-bg-card p-5 group cursor-default"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <span className="text-text-heading font-semibold text-sm leading-snug">{name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ml-2 ${TAG_COLOR[tag] ?? TAG_COLOR.Proficient}`}>
                    {tag}
                  </span>
                </div>

                {/* Proof metrics */}
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg flex-1 min-w-0"
                    style={{ background: activeCategory.colorHex + '12' }}
                  >
                    <Clock size={11} style={{ color: activeCategory.colorHex, flexShrink: 0 }} />
                    <span className="text-xs font-mono font-semibold truncate" style={{ color: activeCategory.colorHex }}>
                      {years}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg flex-1 min-w-0"
                    style={{ background: activeCategory.colorHex + '12' }}
                  >
                    <Layers size={11} style={{ color: activeCategory.colorHex, flexShrink: 0 }} />
                    <span className="text-xs font-mono font-semibold truncate" style={{ color: activeCategory.colorHex }}>
                      {proof}
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <p className="text-center text-text-muted text-sm mt-10 font-mono">
          + Agile/Scrum · Code Reviews · MVC Architecture · Jest · Postman
        </p>
      </div>
    </section>
  )
}
