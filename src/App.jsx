import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar             from './components/Navbar'
import Hero               from './components/Hero'
import About              from './components/About'
import Skills             from './components/Skills'
import Experience         from './components/Experience'
import Projects           from './components/Projects'
import Testimonials       from './components/Testimonials'
import Contact            from './components/Contact'
import Footer             from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor       from './components/CustomCursor'
import Preloader          from './components/Preloader'
import OpenToWork         from './components/OpenToWork'
import ScrollProgress     from './components/ScrollProgress'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // hide default cursor globally — CustomCursor replaces it
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = '' }
  }, [])

  useEffect(() => {
    if (!loaded) return

    // Init Lenis smooth scroll after preloader exits
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
      delete window.__lenis
    }
  }, [loaded])

  return (
    <>
      {/* Global overlays — always rendered */}
      <CustomCursor />
      <ScrollProgress />
      <OpenToWork />

      {/* Preloader — unmounts itself via onDone */}
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      {/* Main page — visible after preloader */}
      <div className="bg-bg-primary text-text-heading overflow-x-hidden">
        <ParticleBackground />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
