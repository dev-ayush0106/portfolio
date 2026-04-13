import { useEffect, useState } from 'react'

/**
 * Cycles through `words`, typing and deleting each one.
 * Returns { text, isDeleting }
 */
export function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 45, pauseMs = 1600 } = {}) {
  const [index,      setIndex]      = useState(0)
  const [text,       setText]       = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [pausing,    setPausing]    = useState(false)

  useEffect(() => {
    if (pausing) return

    const word    = words[index % words.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) {
          // Full word typed — pause before deleting
          setPausing(true)
          setTimeout(() => {
            setPausing(false)
            setIsDeleting(true)
          }, pauseMs)
        }
      } else {
        // Deleting
        setText(word.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setIsDeleting(false)
          setIndex((i) => (i + 1) % words.length)
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, pausing, index, words, typeSpeed, deleteSpeed, pauseMs])

  return { text, isDeleting }
}

export default useTypewriter
