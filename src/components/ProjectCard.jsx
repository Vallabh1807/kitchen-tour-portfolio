import { useState } from 'react'
import { createPortal } from 'react-dom'

export default function ProjectCard({ project, delay = 0 }) {
  const [open, setOpen] = useState(false)
  const { emoji, color, accent, category, title, subtitle, desc, stack, difficulty, year, live, repo } = project

  return (
    <>
      <div
        className={`card reveal delay-${delay}`}
        onClick={() => setOpen(true)}
        style={{
          overflow: 'hidden', cursor: 'none',
          transition: `opacity .7s ease ${delay * .1}s, transform .7s ease ${delay * .1}s, box-shadow .15s`,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) rotate(.5deg)'; e.currentTarget.style.boxShadow = '5px 13px 0 var(--dark)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = '';  e.currentTarget.style.boxShadow = ''; }}
      >
        {/* top colour band */}
        <div style={{ height: 90, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
          {emoji}
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <strong style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem' }}>{title}</strong>
            <span style={{ fontSize: '.78rem', fontWeight: 800, color: '#aaa' }}>{year}</span>
          </div>
          <p style={{ fontSize: '.82rem', color: '#666', fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{subtitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
            {stack.slice(0, 3).map(s => <span key={s} className="tag" style={{ fontSize: '.7rem' }}>{s}</span>)}
            {stack.length > 3 && <span className="tag" style={{ background: 'var(--yellow)', fontSize: '.7rem' }}>+{stack.length - 3}</span>}
          </div>
          <div style={{ color: 'var(--yellow)', fontSize: '.9rem' }}>
            {'★'.repeat(difficulty)}{'☆'.repeat(5 - difficulty)}
          </div>
        </div>
      </div>

      {/* Modal - rendered via Portal to escape transforms */}
      {open && createPortal(
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,.85)',
            zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            animation: 'modalFadeIn .3s ease',
            backdropFilter: 'blur(4px)',
            cursor: 'none',
            pointerEvents: 'auto',
          }}
        >
          <style>{`
            @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes modalSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          `}</style>
          
          <div 
            onClick={e => e.stopPropagation()} 
            style={{
              background: 'white', 
              border: '4px solid var(--dark)',
              borderRadius: 24, 
              padding: 'clamp(20px, 4vw, 32px)', 
              maxWidth: 460, 
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '10px 10px 0 var(--dark)', 
              position: 'relative',
              animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--orange) transparent',
              cursor: 'none'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setOpen(false)} 
              style={{
                position: 'sticky', float: 'right', // stays at top of scroll
                top: 0, marginRight: -10, marginTop: -10,
                background: 'var(--red)', color: 'white',
                border: '3px solid var(--dark)', borderRadius: '50%',
                width: 38, height: 38, cursor: 'none', 
                fontFamily: 'var(--font-d)',
                fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '2px 2px 0 var(--dark)',
                zIndex: 20,
              }}
            >✕</button>

            {/* Header Area */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
               <div style={{ 
                 width: 80, height: 80, 
                 background: color, 
                 borderRadius: 20, 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', 
                 fontSize: '3rem', 
                 margin: '0 auto 12px',
                 border: '3px solid var(--dark)',
                 boxShadow: '3px 3px 0 var(--dark)'
               }}>
                 {emoji}
               </div>
               <div style={{ 
                 display: 'inline-block', 
                 background: accent, 
                 color: 'white', 
                 padding: '2px 14px', 
                 borderRadius: 16, 
                 fontSize: '.75rem', 
                 fontWeight: 900, 
                 border: '2px solid var(--dark)', 
                 marginBottom: 10,
                 textTransform: 'uppercase',
               }}>
                 {category}
               </div>
               <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', marginBottom: 4, color: 'var(--dark)' }}>{title}</h2>
               <p style={{ fontSize: '.9rem', fontWeight: 800, color: '#777', marginBottom: 16 }}>{subtitle}</p>
            </div>

            <div style={{ marginBottom: 24 }}>
               <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', marginBottom: 10, borderBottom: '2px solid #f0f0f0', paddingBottom: 6 }}>Description</h3>
               <p style={{ fontSize: '.95rem', lineHeight: 1.7, color: '#555', fontWeight: 600 }}>{desc}</p>
            </div>

            <div style={{ marginBottom: 24 }}>
               <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', marginBottom: 10, borderBottom: '2px solid #f0f0f0', paddingBottom: 6 }}>Tech Stack</h3>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                 {stack.map(s => (
                   <span key={s} className="tag" style={{ padding: '4px 14px', fontSize: '.85rem' }}>{s}</span>
                 ))}
               </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 32, borderTop: '2px dashed #eee', paddingTop: 24 }}>
              <a href={live} target="_blank" rel="noreferrer" className="btn btn-orange" style={{ flex: 1, padding: '12px 0', fontSize: '.95rem' }}>🌐 LIVE</a>
              <a href={repo} target="_blank" rel="noreferrer" className="btn btn-dark"   style={{ flex: 1, padding: '12px 0', fontSize: '.95rem' }}>🐙 CODE</a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
