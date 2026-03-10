import { useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import ScrollHint from '../components/ScrollHint'

export default function SceneOutside() {
  const ref = useRef()
  const { sectionProgress } = useScrollProgress()
  const p = sectionProgress(ref)   // 0 → 1 as user scrolls through this section

  // stars twinkle offset
  const stars = Array.from({ length: 28 }, (_, i) => ({
    x: (i * 37 + 11) % 100,
    y: (i * 19 + 7)  % 45,
    size: .4 + (i % 3) * .25,
    delay: (i * .3) % 2,
  }))

  return (
    /* Outer: tall enough to give scroll time */
    <div ref={ref} style={{ height: '220vh', position: 'relative' }}>
      {/* Sticky viewport */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: `linear-gradient(180deg,
          hsl(${220 + p * 30},${40 + p * 10}%,${8 + p * 12}%) 0%,
          hsl(${210 + p * 40},${35 + p * 15}%,${14 + p * 10}%) 60%,
          hsl(30,${20 + p * 30}%,${18 + p * 20}%) 100%)`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>

        {/* Stars */}
        {stars.map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}rem`, height: `${s.size}rem`,
            background: 'white', borderRadius: '50%',
            opacity: Math.max(0, 1 - p * 3),
            animation: `twinkle ${1.5 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }} />
        ))}
        <style>{`@keyframes twinkle{0%,100%{opacity:.9}50%{opacity:.2}}`}</style>

        {/* Moon */}
        <div style={{
          position: 'absolute', top: '8%', right: '12%',
          fontSize: '3.5rem',
          opacity: Math.max(0, 1 - p * 4),
          transform: `translateY(${p * -30}px)`,
        }}>🌙</div>

        {/* Building facade */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: `translateX(-50%) translateY(${p * 15}%)`,
          width: 'min(500px, 90vw)',
        }}>
          {/* Roof */}
          <div style={{
            height: 24,
            background: '#2a1a0e',
            borderRadius: '8px 8px 0 0',
            border: '3px solid rgba(255,255,255,.1)',
            marginBottom: -3,
          }} />
          {/* Wall */}
          <div style={{
            background: '#1e1208',
            border: '3px solid rgba(255,255,255,.08)',
            padding: '30px 20px 0',
            minHeight: 260,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
          }}>
            {/* Glowing sign */}
            <div style={{
              background: 'var(--orange)',
              border: '4px solid var(--dark)',
              borderRadius: 14,
              padding: '12px 32px',
              boxShadow: `0 0 ${20 + Math.sin(Date.now() / 500) * 5}px var(--orange), var(--shadow)`,
              animation: 'glow 2s ease-in-out infinite',
              textAlign: 'center',
            }}>
              <style>{`@keyframes glow{0%,100%{box-shadow:0 0 20px var(--orange),var(--shadow)}50%{box-shadow:0 0 40px var(--orange),0 0 60px rgba(255,107,53,.4),var(--shadow)}}`}</style>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'white', textShadow: '2px 2px 0 var(--dark)' }}>
                👨‍🍳 Kitchen Rush
              </div>
              <div style={{ color: 'rgba(255,255,255,.85)', fontWeight: 800, fontSize: '.9rem' }}>
                AI, SDE and Home Chef
              </div>
            </div>

            {/* Windows */}
            <div style={{ display: 'flex', gap: 20 }}>
              {[0, 1].map(i => (
                <div key={i} style={{
                  width: 60, height: 70,
                  background: `rgba(255, ${180 + i * 30}, 50, ${.15 + p * .3})`,
                  border: '3px solid rgba(255,255,255,.15)',
                  borderRadius: 6,
                  boxShadow: p > .1 ? `0 0 20px rgba(255,200,50,.3)` : 'none',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Ground */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 60,
          background: 'linear-gradient(180deg,#2a1a0e,#1a0e06)',
          borderTop: '3px solid rgba(255,255,255,.05)',
        }} />

        {/* Welcome text */}
        <div style={{
          position: 'absolute', top: '18%',
          textAlign: 'center',
          opacity: Math.max(0, 1 - p * 5),
          transform: `translateY(${p * -40}px)`,
        }}>
          <p style={{ color: 'rgba(255,255,255,.5)', fontWeight: 800, fontSize: '.9rem', letterSpacing: 2, textTransform: 'uppercase' }}>
            Est. 2023 · Now Serving 🔥
          </p>
        </div>

        <ScrollHint visible={p < .3} label="Scroll to open the door" />
      </div>
    </div>
  )
}
