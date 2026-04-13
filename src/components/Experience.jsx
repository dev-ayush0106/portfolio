import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Calendar, Briefcase, Circle } from 'lucide-react'
import { experiences } from '../data/experience'

gsap.registerPlugin(ScrollTrigger)

const COLOR_MAP = {
  accent:   { dot: 'bg-accent',   text: 'text-accent',   border: 'border-accent/30',   badge: 'bg-accent/10 text-accent',   ring: 'ring-accent/30'   },
  sky:      { dot: 'bg-sky',      text: 'text-sky',      border: 'border-sky/30',      badge: 'bg-sky/10 text-sky',         ring: 'ring-sky/30'      },
  lavender: { dot: 'bg-lavender', text: 'text-lavender', border: 'border-lavender/30', badge: 'bg-lavender/10 text-lavender', ring: 'ring-lavender/30' },
}

// ── Code snippets per experience (syntax-highlighted JSX) ──────────────────
const CODE_VISUALS = [
  {
    filename: 'rbac.middleware.js',
    lang: 'JavaScript',
    colorHex: '#0CFCA8',
    lines: [
      { tokens: [{ t: 'const ', c: 'sky' }, { t: 'rbac ', c: 'accent' }, { t: '= ', c: 'text' }, { t: '(roles) ', c: 'lavender' }, { t: '=> ', c: 'sky' }, { t: '(req, res, next) ', c: 'lavender' }, { t: '=> {', c: 'text' }] },
      { tokens: [{ t: '  const ', c: 'sky' }, { t: 'user', c: 'accent' }, { t: ' = ', c: 'text' }, { t: 'req.user', c: 'lavender' }, { t: ';', c: 'text' }] },
      { tokens: [{ t: '  if ', c: 'sky' }, { t: '(!user || !roles.includes(', c: 'text' }, { t: 'user.role', c: 'accent' }, { t: ')) {', c: 'text' }] },
      { tokens: [{ t: '    return ', c: 'sky' }, { t: 'res', c: 'lavender' }, { t: '.status(', c: 'text' }, { t: '403', c: 'amber' }, { t: ').json({', c: 'text' }] },
      { tokens: [{ t: '      message', c: 'accent' }, { t: ': ', c: 'text' }, { t: '"Access denied"', c: 'coral' }] },
      { tokens: [{ t: '    });', c: 'text' }] },
      { tokens: [{ t: '  }', c: 'text' }] },
      { tokens: [{ t: '  next', c: 'lavender' }, { t: '();', c: 'text' }] },
      { tokens: [{ t: '};', c: 'text' }] },
      { tokens: [] },
      { tokens: [{ t: '// ✓ Zero unauthorized-route', c: 'muted' }] },
      { tokens: [{ t: '// ✓ errors in QA', c: 'muted' }] },
    ],
    stats: [
      { label: 'API Endpoints', value: '12+', color: '#0CFCA8' },
      { label: 'Error Reduction', value: '100%', color: '#0CFCA8' },
      { label: 'Response Time ↓', value: '~40%', color: '#0CFCA8' },
    ],
  },
  {
    filename: 'gemini.service.js',
    lang: 'JavaScript',
    colorHex: '#38BDF8',
    lines: [
      { tokens: [{ t: 'import ', c: 'sky' }, { t: '{ GoogleGenerativeAI }', c: 'accent' }, { t: ' from ', c: 'sky' }, { t: '"@google/generative-ai"', c: 'coral' }, { t: ';', c: 'text' }] },
      { tokens: [] },
      { tokens: [{ t: 'const ', c: 'sky' }, { t: 'genAI ', c: 'accent' }, { t: '= new ', c: 'sky' }, { t: 'GoogleGenerativeAI', c: 'lavender' }, { t: '(', c: 'text' }, { t: 'API_KEY', c: 'amber' }, { t: ');', c: 'text' }] },
      { tokens: [] },
      { tokens: [{ t: 'export async function ', c: 'sky' }, { t: 'generateDescription', c: 'accent' }, { t: '(product) {', c: 'text' }] },
      { tokens: [{ t: '  const ', c: 'sky' }, { t: 'model ', c: 'accent' }, { t: '= genAI.getGenerativeModel(', c: 'text' }] },
      { tokens: [{ t: '    { model: ', c: 'text' }, { t: '"gemini-pro"', c: 'coral' }, { t: ' }', c: 'text' }] },
      { tokens: [{ t: '  );', c: 'text' }] },
      { tokens: [{ t: '  const ', c: 'sky' }, { t: 'result ', c: 'accent' }, { t: '= await ', c: 'sky' }, { t: 'model.generateContent(', c: 'lavender' }] },
      { tokens: [{ t: '    `Describe: ${', c: 'coral' }, { t: 'product.name', c: 'accent' }, { t: '}`', c: 'coral' }] },
      { tokens: [{ t: '  );', c: 'text' }] },
      { tokens: [{ t: '  return ', c: 'sky' }, { t: 'result.response.text', c: 'lavender' }, { t: '();', c: 'text' }] },
      { tokens: [{ t: '}  ', c: 'text' }, { t: '// ✓ 60% less manual effort', c: 'muted' }] },
    ],
    stats: [
      { label: 'Content Effort ↓', value: '60%', color: '#38BDF8' },
      { label: 'Bounce Rate ↓', value: '18%', color: '#38BDF8' },
      { label: 'Release Cycle', value: '4 hrs', color: '#38BDF8' },
    ],
  },
  {
    filename: 'Button.component.jsx',
    lang: 'JSX',
    colorHex: '#A788FA',
    lines: [
      { tokens: [{ t: 'import ', c: 'sky' }, { t: 'React ', c: 'accent' }, { t: 'from ', c: 'sky' }, { t: '"react"', c: 'coral' }, { t: ';', c: 'text' }] },
      { tokens: [] },
      { tokens: [{ t: 'const ', c: 'sky' }, { t: 'VARIANTS ', c: 'accent' }, { t: '= {', c: 'text' }] },
      { tokens: [{ t: '  primary: ', c: 'lavender' }, { t: '"bg-accent text-dark"', c: 'coral' }, { t: ',', c: 'text' }] },
      { tokens: [{ t: '  outline: ', c: 'lavender' }, { t: '"border border-accent"', c: 'coral' }, { t: ',', c: 'text' }] },
      { tokens: [{ t: '  ghost:   ', c: 'lavender' }, { t: '"hover:bg-surface"', c: 'coral' }] },
      { tokens: [{ t: '};', c: 'text' }] },
      { tokens: [] },
      { tokens: [{ t: 'export function ', c: 'sky' }, { t: 'Button', c: 'accent' }, { t: '({ variant, children, ...props }) {', c: 'text' }] },
      { tokens: [{ t: '  return (', c: 'text' }] },
      { tokens: [{ t: '    <button ', c: 'sky' }, { t: 'className', c: 'accent' }, { t: '={', c: 'text' }, { t: 'VARIANTS', c: 'lavender' }, { t: '[variant]}', c: 'text' }] },
      { tokens: [{ t: '      {...', c: 'text' }, { t: 'props', c: 'accent' }, { t: '}>', c: 'text' }, { t: '{children}', c: 'lavender' }, { t: '</button>', c: 'sky' }] },
      { tokens: [{ t: '  );', c: 'text' }] },
      { tokens: [{ t: '}', c: 'text' }, { t: '  // ✓ Used in 3 projects', c: 'muted' }] },
    ],
    stats: [
      { label: 'UI Components', value: '20+', color: '#A788FA' },
      { label: 'Load Time ↓', value: '4.2s→2.1s', color: '#A788FA' },
      { label: 'Code Reuse ↑', value: '45%', color: '#A788FA' },
    ],
  },
]

