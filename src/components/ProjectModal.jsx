import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ExternalLink, Shield, ShieldCheck, ShieldAlert,
  Layers, Code2, BarChart3, BookOpen, Cpu, CheckCircle2,
  Clock, Activity, Lock,
} from 'lucide-react'

// ── Tab config ──────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',      label: 'Overview',      icon: BookOpen    },
  { id: 'architecture',  label: 'Architecture',  icon: Layers      },
  { id: 'metrics',       label: 'Metrics',       icon: BarChart3   },
  { id: 'security',      label: 'Security',      icon: Shield      },
  { id: 'tech',          label: 'Tech Deep-Dive', icon: Cpu        },
  { id: 'code',          label: 'Code',           icon: Code2      },
]

const SECURITY_ICON = {
  High:   { icon: ShieldCheck, cls: 'text-accent bg-accent/10 border-accent/25'   },
  Medium: { icon: ShieldAlert, cls: 'text-amber  bg-amber/10  border-amber/25'    },
  Low:    { icon: Shield,      cls: 'text-coral  bg-coral/10  border-coral/25'    },
}

// ── Mini bar chart ──────────────────────────────────────────────────────────
function MetricBar({ value, color }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    el.style.width = '0%'
    const t = setTimeout(() => { el.style.width = `${value}%` }, 120)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div className="h-1.5 w-full rounded-full bg-bg-hover overflow-hidden">
      <div
        ref={ref}
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

// ── Architecture flow diagram ───────────────────────────────────────────────
function ArchDiagram({ diagram }) {
  return (
    <div className="flex items-center gap-1 flex-wrap mb-6">
      {diagram.map((node, i) => (
        <div key={node.label} className="flex items-center gap-1">
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-bg-primary whitespace-nowrap"
            style={{ backgroundColor: node.color }}
          >
            {node.label}
          </div>
          {i < diagram.length - 1 && (
            <span className="text-text-muted font-mono text-xs">→</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Syntax colored code block ───────────────────────────────────────────────
function CodeBlock({ code, title }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="rounded-xl overflow-hidden border border-border-subtle">
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d0d] border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-coral/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
          <span className="ml-3 font-mono text-xs text-text-muted">{title}</span>
        </div>
        <button
          onClick={copy}
          className="font-mono text-[10px] px-2.5 py-1 rounded border border-border-subtle text-text-muted hover:text-text-heading transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      {/* code */}
      <pre
        className="p-5 text-[11.5px] font-mono leading-relaxed overflow-x-auto bg-[#0d0d0d] text-text-body"
        style={{ tabSize: 2 }}
      >
        {code}
      </pre>
    </div>
  )
}

// ── Main Modal ──────────────────────────────────────────────────────────────
export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const { modal, colorHex, live, title, subtitle, tech } = project
  const m = modal

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll + pause Lenis so wheel/touch events reach the modal scroller
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    if (window.__lenis) window.__lenis.stop()
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      if (window.__lenis) window.__lenis.start()
    }
  }, [])

  // Reset tab on project change
  useEffect(() => { setActiveTab('overview') }, [project.id])

  const statusColor = m.status.includes('Live') ? '#0CFCA8' : '#38BDF8'

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        exit={{   opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="fixed inset-0 md:inset-x-[8%] md:top-[4vh] md:bottom-[4vh] lg:inset-x-[12%] z-[101] flex flex-col md:rounded-2xl border-0 md:border border-border-subtle bg-bg-card shadow-2xl"
        style={{ isolation: 'isolate' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ────────────────────────────────────────────────── */}
        <div
          className="flex-shrink-0 px-4 md:px-6 py-4 md:py-5 border-b border-border-subtle flex items-start justify-between gap-3"
          style={{ borderTop: `2px solid ${colorHex}` }}
        >
          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
                style={{ background: colorHex + '18', color: colorHex }}
              >
                {m.version}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusColor }} />
                <span style={{ color: statusColor }}>{m.status}</span>
              </span>
            </div>
            <h2 className="text-lg md:text-2xl font-black text-text-heading leading-tight">{title}</h2>
            <p className="text-text-muted text-xs md:text-sm mt-0.5 truncate">{subtitle}</p>
          </div>

          {/* Links + close */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2 md:px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                style={{ background: colorHex, color: '#0A0A0A' }}
                aria-label="Live Demo"
              >
                <ExternalLink size={13} />
                <span className="hidden md:inline">Live Demo</span>
              </a>
            ) : (
              <span className="flex items-center gap-1.5 px-2 md:px-3 py-2 rounded-lg border border-border-default text-text-muted text-xs font-medium">
                <Lock size={13} />
                <span className="hidden md:inline">Proprietary</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-border-subtle text-text-muted hover:text-text-heading hover:border-border-default transition-all"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Tab bar ───────────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-1 px-3 md:px-4 py-2 border-b border-border-subtle bg-bg-surface/40"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3 md:px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                activeTab === id
                  ? 'text-bg-primary'
                  : 'text-text-muted hover:text-text-heading hover:bg-bg-hover'
              }`}
              style={activeTab === id ? { background: colorHex } : {}}
            >
              <Icon size={12} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}

          {/* Tech chips — hidden on mobile to save space */}
          <div className="ml-auto hidden md:flex items-center gap-1.5 pl-4 flex-shrink-0">
            {tech.map((t) => (
              <span key={t} className="px-2 py-0.5 text-[10px] font-mono rounded bg-bg-surface border border-border-subtle text-text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Tab content ───────────────────────────────────────────── */}
        <div
          className="flex-1 p-4 md:p-6"
          style={{
            overflowY: 'scroll',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{   opacity: 0, y: -8  }}
              transition={{ duration: 0.18 }}
            >

              {/* ── OVERVIEW ──────────────────────────────────────── */}
              {activeTab === 'overview' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <SectionLabel color={colorHex}>Project Synopsis</SectionLabel>
                    <p className="text-text-body leading-relaxed">{m.overview}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border-subtle bg-bg-surface p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: colorHex + '18' }}>
                          <Activity size={14} style={{ color: colorHex }} />
                        </div>
                        <span className="text-text-heading text-sm font-bold">The Problem</span>
                      </div>
                      <p className="text-text-body text-sm leading-relaxed">{m.problem}</p>
                    </div>
                    <div className="rounded-xl border border-border-subtle bg-bg-surface p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: colorHex + '18' }}>
                          <CheckCircle2 size={14} style={{ color: colorHex }} />
                        </div>
                        <span className="text-text-heading text-sm font-bold">The Solution</span>
                      </div>
                      <p className="text-text-body text-sm leading-relaxed">{m.solution}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="rounded-xl border bg-bg-surface p-5" style={{ borderColor: colorHex + '30' }}>
                    <SectionLabel color={colorHex}>Key Outcomes</SectionLabel>
                    <ul className="space-y-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-text-body">
                          <CheckCircle2 size={15} style={{ color: colorHex, flexShrink: 0 }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ── ARCHITECTURE ─────────────────────────────────── */}
              {activeTab === 'architecture' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <SectionLabel color={colorHex}>Data Flow</SectionLabel>
                    <ArchDiagram diagram={m.architecture.diagram} />
                  </div>

                  <div>
                    <SectionLabel color={colorHex}>Layer Breakdown</SectionLabel>
                    <div className="space-y-3">
                      {m.architecture.layers.map((layer, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-xl border border-border-subtle bg-bg-surface hover:border-opacity-60 transition-all"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-xs font-black text-bg-primary"
                            style={{ background: colorHex }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-text-heading text-sm font-bold mb-1">{layer.name}</div>
                            <div className="text-text-muted text-sm leading-relaxed">{layer.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border-subtle bg-bg-surface p-5">
                    <SectionLabel color={colorHex}>Tech Stack Used</SectionLabel>
                    <div className="flex flex-wrap gap-2">
                      {tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border"
                          style={{ color: colorHex, borderColor: colorHex + '30', background: colorHex + '0F' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── METRICS ──────────────────────────────────────── */}
              {activeTab === 'metrics' && (
                <div className="space-y-4 max-w-3xl">
                  <SectionLabel color={colorHex}>Performance & Impact Metrics</SectionLabel>
                  <div className="grid md:grid-cols-2 gap-4">
                    {m.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-border-subtle bg-bg-surface p-5"
                      >
                        <div className="flex items-end justify-between mb-3">
                          <div>
                            <div className="text-text-muted text-xs font-mono uppercase tracking-widest mb-1">{metric.label}</div>
                            <div className="text-2xl font-black font-mono" style={{ color: metric.color }}>{metric.value}</div>
                            <div className="text-text-muted text-xs mt-0.5">{metric.sub}</div>
                          </div>
                          <div
                            className="text-xs font-mono font-bold px-2 py-1 rounded-lg"
                            style={{ background: metric.color + '18', color: metric.color }}
                          >
                            {metric.bar}%
                          </div>
                        </div>
                        <MetricBar value={metric.bar} color={metric.color} />
                      </div>
                    ))}
                  </div>

                  {/* Production readiness checklist */}
                  <div className="rounded-xl border bg-bg-surface p-5" style={{ borderColor: colorHex + '30' }}>
                    <SectionLabel color={colorHex}>Production Readiness Checklist</SectionLabel>
                    <div className="grid md:grid-cols-2 gap-2">
                      {[
                        'Environment variables separated',
                        'Error boundaries in place',
                        'Loading & empty states handled',
                        'API error responses standardized',
                        'Authentication on all private routes',
                        'No sensitive data in client bundle',
                        'Deployment pipeline configured',
                        'CORS policy set correctly',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-text-body">
                          <CheckCircle2 size={14} style={{ color: colorHex, flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECURITY ─────────────────────────────────────── */}
              {activeTab === 'security' && (
                <div className="space-y-4 max-w-3xl">
                  <SectionLabel color={colorHex}>Security Implementation</SectionLabel>

                  {/* Level legend */}
                  <div className="flex items-center gap-4 text-xs text-text-muted font-mono mb-2">
                    <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-accent" /> High — critical security control</span>
                    <span className="flex items-center gap-1.5"><ShieldAlert size={12} className="text-amber" /> Medium — important hardening</span>
                  </div>

                  <div className="space-y-3">
                    {m.security.map((item) => {
                      const { icon: SIcon, cls } = SECURITY_ICON[item.level] ?? SECURITY_ICON.Medium
                      return (
                        <div
                          key={item.badge}
                          className="flex items-start gap-4 p-4 rounded-xl border border-border-subtle bg-bg-surface"
                        >
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold flex-shrink-0 ${cls}`}>
                            <SIcon size={11} />
                            {item.badge}
                          </div>
                          <p className="text-text-body text-sm leading-relaxed">{item.detail}</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* OWASP note */}
                  <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 flex items-start gap-3">
                    <Lock size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-accent text-sm font-bold mb-1">OWASP Top 10 Considered</div>
                      <p className="text-text-body text-sm leading-relaxed">
                        This project was built with awareness of OWASP Top 10 risks — including injection (Mongoose parameterized queries), broken auth (JWT + refresh rotation), sensitive data exposure (env vars, httpOnly cookies), and security misconfiguration (strict CORS, rate limiting).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TECH DEEP-DIVE ────────────────────────────────── */}
              {activeTab === 'tech' && (
                <div className="space-y-4 max-w-3xl">
                  <SectionLabel color={colorHex}>Technical Decisions & Implementation Details</SectionLabel>
                  <div className="space-y-4">
                    {m.techDeep.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border-subtle bg-bg-surface p-5"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: colorHex + '18' }}
                          >
                            <Cpu size={12} style={{ color: colorHex }} />
                          </div>
                          <span className="text-text-heading text-sm font-bold">{item.name}</span>
                        </div>
                        <p className="text-text-body text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Interview card */}
                  <div className="rounded-xl border border-sky/20 bg-sky/5 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} className="text-sky" />
                      <span className="text-sky text-sm font-bold">Interview Talking Points</span>
                    </div>
                    <ul className="space-y-2">
                      {m.techDeep.map((item, i) => (
                        <li key={i} className="text-text-body text-sm flex items-start gap-2">
                          <span className="text-sky font-bold flex-shrink-0">→</span>
                          <span><strong className="text-text-heading">{item.name}:</strong> {item.detail.split('.')[0]}.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ── CODE ─────────────────────────────────────────── */}
              {activeTab === 'code' && (
                <div className="space-y-6 max-w-3xl">
                  <SectionLabel color={colorHex}>Core Implementation — {m.codeSnippet.title}</SectionLabel>
                  <CodeBlock
                    code={m.codeSnippet.code}
                    title={m.codeSnippet.title}
                  />

                  {/* What to explain */}
                  <div className="rounded-xl border border-border-subtle bg-bg-surface p-5">
                    <SectionLabel color={colorHex}>How to Explain This Code</SectionLabel>
                    <div className="space-y-2 text-sm text-text-body">
                      <p><strong className="text-text-heading">What it does:</strong> {m.overview.split('.')[0]}.</p>
                      <p><strong className="text-text-heading">Why it's structured this way:</strong> {m.solution.split('.')[0]}.</p>
                      <p><strong className="text-text-heading">The key decision:</strong> {m.techDeep[0]?.detail.split('.')[0]}.</p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 px-4 md:px-6 py-3 border-t border-border-subtle bg-bg-surface/40 flex items-center justify-between text-xs text-text-muted font-mono">
          <span className="truncate mr-4">{title} · {m.version}</span>
          <span className="hidden md:inline flex-shrink-0">Press <kbd className="px-1.5 py-0.5 rounded border border-border-default text-text-muted bg-bg-card">Esc</kbd> to close</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Helper ──────────────────────────────────────────────────────────────────
function SectionLabel({ children, color }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="h-px flex-1 max-w-[24px] rounded" style={{ background: color }} />
      <span className="text-xs font-mono font-bold tracking-widest uppercase" style={{ color }}>
        {children}
      </span>
      <div className="h-px flex-1 bg-border-subtle rounded" />
    </div>
  )
}
