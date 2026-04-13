import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import useSmoothScroll from '../hooks/useSmoothScroll'

const LINKS = [
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Contact',    id: 'contact'    },
]

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/dev-ayush0106',                 label: 'GitHub'   },
  { icon: Linkedin, href: 'https://linkedin.com/in/ayush-kumar-071332312',     label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:ayushshivoy06@gmail.com',                    label: 'Email'    },
]

export default function Footer() {
  const scrollTo = useSmoothScroll()

  return (
    <footer className="relative border-t border-border-subtle bg-bg-card py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="font-mono font-bold text-2xl text-accent">
              AK<span className="text-text-muted">.</span>
            </div>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              Full Stack AI Engineer — building production-grade web apps with React,
              Node.js, and AI integrations.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border-subtle text-text-muted hover:text-accent hover:border-accent/40 flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-text-muted text-xs font-mono uppercase tracking-widest mb-4">Navigate</h4>
            <ul className="space-y-2">
              {LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(`#${id}`)}
                    className="text-text-body text-sm hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-text-muted text-xs font-mono uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-text-body">
              <li>
                <a href="mailto:ayushshivoy06@gmail.com" className="hover:text-accent transition-colors">
                  ayushshivoy06@gmail.com
                </a>
              </li>
              <li>+91 9990204862</li>
              <li className="text-text-muted">Noida, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs font-mono">
            © {new Date().getFullYear()} Ayush Kumar. Built with React + Vite + GSAP + Framer Motion.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => scrollTo('top')}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-text-muted text-xs font-mono hover:text-accent transition-colors duration-200 group"
          >
            Back to top
            <span className="w-7 h-7 rounded-lg border border-border-subtle flex items-center justify-center group-hover:border-accent/40 group-hover:text-accent transition-all">
              <ArrowUp size={13} />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
