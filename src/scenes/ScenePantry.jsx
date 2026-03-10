import { useRef, useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SKILLS } from '../data/index'
import ScrollHint from '../components/ScrollHint'

function Jar({ name, pct, color, index }) {
  const [filled, setFilled] = useState(false)
  const [displayPct, setDisplayPct] = useState(0)
  const timerRef = useRef()

  useEffect(() => {
    if (filled) {
      // Animate up
      let start = 0
      const duration = 1000 // matching liquid transition roughly
      const startTime = performance.now()
      
      const update = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        const current = Math.floor(ease * pct)
        setDisplayPct(current)
        if (progress < 1) timerRef.current = requestAnimationFrame(update)
      }
      timerRef.current = requestAnimationFrame(update)
    } else {
      // reset to 0
      cancelAnimationFrame(timerRef.current)
      setDisplayPct(0)
    }
    return () => cancelAnimationFrame(timerRef.current)
  }, [filled, pct])

  return (
    <div
      title={`${name}: ${pct}%`}
      onMouseEnter={() => setFilled(true)}
      onMouseLeave={() => setFilled(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'none' }}
    >
      {/* jar body */}
      <div style={{
        width: 64, height: 80,
        background: 'rgba(255,255,255,.9)',
        border: '3px solid var(--dark)',
        borderRadius: '7px 7px 12px 12px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* lid */}
        <div style={{
          position: 'absolute', top: -6, left: -4, right: -4, height: 14,
          background: color, border: '3px solid var(--dark)', borderRadius: 5, zIndex: 2,
          filter: filled ? `drop-shadow(0 0 4px ${color})` : 'none',
          transition: 'filter .4s',
        }} />
        {/* liquid fill */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: color, opacity: .45,
          height: filled ? `${pct}%` : '0%',
          transition: `height 1s cubic-bezier(.34, 1, .64, 1)`,
          zIndex: 1,
        }} />
      </div>
      <span style={{ fontSize: '.72rem', fontWeight: 900, color: 'white', textAlign: 'center', lineHeight: 1.2 }}>{name}</span>
      <span style={{ fontFamily: 'var(--font-d)', fontSize: '.85rem', color: 'var(--yellow)', minWidth: '40px', textAlign: 'center' }}>{displayPct}%</span>
    </div>
  )
}

export default function ScenePantry() {
  const wrapRef = useRef()
  useReveal(wrapRef)

  return (
    <div ref={wrapRef} style={{ background: '#2a1a08', position: 'relative' }}>
      <div style={{ height: 60, background: 'linear-gradient(180deg,var(--tile-a),#2a1a08)' }} />

      <div style={{ padding: '60px clamp(16px,5vw,60px) 80px' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--yellow)', textShadow: '3px 3px 0 rgba(0,0,0,.5)' }}>
            🫙 The Pantry
          </div>
          <p style={{ color: 'rgba(255,255,255,.5)', fontWeight: 700, marginTop: 8, fontSize: '.9rem' }}>
            Hover jars to drain & refill — these are my ingredients
          </p>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 36 }}>
          {SKILLS.map((shelf, si) => {
            const isAIShelf = si === 0;
            return (
              <div key={shelf.shelf} className={`reveal delay-${si + 1}`}>
                <div style={{
                  backgroundColor: isAIShelf ? '#1e1b4b' : 'var(--wood)',
                  backgroundImage: isAIShelf 
                    ? 'radial-gradient(rgba(167,139,250,0.15) 1px, transparent 1px)' 
                    : 'none',
                  backgroundSize: isAIShelf ? '18px 18px' : 'auto',
                  border: isAIShelf ? '4px solid #6d28d9' : '4px solid var(--dark)',
                  borderRadius: 10,
                  padding: '16px 24px 28px',
                  boxShadow: isAIShelf 
                    ? '0 8px 0 #3b0764, 0 9px 0 #1a1a1a' 
                    : '0 8px 0 #5c3317, 0 9px 0 var(--dark)',
                }}>
                  <div style={{ 
                    fontFamily: 'var(--font-d)', 
                    color: isAIShelf ? 'transparent' : 'var(--yellow)', 
                    fontSize: '1rem', 
                    marginBottom: 20, 
                    textShadow: isAIShelf ? 'none' : '1px 1px 0 rgba(0,0,0,.4)',
                    background: isAIShelf ? 'linear-gradient(90deg, #9b4dff, #00d2ff)' : 'none',
                    WebkitBackgroundClip: isAIShelf ? 'text' : 'unset',
                    backgroundClip: isAIShelf ? 'text' : 'unset'
                  }}>
                    {shelf.shelf}
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, minmax(90px, 1fr))`,
                    gap: 16,
                    justifyItems: 'center',
                  }}>
                    {shelf.items.map((item, ii) => (
                      <Jar key={item.name} {...item} index={si * 5 + ii} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ScrollHint visible label="See my journey" />
    </div>
  )
}