const TOKEN_COLOR = {
  accent:   'text-accent',
  sky:      'text-sky',
  lavender: 'text-lavender',
  amber:    'text-amber',
  coral:    'text-coral',
  muted:    'text-text-muted italic',
  text:     'text-text-body',
}

function CodeWindow({ visual, isLeft }) {
  return (
    <div
      className={`exp-visual w-full max-w-md rounded-2xl border overflow-hidden shadow-2xl`}
      style={{ borderColor: visual.colorHex + '33' }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-card border-b" style={{ borderColor: visual.colorHex + '22' }}>
        <span className="w-3 h-3 rounded-full bg-coral/70" />
        <span className="w-3 h-3 rounded-full bg-amber/70" />
        <span className="w-3 h-3 rounded-full bg-accent/70" />
        <span className="ml-3 flex-1 text-center text-xs font-mono text-text-muted">{visual.filename}</span>
        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: visual.colorHex + '18', color: visual.colorHex }}>{visual.lang}</span>
      </div>

      {/* Code body */}
      <div className="bg-[#0d0d0d] p-4 font-mono text-xs leading-relaxed overflow-x-auto">
        {visual.lines.map((line, li) => (
          <div key={li} className="flex gap-4 min-h-[1.4rem]">
            <span className="text-[#3D3A35] select-none w-4 text-right flex-shrink-0">{li + 1}</span>
            <span>
              {line.tokens.length === 0
                ? <>&nbsp;</>
                : line.tokens.map((tok, ti) => (
                    <span key={ti} className={TOKEN_COLOR[tok.c] ?? 'text-text-body'}>{tok.t}</span>
                  ))
              }
            </span>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 divide-x bg-bg-card" style={{ borderColor: visual.colorHex + '22', divideColor: visual.colorHex + '22' }}>
        {visual.stats.map(({ label, value, color }) => (
          <div key={label} className="px-3 py-3 text-center border-t" style={{ borderColor: visual.colorHex + '22' }}>
            <div className="text-base font-black font-mono" style={{ color }}>{value}</div>
            <div className="text-[10px] text-text-muted mt-0.5 leading-tight">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        '.exp-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
        }
      )

      // Timeline line draw
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.timeline-line', start: 'top 80%', end: 'bottom 20%', scrub: 0.5 },
        }
      )

      // Each card slide in
      gsap.utils.toArray('.exp-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' },
          }
        )
      })

      // Code window visuals slide in from opposite direction
      gsap.utils.toArray('.exp-visual').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? 60 : -60, y: 10 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
          }
        )
      })

      // Dot pulse on enter
      gsap.utils.toArray('.timeline-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)',
            scrollTrigger: { trigger: dot, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="exp-heading text-center mb-16">
          <span className="inline-block font-mono text-accent text-sm tracking-widest uppercase mb-3">
            03 — Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-text-heading">
            Work Timeline
          </h2>
          <p className="text-text-muted mt-3">
            3 companies · 3+ years of building things that work in production
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="timeline-line absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-sky to-lavender hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const colors  = COLOR_MAP[exp.color] ?? COLOR_MAP.accent
              const visual  = CODE_VISUALS[idx]
              const isLeft  = idx % 2 === 0

              return (
                <div key={exp.id} className="relative flex items-center gap-6 md:gap-0">

                  {/* Desktop LEFT column */}
                  <div className={`hidden md:flex md:w-1/2 items-center ${isLeft ? 'pr-10 justify-end' : 'pl-10 justify-start order-last'}`}>
                    {isLeft ? (
                      <div className="exp-card w-full max-w-md">
                        <ExperienceCard exp={exp} colors={colors} />
                      </div>
                    ) : (
                      <CodeWindow visual={visual} isLeft={false} />
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                    <div className={`timeline-dot w-4 h-4 rounded-full ${colors.dot} ring-4 ${colors.ring} ring-offset-2 ring-offset-bg-primary`} />
                  </div>

                  {/* Desktop RIGHT column */}
                  <div className={`hidden md:flex md:w-1/2 items-center ${isLeft ? 'pl-10 justify-start order-last' : 'pr-10 justify-end'}`}>
                    {isLeft ? (
                      <CodeWindow visual={visual} isLeft={true} />
                    ) : (
                      <div className="exp-card w-full max-w-md">
                        <ExperienceCard exp={exp} colors={colors} />
                      </div>
                    )}
                  </div>

                  {/* Mobile: stack card then code window */}
                  <div className="md:hidden w-full space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${colors.dot} flex-shrink-0`} />
                      <div className="h-px flex-1 bg-border-subtle" />
                    </div>
                    <div className="exp-card">
                      <ExperienceCard exp={exp} colors={colors} />
                    </div>
                    <CodeWindow visual={visual} isLeft={true} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Education footer */}
        <div className="mt-20 rounded-2xl border border-border-subtle bg-bg-card p-8">
          <h3 className="text-text-muted text-xs font-mono tracking-widest uppercase mb-6">Education & Certifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-text-heading font-semibold">MCA, Computer Science</div>
              <div className="text-accent text-sm mt-1">Vellore Institute of Technology</div>
              <div className="text-text-muted text-xs mt-1 font-mono">Oct 2025 – Oct 2027</div>
            </div>
            <div>
              <div className="text-text-heading font-semibold">BCA, Computer Science</div>
              <div className="text-sky text-sm mt-1">IPEM College of Engineering, Ghaziabad</div>
              <div className="text-text-muted text-xs mt-1 font-mono">Dec 2022 – May 2025 · CGPA 7.56 / 10</div>
            </div>
            <div>
              <div className="text-text-heading font-semibold">Certified React Developer</div>
              <div className="text-lavender text-sm mt-1">AAM Infotech Pvt. Ltd.</div>
            </div>
            <div>
              <div className="text-text-heading font-semibold">UI/UX Designer Certification</div>
              <div className="text-amber text-sm mt-1">NIPS WEBTECH</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function ExperienceCard({ exp, colors }) {
  return (
    <div className={`rounded-2xl border ${colors.border} bg-bg-card p-6 hover:bg-bg-hover transition-colors duration-300`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h3 className={`text-lg font-bold ${colors.text}`}>{exp.role}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Briefcase size={13} className="text-text-muted" />
            <span className="text-text-heading font-medium text-sm">{exp.company}</span>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge} flex-shrink-0`}>
          {exp.type}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-text-muted text-xs font-mono mb-5 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} /> {exp.period}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={12} /> {exp.location}
        </span>
      </div>

      {/* Summary */}
      <p className="text-text-body text-sm leading-relaxed mb-4">{exp.summary}</p>

      {/* Achievements */}
      <ul className="space-y-2">
        {exp.achievements.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-body">
            <span className={`${colors.text} mt-0.5 flex-shrink-0 font-bold`}>▸</span>
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-5">
        {exp.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 text-xs rounded-lg bg-bg-surface border border-border-subtle text-text-muted font-medium">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
