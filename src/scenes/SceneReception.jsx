import { useRef, useEffect, useRef as useRef2 } from 'react'
import { useReveal } from '../hooks/useReveal'
import { CHEF } from '../data/index'
import ScrollHint from '../components/ScrollHint'

export default function SceneReception() {
  const wrapRef = useRef()
  useReveal(wrapRef)

  return (
    <div ref={wrapRef} style={{ background: 'var(--wood-dark)', position: 'relative' }}>
      {/* Top divider — transition from door scene */}
      <div style={{
        height: 60,
        background: 'linear-gradient(180deg, #1e1208, var(--wood-dark))',
      }} />

      <div className="tile-floor" style={{ padding: '80px 24px 100px', position: 'relative' }}>
        {/* Welcome mat */}
        <div style={{
          maxWidth: 700, margin: '0 auto 60px',
          background: '#8B4513',
          border: '4px solid var(--dark)',
          borderRadius: 12,
          padding: '16px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          transform: 'perspective(400px) rotateX(20deg)',
        }}>
          <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', color: 'var(--yellow)', textShadow: '2px 2px 0 var(--dark)', letterSpacing: 4 }}>
            WELCOME
          </span>
        </div>

        {/* Chef profile card */}
        <div className="card reveal" style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(24px,5vw,48px)', textAlign: 'center' }}>

          {/* Avatar */}
          <div style={{
            width: 110, height: 110,
            background: 'var(--yellow)',
            border: '4px solid var(--dark)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3.5rem',
            margin: '0 auto 20px',
            boxShadow: 'var(--shadow)',
            animation: 'wiggle 3.5s ease-in-out infinite',
          }}>
            {CHEF.avatar}
          </div>
          <style>{`@keyframes wiggle{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}`}</style>

          {/* Name + title */}
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: 8 }}>{CHEF.name}</h1>
          <div style={{
            display: 'inline-block',
            background: 'var(--orange)', color: 'white',
            padding: '5px 20px', borderRadius: 30,
            fontWeight: 800, fontSize: '.9rem',
            border: '2px solid var(--dark)',
            marginBottom: 20,
          }}>{CHEF.title}</div>

          {/* Bio */}
          <p style={{ fontSize: 'clamp(.9rem,2vw,1.05rem)', lineHeight: 1.8, color: '#222', fontWeight: 600, marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            {CHEF.bio}
          </p>

          {/* Available badge */}
          {CHEF.available && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#e8faf4', border: '2px solid var(--green)',
              borderRadius: 20, padding: '6px 16px',
              fontWeight: 800, fontSize: '.85rem', color: '#065f46',
              marginBottom: 28,
            }}>
              <span style={{ width: 8, height: 8, background: 'var(--green)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
              <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
              Available for new projects
            </div>
          )}

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: 14,
            marginBottom: 28,
          }}>
            {CHEF.stats.map((s, i) => (
              <div key={i} className={`card reveal delay-${i + 1}`} 
                style={{
                  padding: '20px 10px',
                  transition: 'all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) rotate(-1deg) scale(1.02)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  e.currentTarget.style.borderColor = 'var(--orange)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{s.emoji}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', color: 'var(--dark)', lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: '.75rem', fontWeight: 900, color: 'var(--orange)', marginTop: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Location */}
          <p style={{ fontSize: '.85rem', fontWeight: 700, color: '#444' }}>📍 {CHEF.location}</p>
        </div>
      </div>

      <ScrollHint visible dark label="Keep scrolling for the menu" />
    </div>
  )
}
