import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone, Copy, Check } from 'lucide-react'
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'ayushshivoy06@gmail.com'

// ─── EmailJS credentials ──────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_x6easvm"
const EMAILJS_TEMPLATE_ID = "template_qea4t45"
const EMAILJS_PUBLIC_KEY  = "fozI0Erox48yUpEMX"
// ─────────────────────────────────────────────────────────────────────────────

const SOCIALS = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/dev-ayush0106',               color: 'hover:text-accent   hover:border-accent/40'   },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ayush-kumar-071332312',   color: 'hover:text-sky      hover:border-sky/40'       },
  { icon: Mail,     label: 'Email',    href: `mailto:${EMAIL}`,                                  color: 'hover:text-lavender hover:border-lavender/40'  },
  { icon: Twitter,  label: 'Twitter',  href: 'https://twitter.com/',                             color: 'hover:text-amber    hover:border-amber/40'     },
]

const INFO = [
  { icon: MapPin, label: 'Location', value: 'Noida, India'   },
  { icon: Phone,  label: 'Phone',    value: '+91 9990204862'  },
  { icon: Mail,   label: 'Email',    value: EMAIL, copyable: true },
]

const INPUT_CLS = 'w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle text-text-heading placeholder-text-muted text-sm focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all duration-200'

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef    = useRef(null)

  const [form,    setForm]   = useState({ name: '', email: '', message: '' })
  const [status,  setStatus] = useState('idle')   // idle | sending | success | error
  const [copied,  setCopied] = useState(false)

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.contact-left, .contact-right',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="contact-heading text-center mb-16">
          <span className="inline-block font-mono text-accent text-sm tracking-widest uppercase mb-3">
            06 — Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-text-heading">
            Let's Work Together
          </h2>
          <p className="text-text-muted mt-3 max-w-md mx-auto">
            Open to full-time roles, freelance projects, and ambitious collaborations.
          </p>
        </div>

        <div className="contact-grid grid md:grid-cols-2 gap-10 items-start">

          {/* Left — info */}
          <div className="contact-left space-y-8">
            {/* Info items */}
            <div className="space-y-4">
              {INFO.map(({ icon: Icon, label, value, copyable }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-text-muted text-xs font-mono uppercase tracking-widest">{label}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-text-heading text-sm font-medium truncate">{value}</span>
                      {copyable && (
                        <motion.button
                          onClick={copyEmail}
                          whileTap={{ scale: 0.9 }}
                          title="Copy email"
                          className={`flex-shrink-0 p-1 rounded-md transition-colors duration-200 ${
                            copied
                              ? 'text-accent bg-accent/10'
                              : 'text-text-muted hover:text-accent hover:bg-accent/10'
                          }`}
                        >
                          {copied ? <Check size={13} /> : <Copy size={13} />}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-11 h-11 rounded-xl border border-border-default text-text-muted flex items-center justify-center transition-all duration-200 ${color}`}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-sm font-semibold">Available for Work</span>
              </div>
              <p className="text-text-body text-sm leading-relaxed">
                I'm currently open to full-time opportunities and select freelance projects.
                Response time is usually within 24 hours.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-right rounded-2xl border border-border-subtle bg-bg-card p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-text-muted text-xs font-mono uppercase tracking-widest mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className={INPUT_CLS}
                />
              </div>

              <div>
                <label className="block text-text-muted text-xs font-mono uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@company.com"
                  className={INPUT_CLS}
                />
              </div>

              <div>
                <label className="block text-text-muted text-xs font-mono uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${INPUT_CLS} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  status === 'sending'
                    ? 'bg-accent/50 text-bg-primary cursor-not-allowed'
                    : 'bg-accent text-bg-primary hover:bg-accent-hover shadow-lg shadow-accent/20'
                }`}
              >
                <Send size={16} />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </motion.button>

              {/* Status feedback */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent text-sm text-center font-medium"
                >
                  ✓ Message sent! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-coral text-sm text-center font-medium"
                >
                  Something went wrong. Please email me directly at ayushshivoy06@gmail.com
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
