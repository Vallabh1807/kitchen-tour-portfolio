import { useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { PROJECTS } from '../data/index'
import ProjectCard from '../components/ProjectCard'
import ScrollHint from '../components/ScrollHint'

const ease = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2
const clamp = (v,lo,hi) => Math.min(hi,Math.max(lo,v))

export default function SceneProjects() {
  const ref = useRef()
  const { sectionProgress } = useScrollProgress()
  const p = sectionProgress(ref)

  // How many "steps" of scroll to fully traverse all cards
  // Each card needs ~1 unit of travel; the last card should be fully visible
  const CARD_W  = 340   // px each card occupies
  const GAP     = 28
  const VISIBLE = 1     // cards visible at once
  const TOTAL   = PROJECTS.length
  const TRAVEL_PX = (TOTAL - VISIBLE) * (CARD_W + GAP)

  // eased progress drives the horizontal translateX
  const eased   = ease(clamp(p, 0, 1))
  const translateX = -(eased * TRAVEL_PX)

  // Section heading reveal
  const headOp = clamp(p * 6, 0, 1)
  const headY  = clamp((1-p*6)*30, 0, 30)

  // indicator which card is "active" (center)
  const activeIdx = Math.min(
    TOTAL - 1,
    Math.round(eased * (TOTAL - 1))
  )

  return (
    <div ref={ref} style={{
      // tall enough for each card to have its own scroll "step"
      height: `${140 + TOTAL * 80}vh`,
      position: 'relative',
    }}>
      {/* Sticky viewport */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden',
        background: '#100d06',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Top gradient from tile floor */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(180deg, var(--tile-a,#2a1f0e), #100d06)',
          zIndex: 0, pointerEvents: 'none',
        }}/>

        {/* Ambient glow behind scrolling cards */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at ${50 + eased*20}% 55%,
            rgba(245,158,11,0.08) 0%, transparent 65%)`,
          pointerEvents: 'none', zIndex: 0,
        }}/>

        {/* ── Section header ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'var(--wood-dark,#3d2410)',
          borderBottom: '4px solid rgba(0,0,0,.6)',
          padding: '26px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 10,
          opacity: headOp,
          transform: `translateY(${-headY}px)`,
          boxShadow: '0 4px 30px rgba(0,0,0,.6)',
        }}>
          {/* Heat shimmer overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'repeating-linear-gradient(180deg, transparent 0, transparent 8px, rgba(255,100,0,.03) 8px, rgba(255,100,0,.03) 9px)',
          }}/>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>🍽️</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-d)', fontSize:'clamp(1.3rem,3vw,2rem)',
                color: 'var(--yellow,#f59e0b)',
                textShadow: '2px 2px 0 rgba(0,0,0,.5)',
              }}>Grill Station</div>
              <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'rgba(255,255,255,.55)' }}>
                Today's menu — {PROJECTS.length} dishes. Scroll to browse →
              </div>
            </div>
          </div>

          {/* Flame animations */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {['🔥','🔥','🔥'].map((f,i)=>(
              <span key={i} style={{
                fontSize: '1.6rem',
                animation: `flicker ${.8+i*.2}s ease-in-out infinite alternate`,
                animationDelay: `${i*.15}s`,
              }}>{f}</span>
            ))}
          </div>
        </div>

        {/* ── Horizontal scroll rail ── */}
        <div className="h-rail" style={{
          position: 'absolute',
          top: 90,
          left: 0, right: 0,
          bottom: 60,
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
          overflow: 'hidden',
        }}>
          {/* Track container — clip rail outside edges with subtle vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background:`linear-gradient(90deg,
              rgba(16,13,6,.95) 0%,
              transparent 12%,
              transparent 88%,
              rgba(16,13,6,.95) 100%)`,
            zIndex: 5, pointerEvents: 'none',
          }}/>

          {/* Moving strip */}
          <div style={{
            display: 'flex',
            gap: GAP,
            paddingLeft: '8vw',
            paddingRight: '8vw',
            transform: `translateX(${translateX}px)`,
            transition: 'none',
            willChange: 'transform',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            {PROJECTS.map((project, i) => {
              const isActive = i === activeIdx
              const dist     = Math.abs(i - activeIdx)
              const cardScale = isActive ? 1.05 : Math.max(0.9, 1 - dist*0.04)
              const cardOp    = isActive ? 1    : Math.max(0.55, 1 - dist*0.2)
              const cardTilt  = (i - activeIdx) * -3  // slight z-tilt

              return (
                <div
                  key={project.id}
                  style={{
                    width: CARD_W,
                    flexShrink: 0,
                    transform: `scale(${cardScale}) rotateY(${cardTilt}deg)`,
                    opacity: cardOp,
                    transition: 'transform 0.15s ease, opacity 0.15s ease',
                    perspective: 800,
                    filter: isActive ? 'none' : `blur(${dist > 1 ? 1 : 0}px)`,
                  }}
                >
                  <ProjectCard project={project} delay={0} />
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Dot indicator ── */}
        <div style={{
          position: 'absolute', bottom: '12%', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: 10, alignItems: 'center',
          zIndex: 10,
        }}>
          {PROJECTS.map((_,i) => (
            <div key={i} style={{
              width:  i === activeIdx ? 24 : 8,
              height: 8,
              borderRadius: 99,
              background: i === activeIdx
                ? 'linear-gradient(90deg,#f59e0b,#ef4444)'
                : 'rgba(255,255,255,.2)',
              transition: 'width .35s ease, background .35s ease',
              boxShadow: i === activeIdx ? '0 0 8px rgba(245,158,11,.6)' : 'none',
            }}/>
          ))}
        </div>

        {/* ── Card counter ── */}
        <div style={{
          position: 'absolute', bottom: 'calc(12% + 28px)', right: '6%',
          fontFamily: 'var(--font-d)', fontSize: '.72rem',
          letterSpacing: '.1em',
          color: 'rgba(255,200,80,.6)',
          zIndex: 10,
        }}>
          {String(activeIdx+1).padStart(2,'0')} / {String(TOTAL).padStart(2,'0')}
        </div>

        {/* ── Progress bar (horizontal) ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
          background: 'rgba(255,255,255,.07)', zIndex: 10,
        }}>
          <div style={{
            height: '100%',
            width: `${eased*100}%`,
            background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
            boxShadow: '0 0 8px rgba(245,158,11,.5)',
            transition: 'none',
          }}/>
        </div>

        <ScrollHint
          visible={p < .92}
          dark={false}
          label={p < .1 ? 'Scroll to browse dishes' : p < .9 ? 'Keep scrolling' : 'Head to the pantry'}
        />
      </div>

      <style>{`
        @keyframes flicker { from{transform:scaleY(1) translateY(0)} to{transform:scaleY(1.2) translateY(-4px)} }
        /* Force all reveal cards inside the horizontal rail to show immediately */
        .h-rail .reveal, .h-rail .reveal-left, .h-rail .reveal-right {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </div>
  )
}
