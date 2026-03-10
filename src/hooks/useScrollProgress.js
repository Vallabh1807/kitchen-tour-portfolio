import { useState, useEffect } from 'react'

/**
 * Returns scroll progress 0–1 for the entire page,
 * plus a helper to get progress within a specific element.
 */
export function useScrollProgress() {
  const [scrollY, setScrollY]       = useState(0)
  const [progress, setProgress]     = useState(0)
  const [winHeight, setWinHeight]   = useState(0)
  const [docHeight, setDocHeight]   = useState(0)

  useEffect(() => {
    const update = () => {
      const sy  = window.scrollY
      const wh  = window.innerHeight
      const dh  = document.documentElement.scrollHeight
      const max = dh - wh
      setScrollY(sy)
      setWinHeight(wh)
      setDocHeight(dh)
      setProgress(max > 0 ? sy / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  /**
   * Returns 0–1 progress for a specific sticky section.
   * @param {React.RefObject} ref   – ref on the outer tall wrapper div
   */
  const sectionProgress = (ref) => {
    if (!ref?.current) return 0
    const rect   = ref.current.getBoundingClientRect()
    const total  = ref.current.offsetHeight - winHeight
    const passed = -rect.top
    if (passed <= 0)     return 0
    if (passed >= total) return 1
    return passed / total
  }

  return { scrollY, progress, winHeight, docHeight, sectionProgress }
}
