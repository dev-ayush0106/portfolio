import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fade up reveal — attach to any element on scroll
export function fadeUpOnScroll(el, options = {}) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.8,
      ease: options.ease ?? 'power3.out',
      delay: options.delay ?? 0,
      scrollTrigger: {
        trigger: el,
        start: options.start ?? 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  )
}

// Stagger children on scroll
export function staggerOnScroll(parent, childSelector, options = {}) {
  return gsap.fromTo(
    parent.querySelectorAll(childSelector),
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.6,
      ease: options.ease ?? 'power3.out',
      stagger: options.stagger ?? 0.1,
      scrollTrigger: {
        trigger: parent,
        start: options.start ?? 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  )
}

// Slide in from left or right
export function slideInOnScroll(el, direction = 'left', options = {}) {
  const x = direction === 'left' ? -60 : 60
  return gsap.fromTo(
    el,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration: options.duration ?? 0.8,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: options.start ?? 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  )
}

// Counter animation
export function animateCounter(el, target, options = {}) {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: target,
    duration: options.duration ?? 2,
    ease: options.ease ?? 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(obj.value) + (options.suffix ?? '')
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
      ...options.scrollTrigger,
    },
  })
}

// Section title reveal (chars)
export function revealTitle(chars, options = {}) {
  return gsap.fromTo(
    chars,
    { opacity: 0, y: 40, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: options.duration ?? 0.7,
      ease: options.ease ?? 'power4.out',
      stagger: options.stagger ?? 0.04,
      scrollTrigger: {
        trigger: chars[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  )
}
