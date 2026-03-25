import { useRef, useState, useEffect } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { TIMELINE } from '../data/index'
import ScrollHint from '../components/ScrollHint'

const TILTS = [
  { drop: -3, rest: -1.5 },
  { drop:  4, rest:  1.0 },
  { drop: -2, rest: -0.8 },
  { drop:  3, rest:  1.5 },
  { drop: -4, rest: -1.0 },
  { drop:  2, rest:  0.5 },
]

function PolaroidCard({ children, tilt, delay = 0 }) {
  const ref = useRef()
  const [landed, setLanded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLanded(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity:    landed ? 1 : 0,
        transform:  landed
          ? `rotate(${tilt.rest}deg)`
          : `translateY(-60px) rotate(${tilt.drop}deg) scale(0.85)`,
        transition: landed
          ? `opacity 0.4s ease ${delay}s,
             transform 0.5s cubic-bezier(.34,1.56,.64,1) ${delay}s`
          : 'none',
        flex: 1
      }}
    >
      {children}
    </div>
  )
}

function NodeEmoji({ emoji, delay = 0, color = 'var(--yellow)' }) {
  const ref = useRef()
  const [landed, setLanded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLanded(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        width: 44, height: 44, flexShrink: 0,
        background: color, border: '4px solid var(--dark)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem',
        boxShadow: 'var(--shadow-sm)', 
        zIndex: 1,
        opacity: 0,
        transform: 'scale(0)',
        animation: landed ? `nodePop 0.4s cubic-bezier(.34,1.56,.64,1) ${delay}s forwards` : 'none'
      }}
    >
      {emoji}
    </div>
  )
}

