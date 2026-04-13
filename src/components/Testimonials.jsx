import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ravi Shankar',
    role: 'Tech Lead',
    company: 'Codesquadz',
    avatar: 'RS',
    color: '#0CFCA8',
    relation: 'Direct Manager',
    text: `Ayush joined us and within the first month had already shipped 12+ API endpoints, resolved 15 production bugs, and standardised our entire ESLint config. What stood out wasn't just the output — it was how he approached problems. He refactored our MongoDB query layer without being asked, and the 40% response time drop spoke for itself. Exactly the kind of engineer you want on a fast-moving team.`,
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Product Manager',
    company: 'AAM Infotech Pvt. Ltd.',
    avatar: 'PM',
    color: '#38BDF8',
    relation: 'Cross-functional Colleague',
    text: `The Gemini AI integration Ayush built for us was a game-changer for the marketing team — we went from spending hours writing product descriptions to having them generated in seconds. He also set up the CI/CD pipeline that cut our release cycle from 3 days to under 4 hours. Ayush is one of those rare developers who actually understands the business impact of what he builds.`,
  },
  {
    id: 3,
    name: 'Ankit Verma',
    role: 'Junior Developer',
    company: 'Mega Career',
    avatar: 'AV',
    color: '#A788FA',
    relation: 'Mentee',
    text: `Ayush mentored me through weekly pair-programming sessions when I was just starting out. Within 6 weeks I was independently merging PRs — something I didn't think was possible that fast. He has a rare ability to explain complex concepts simply, and he genuinely cares about the people he works with. The React component library he built is still used across 3 of our projects today.`,
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.test-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.test-heading', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.test-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.test-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="py-28 px-6 bg-bg-surface/30 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="test-heading text-center mb-16">
          <span className="inline-block font-mono text-accent text-sm tracking-widest uppercase mb-3">
            05 — Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-text-heading">
            What People Say
          </h2>
          <p className="text-text-muted mt-3 max-w-md mx-auto">
            From managers, colleagues, and mentees who've worked with me directly
          </p>
        </div>

        {/* Cards */}
        <div className="test-grid grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

      </div>
    </section>
  )
}

function TestimonialCard({ t }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="test-card flex flex-col rounded-2xl border border-border-subtle bg-bg-card p-6 relative overflow-hidden"
    >
      {/* Accent top bar */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: t.color }} />

      {/* Large quote icon */}
      <Quote
        size={36}
        className="mb-4 opacity-15 flex-shrink-0"
        style={{ color: t.color }}
      />

      {/* Quote text */}
      <p className="text-text-body text-sm leading-relaxed flex-1 mb-6">
        "{t.text}"
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm text-bg-primary flex-shrink-0"
          style={{ background: t.color }}
        >
          {t.avatar}
        </div>
        <div className="min-w-0">
          <div className="text-text-heading text-sm font-bold truncate">{t.name}</div>
          <div className="text-text-muted text-xs truncate">{t.role} · {t.company}</div>
        </div>
        {/* Relation badge */}
        <span
          className="ml-auto text-[10px] font-mono px-2 py-1 rounded-lg flex-shrink-0"
          style={{ background: t.color + '15', color: t.color }}
        >
          {t.relation}
        </span>
      </div>
    </motion.div>
  )
}
