import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, FileText } from 'lucide-react'

// Inline SVG — avoids lucide Github deprecation hint (all aliases are flagged)
const GithubIcon = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const COLOR_MAP = {
  accent:   { text: 'text-accent',   border: 'border-accent/30',   glow: 'hover:shadow-[0_0_40px_rgba(12,252,168,0.12)]',   tag: 'bg-accent/10 text-accent',   bar: 'bg-accent'   },
  sky:      { text: 'text-sky',      border: 'border-sky/30',      glow: 'hover:shadow-[0_0_40px_rgba(56,189,248,0.12)]',   tag: 'bg-sky/10 text-sky',         bar: 'bg-sky'      },
  lavender: { text: 'text-lavender', border: 'border-lavender/30', glow: 'hover:shadow-[0_0_40px_rgba(167,136,250,0.12)]', tag: 'bg-lavender/10 text-lavender', bar: 'bg-lavender' },
}

export default function Projects() {
  const sectionRef    = useRef(null)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proj-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.proj-heading', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.proj-card',
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-28 px-6 bg-bg-surface/30 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="proj-heading text-center mb-16">
            <span className="inline-block font-mono text-accent text-sm tracking-widest uppercase mb-3">
              04 — Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-text-heading">
              Things I've Built
            </h2>
            <p className="text-text-muted mt-3 max-w-md mx-auto">
              Production-grade projects with real impact and measurable outcomes.{' '}
              <span className="text-accent font-medium">Click any card</span> for full documentation.
            </p>
          </div>

          {/* Cards */}
          <div className="projects-grid grid md:grid-cols-3 gap-6">
            {projects.map((project) => {
              const colors = COLOR_MAP[project.color] ?? COLOR_MAP.accent
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  colors={colors}
                  onOpenModal={() => setActiveProject(project)}
                />
              )
            })}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-14"
          >
            <p className="text-text-muted text-sm mb-4">More projects on GitHub</p>
            <a
              href="https://github.com/dev-ayush0106"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-body font-medium hover:text-accent hover:border-accent/40 transition-all duration-200 group"
            >
              <GithubIcon size={18} />
              github.com/dev-ayush0106
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal — rendered outside section so it overlays everything */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}

function ProjectCard({ project, colors, onOpenModal }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`proj-card relative rounded-2xl border ${colors.border} bg-bg-card overflow-hidden group flex flex-col ${colors.glow} transition-shadow duration-300 cursor-pointer`}
      onClick={onOpenModal}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${colors.bar}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`text-xs font-mono font-semibold tracking-widest uppercase ${colors.text} mb-1`}>
              {project.tag}
            </div>
            <h3 className="text-text-heading text-xl font-bold leading-tight">{project.title}</h3>
            <p className="text-text-muted text-xs mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-body text-sm leading-relaxed mb-5">{project.description}</p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-6 flex-1">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
              <span className={`${colors.text} mt-0.5 flex-shrink-0 font-bold`}>✓</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 text-xs rounded-lg border ${colors.tag} border-current/20 font-medium`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* View docs CTA */}
        <div
          className={`flex items-center gap-2 text-xs font-semibold ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        >
          <FileText size={13} />
          View full documentation →
        </div>
      </div>
    </motion.div>
  )
}