export default function SceneTimeline() {
  const sectionRef = useRef()
  const { scrollY, sectionProgress } = useScrollProgress()
  const progress = sectionProgress(sectionRef)

  // Animation State for Chef
  const prevScrollY = useRef(0)
  const [isScrollingDown, setIsScrollingDown] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480)
  const bouncedIndices = useRef(new Set())
  const [bounceActive, setBounceActive] = useState(false)
  const [steam, setSteam] = useState([])
  const steamTimer = useRef()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (scrollY > prevScrollY.current) {
      setIsScrollingDown(true)
    } else if (scrollY < prevScrollY.current) {
      setIsScrollingDown(false)
    }

    if (scrollY !== prevScrollY.current) {
      if (steam.length < 3) {
        setSteam(prev => [...prev, Math.random()])
      }
      clearTimeout(steamTimer.current)
      steamTimer.current = setTimeout(() => setSteam([]), 300)
    }
    prevScrollY.current = scrollY

    const checkBounce = (idx, pValue) => {
      if (Math.abs(progress - pValue) < 0.08) {
        if (isScrollingDown && !bouncedIndices.current.has(idx)) {
          bouncedIndices.current.add(idx)
          setBounceActive(true)
          setTimeout(() => setBounceActive(false), 400)
        }
      }
    }

    TIMELINE.forEach((_, i) => checkBounce(i, i / TIMELINE.length))
    checkBounce('end', 1)

    if (progress < 0.05) bouncedIndices.current.clear()

  }, [scrollY, progress, isScrollingDown])

  const handleCardEnter = (e) => {
    const card = e.currentTarget
    const tilt = card.dataset.tilt || 0
    card.style.transform = `rotate(0deg) translateY(-4px)`
    card.style.boxShadow = '3px 3px 0 var(--dark), 8px 16px 28px rgba(0,0,0,0.25)'
  }

  const handleCardLeave = (e) => {
    const card = e.currentTarget
    const rest = card.dataset.tilt || 0
    card.style.transform = `rotate(${rest}deg)`
    card.style.boxShadow = '3px 3px 0 var(--dark), 6px 10px 20px rgba(0,0,0,0.15)'
  }

  return (
    <div ref={sectionRef} style={{ background: '#1c1c1c', position: 'relative' }}>
      <style>{`
        @keyframes chefBounce {
          0%   { transform: translate(-50%,-50%) scale(1); }
          50%  { transform: translate(-50%,-70%) scale(1.3); }
          100% { transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes steamPuff {
          0%   { transform: translateY(0)   scale(1);   opacity: 0.7; }
          100% { transform: translateY(-20px) scale(2); opacity: 0; }
        }
        @keyframes nodePop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg);   opacity: 1; }
        }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 6px rgba(6,214,160,.2), var(--shadow-sm); }
          50% { box-shadow: 0 0 0 14px rgba(6,214,160,.08), var(--shadow-sm); }
        }
      `}</style>

      <div style={{ height: 60, background: 'linear-gradient(180deg,#2a1a08,#1c1c1c)' }} />

      <div className="tile-floor" style={{ padding: '60px clamp(16px,5vw,60px) 100px', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--dark)', textShadow: '3px 3px 0 var(--yellow)' }}>
            👨‍🍳 The Cooking Journey
          </div>
          <p style={{ color: '#444', fontWeight: 700, marginTop: 8 }}>
            Every great chef has a story — here's mine
          </p>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          
          <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 4, background: 'rgba(0,0,0,0.1)', borderRadius: 2, zIndex: 0 }} />
          <div style={{ 
            position: 'absolute', left: 28, top: 0, 
            width: 4, 
            height: `${progress * 100}%`,
            background: 'linear-gradient(180deg, var(--orange), var(--yellow), var(--green))',
            borderRadius: 2, zIndex: 0,
            boxShadow: '0 0 8px var(--orange)',
            transition: 'none'
          }} />

          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: 28,
              top: `calc(${progress * 100}% - 10px)`,
              transform: 'translate(-50%, -50%)',
              fontSize: '1.4rem',
              zIndex: 10,
              transition: 'none',
              filter: 'drop-shadow(0 2px 6px rgba(255,107,53,0.6))',
              animation: bounceActive ? 'chefBounce 0.4s cubic-bezier(.34,1.56,.64,1)' : 'none'
            }}>
              <div style={{ transform: `scaleX(${isScrollingDown ? 1 : -1})` }}>
                👨‍🍳
              </div>
              {steam.map((id, si) => (
                <div key={id} style={{
                  position: 'absolute',
                  left: `${-10 + si * 20}%`,
                  bottom: '100%',
                  width: 4, height: 4,
                  background: 'rgba(255,200,100,0.6)',
                  borderRadius: '50%',
                  animation: 'steamPuff 0.8s ease-out forwards',
                }} />
              ))}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, paddingLeft: 8 }}>
                <NodeEmoji emoji={item.emoji} delay={i * 0.12} color={item.color || 'var(--yellow)'} />
                <PolaroidCard tilt={TILTS[i] || {drop: 0, rest: 0}} delay={i * 0.12}>
                  <div 
                    className="card" 
                    data-tilt={(TILTS[i] && TILTS[i].rest) || 0}
                    onMouseEnter={handleCardEnter}
                    onMouseLeave={handleCardLeave}
                    style={{ 
                      flex: 1, 
                      padding: '16px 20px',
                      borderColor: item.color || undefined,
                      cursor: 'none',
                      boxShadow: '3px 3px 0 var(--dark), 6px 10px 20px rgba(0,0,0,0.15)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem' }}>{item.title}</span>
                      <span style={{
                        background: item.color || 'var(--orange)', color: 'white',
                        padding: '2px 10px', borderRadius: 20,
                        fontSize: '.75rem', fontWeight: 800,
                        border: '2px solid var(--dark)',
                      }}>{item.year}</span>
                    </div>
                    <p style={{ fontSize: '.9rem', color: '#222', fontWeight: 600, lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </PolaroidCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollHint visible dark label="check the trophy wall" />
    </div>
  )
}
