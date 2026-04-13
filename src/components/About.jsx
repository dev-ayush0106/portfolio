import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Cpu, Rocket, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { icon: Rocket, value: '3+',  suffix: '',  label: 'Years Experience', color: 'accent'   },
  { icon: Code2,  value: '15+', suffix: '',  label: 'Projects Shipped', color: 'sky'      },
  { icon: Users,  value: '500', suffix: '+', label: 'Users Served',     color: 'lavender' },
  { icon: Cpu,    value: '3',   suffix: '',  label: 'Companies',        color: 'amber'    },
]

const COLOR_MAP = {
  accent:   { text: 'text-accent',   border: 'border-accent/20',   bg: 'bg-accent/5'   },
  sky:      { text: 'text-sky',      border: 'border-sky/20',      bg: 'bg-sky/5'      },
  lavender: { text: 'text-lavender', border: 'border-lavender/20', bg: 'bg-lavender/5' },
  amber:    { text: 'text-amber',    border: 'border-amber/20',    bg: 'bg-amber/5'    },
}

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label + heading
      gsap.fromTo(
        '.about-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
        }
      )

      // Stats cards stagger
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
        }
      )

      // Counter animation
      document.querySelectorAll('.stat-counter').forEach((el) => {
        const target = parseInt(el.dataset.target, 10)
        const suffix = el.dataset.suffix ?? ''
        const obj    = { val: 0 }
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })

      // Text block
      gsap.fromTo(
        '.about-text',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
        }
      )

      // Skills chips
      gsap.fromTo(
        '.skill-chip',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.4, ease: 'back.out(1.4)', stagger: 0.06,
          scrollTrigger: { trigger: '.chips-container', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const highlights = [
    'React.js', 'Node.js', 'MongoDB', 'Express.js',
    'GSAP', 'Framer Motion', 'AWS', 'Gemini API',
    'Docker', 'JWT / OAuth', 'Redux Toolkit', 'CI/CD',
  ]

  return (
    <section ref={sectionRef} id="about" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="about-heading text-center mb-16">
          <span className="inline-block font-mono text-accent text-sm tracking-widest uppercase mb-3">
            01 — About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-text-heading">
            The Story So Far
          </h2>
        </div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map(({ icon: Icon, value, suffix, label, color }) => {
            const { text, border, bg } = COLOR_MAP[color]
            return (
              <div
                key={label}
                className={`stat-card rounded-2xl p-6 border ${border} ${bg} text-center transition-transform duration-300 hover:-translate-y-1`}
              >
                <Icon className={`${text} mx-auto mb-3`} size={24} />
                <div className={`text-3xl md:text-4xl font-black font-mono ${text}`}>
                  <span
                    className="stat-counter"
                    data-target={value.replace('+', '')}
                    data-suffix={suffix || (value.includes('+') ? '+' : '')}
                  >
                    {value}{suffix}
                  </span>
                </div>
                <div className="text-text-muted text-xs font-medium tracking-wider uppercase mt-1">
                  {label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Two-column content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Text */}
          <div className="about-text space-y-6">
            <p className="text-text-body text-lg leading-relaxed">
              I'm a <span className="text-text-heading font-semibold">Full Stack AI Engineer</span> based
              in Noida, India with 3+ years of hands-on experience shipping production-grade web applications.
              My journey started in 2023 as a frontend developer at Mega Career — building React component
              libraries and learning what it means to write code that actually scales.
            </p>
            <p className="text-text-body text-lg leading-relaxed">
              From there I moved into full-stack territory at AAM Infotech, where I integrated
              <span className="text-accent font-medium"> Gemini AI</span>, automated CI/CD pipelines,
              and owned entire auth systems serving 500+ users. Today at Codesquadz, I architect
              APIs, mentor teammates, and obsess over performance — cutting response times by 40%
              and delivering features 25% faster than before.
            </p>
            <p className="text-text-body text-lg leading-relaxed">
              I'm currently pursuing my <span className="text-text-heading font-semibold">MCA at VIT</span> while
              working full-time — because learning and building aren't things you do one at a time.
              I'm open to ambitious full-time roles and interesting freelance projects.
            </p>

            <div className="pt-2 flex gap-4 flex-wrap">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg-primary text-sm font-bold rounded-lg hover:bg-accent-hover transition-colors"
              >
                Download Resume
              </a>
              <a
                href="mailto:ayushshivoy06@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-default text-text-body text-sm font-medium rounded-lg hover:border-accent/40 hover:text-accent transition-colors"
              >
                ayushshivoy06@gmail.com
              </a>
            </div>
          </div>

          {/* Skills cloud + info card */}
          <div className="space-y-6">
            {/* Skills chips */}
            <div className="rounded-2xl border border-border-subtle bg-bg-card p-6">
              <h3 className="text-text-muted text-xs font-mono tracking-widest uppercase mb-4">
                Core Technologies
              </h3>
              <div className="chips-container flex flex-wrap gap-2">
                {highlights.map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip px-3 py-1.5 rounded-lg bg-bg-surface border border-border-subtle text-text-body text-sm font-medium hover:border-accent/40 hover:text-accent transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently card */}
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-mono tracking-widest uppercase">Currently</span>
              </div>
              <ul className="space-y-2 text-text-body text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>Working full-time as MERN Stack Developer at <strong className="text-text-heading">Codesquadz</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>Pursuing <strong className="text-text-heading">MCA at VIT</strong> (2025–2027)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>Exploring <strong className="text-text-heading">AI/LLM integrations</strong> in production apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>Open to <strong className="text-text-heading">exciting opportunities</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
