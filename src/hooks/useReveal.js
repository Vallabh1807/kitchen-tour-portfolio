import { useEffect } from 'react'

/**
 * Attaches IntersectionObserver to every .reveal, .reveal-left, .reveal-right
 * element inside `containerRef`. Adds class `visible` when they enter viewport.
 */
export function useReveal(containerRef) {
  useEffect(() => {
    const root = containerRef?.current ?? document

    const els = root.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}
