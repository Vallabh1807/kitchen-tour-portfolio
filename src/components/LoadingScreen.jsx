import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // Timeline of steps — each step triggers a new 
  // visual change in the scene
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),   // street lamp flickers on
      setTimeout(() => setStep(2), 1200),  // window lights turn on
      setTimeout(() => setStep(3), 1900),  // chef silhouette appears
      setTimeout(() => setStep(4), 2600),  // CLOSED flips to OPEN
      setTimeout(() => setStep(5), 3300),  // door opens + light spills out
      setTimeout(() => {                   // fade out
        setLeaving(true)
        setTimeout(onComplete, 600)
      }, 4000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div style={{
      position:   'fixed',
      inset:       0,
      zIndex:      9000,
      background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0e06 60%, #0d0806 100%)',
      display:    'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity:    leaving ? 0 : 1,
      transition: 'opacity 0.6s ease',
      overflow:   'hidden',
      cursor:     'none',
    }}>

      {/* ── Stars in the sky ── */}
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} style={{
          position:     'absolute',
          left:         `${(i * 5 + 3) % 95}%`,
          top:          `${(i * 7 + 2) % 40}%`,
          width:        `${2 + (i % 3)}px`,
          height:       `${2 + (i % 3)}px`,
          background:   'white',
          borderRadius: '50%',
          opacity:      0.4 + (i % 3) * 0.2,
          animation:    `twinkle ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
          animationDelay: `${(i * 0.3) % 2}s`,
        }} />
      ))}

      {/* ── Moon ── */}
      <div style={{
        position:  'absolute',
        top:       '6%',
        right:     '10%',
        fontSize:  '2.5rem',
        opacity:   0.9,
        animation: 'float 4s ease-in-out infinite',
      }}>🌙</div>

      {/* ── Street lamp ── */}
      <div style={{
        position: 'absolute',
        left:     '15%',
        bottom:   '20%',
        display:  'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* lamp glow */}
        <div style={{
          width:        40,
          height:       40,
          borderRadius: '50%',
          background:   step >= 1 ? 'var(--yellow)' : '#333',
          boxShadow:    step >= 1
            ? '0 0 20px var(--yellow), 0 0 60px rgba(255,209,102,0.4)'
            : 'none',
          border:       '3px solid #555',
          transition:   'all 0.4s ease',
          marginBottom: -4,
        }} />
        {/* pole */}
        <div style={{
          width:      6,
          height:     120,
          background: '#444',
          borderRadius: 3,
        }} />
        {/* ground base */}
        <div style={{
          width:      20,
          height:     10,
          background: '#333',
          borderRadius: '0 0 4px 4px',
        }} />
      </div>

      {/* ── Building ── */}
      <div style={{
        position: 'absolute',
        bottom:   0,
        left:     '50%',
        transform: 'translateX(-50%)',
        width:    'min(460px, 88vw)',
      }}>

        {/* Rooftop detail */}
        <div style={{
          height:     28,
          background: '#1a0e06',
          border:     '3px solid rgba(255,255,255,0.06)',
          borderRadius: '6px 6px 0 0',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap:        8,
        }}>
          {['▲','▲','▲'].map((t, i) => (
            <span key={i} style={{ color: 'rgba(255,255,255,0.15)', fontSize: '.7rem' }}>{t}</span>
          ))}
        </div>

        {/* Main wall */}
        <div style={{
          background: '#120c06',
          border:     '3px solid rgba(255,255,255,0.06)',
          minHeight:  280,
          padding:    '24px 20px 0',
          display:    'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:        20,
          position:   'relative',
        }}>

          {/* ── Restaurant sign ── */}
          <div style={{
            background: step >= 4 ? 'var(--orange)' : '#2a1a0a',
            border:     '4px solid rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding:    '10px 28px',
            textAlign:  'center',
            transition: 'background 0.5s ease, box-shadow 0.5s ease',
            boxShadow:  step >= 4
              ? '0 0 30px var(--orange), 0 0 60px rgba(255,107,53,0.3)'
              : 'none',
          }}>
            <div style={{
              fontFamily: 'var(--font-d)',
              fontSize:   'clamp(1.2rem,3vw,1.8rem)',
              color:      step >= 4 ? 'white' : '#444',
              textShadow: step >= 4 ? '2px 2px 0 rgba(0,0,0,0.4)' : 'none',
              transition: 'color 0.5s ease',
            }}>
              👨‍🍳 Kitchen Tour
            </div>
            <div style={{
              fontSize:   '.8rem',
              fontWeight: 800,
              color:      step >= 4 ? 'rgba(255,255,255,0.8)' : '#333',
              transition: 'color 0.5s ease',
              fontFamily: 'var(--font-b)',
            }}>
              Portfolio · Est. 2023
            </div>
          </div>

          {/* ── CLOSED / OPEN sign ── */}
          <div style={{
            background:   step >= 4 ? '#065f46' : '#7f1d1d',
            border:       '3px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            padding:      '5px 18px',
            fontFamily:   'var(--font-d)',
            fontSize:     '1rem',
            color:        'white',
            letterSpacing: 3,
            transition:   'background 0.4s ease',
            boxShadow:    step >= 4
              ? '0 0 12px rgba(6,214,160,0.5)'
              : '0 0 8px rgba(220,38,38,0.4)',
            animation:    step === 4 ? 'flipSign 0.4s ease' : 'none',
          }}>
            {step >= 4 ? '✅ OPEN' : '🚫 CLOSED'}
          </div>

          {/* ── Two windows ── */}
          <div style={{ display: 'flex', gap: 24 }}>
            {[0, 1].map(i => (
              <div key={i} style={{
                width:      72,
                height:     80,
                background: step >= 2
                  ? `rgba(255, ${160 + i * 20}, 40, 0.25)`
                  : 'rgba(255,255,255,0.03)',
                border:     '3px solid rgba(255,255,255,0.12)',
                borderRadius: 6,
                transition: `background 0.6s ease ${i * 0.3}s`,
                boxShadow:  step >= 2
                  ? `0 0 20px rgba(255,180,50,0.25)`
                  : 'none',
                display:    'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize:   '1.4rem',
                overflow:   'hidden',
              }}>
                {/* Chef silhouette in left window */}
                {i === 0 && (
                  <div style={{
                    opacity:    step >= 3 ? 1 : 0,
                    transform:  step >= 3
                      ? 'translateY(0)'
                      : 'translateY(20px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    filter:     'brightness(0.3)',
                    fontSize:   '2rem',
                  }}>
                    👨‍🍳
                  </div>
                )}
                {/* Steam in right window */}
                {i === 1 && step >= 3 && (
                  <div style={{
                    fontSize:  '1.2rem',
                    animation: 'steamRise 1.5s ease-in-out infinite',
                    opacity:   0.6,
                  }}>♨️</div>
                )}
              </div>
            ))}
          </div>

          {/* ── Door ── */}
          <div style={{
            position:   'absolute',
            bottom:     0,
            left:       '50%',
            transform:  'translateX(-50%)',
            width:      100,
            height:     140,
            perspective: 400,
          }}>
            {/* Door frame */}
            <div style={{
              position:   'absolute',
              inset:      -6,
              background: '#3d1f08',
              borderRadius: '6px 6px 0 0',
              border:     '3px solid rgba(255,255,255,0.08)',
            }} />
            {/* Door panel */}
            <div style={{
              position:       'absolute',
              inset:          0,
              background:     'linear-gradient(135deg, #5c3317, #3d1f08)',
              borderRadius:   '4px 4px 0 0',
              transformOrigin: 'left center',
              transform:      step >= 5
                ? 'perspective(400px) rotateY(-70deg)'
                : 'perspective(400px) rotateY(0deg)',
              transition:     'transform 0.7s cubic-bezier(.4,0,.2,1)',
              border:         '2px solid rgba(0,0,0,0.3)',
            }}>
              {/* Door knob */}
              <div style={{
                position:     'absolute',
                right:        12,
                top:          '45%',
                width:        10,
                height:       10,
                background:   '#c8a060',
                borderRadius: '50%',
                border:       '1px solid rgba(0,0,0,0.3)',
              }} />
            </div>
            {/* Light spill when door opens */}
            {step >= 5 && (
              <div style={{
                position:     'absolute',
                inset:        0,
                background:   'radial-gradient(ellipse at left, rgba(255,220,100,0.6) 0%, transparent 70%)',
                borderRadius: '4px 4px 0 0',
                animation:    'lightSpill 0.5s ease forwards',
              }} />
            )}
          </div>

        </div>
      </div>

      {/* ── Ground / pavement ── */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     52,
        background: 'linear-gradient(180deg, #1a0e06, #0d0806)',
        borderTop:  '3px solid rgba(255,255,255,0.04)',
      }} />

      {/* ── Status text ── */}
      <div style={{
        position:   'absolute',
        bottom:     '8%',
        left:       '50%',
        transform:  'translateX(-50%)',
        textAlign:  'center',
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          fontFamily: 'var(--font-b)',
          fontWeight: 800,
          fontSize:   'clamp(.75rem,2vw,.9rem)',
          color:      'rgba(255,255,255,0.5)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          animation:  'fadeInUp 0.4s ease forwards',
        }}>
          {step === 0 && '🌙 Closed for the night...'}
          {step === 1 && '💡 Turning the lights on...'}
          {step === 2 && '🔥 Kitchen is heating up...'}
          {step === 3 && '👨‍🍳 Chef is getting ready...'}
          {step === 4 && '✅ We\'re open! Come on in...'}
          {step === 5 && '🚪 Right this way...'}
        </div>

        {/* Dot progress indicators */}
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          gap:            8,
          marginTop:      12,
        }}>
          {[1,2,3,4,5].map(s => (
            <div key={s} style={{
              width:        s <= step ? 24 : 8,
              height:       8,
              borderRadius: 4,
              background:   s <= step ? 'var(--orange)' : 'rgba(255,255,255,0.15)',
              transition:   'width 0.3s ease, background 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* ── Skip button ── */}
      <button
        onClick={() => { setLeaving(true); setTimeout(onComplete, 600) }}
        style={{
          position:   'absolute',
          top:        20,
          right:      20,
          background: 'rgba(255,255,255,0.08)',
          border:     '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20,
          color:      'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-b)',
          fontWeight: 800,
          fontSize:   '.75rem',
          padding:    '6px 16px',
          cursor:     'none',
          transition: 'background 0.2s, color 0.2s',
          letterSpacing: 1,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
          e.currentTarget.style.color = 'white'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
        }}
      >
        SKIP →
      </button>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50%       { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes steamRise {
          0%, 100% { transform: translateY(0);   opacity: 0.6; }
          50%       { transform: translateY(-8px); opacity: 0.3; }
        }
        @keyframes flipSign {
          0%   { transform: rotateX(90deg); opacity: 0; }
          100% { transform: rotateX(0deg);  opacity: 1; }
        }
        @keyframes lightSpill {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
