import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { CREDENTIALS, RESUME } from '../data/index'
import ScrollHint from '../components/ScrollHint'

export default function SceneCredentials() {
  const wrapRef = useRef()
  useReveal(wrapRef)

  return (
    <div ref={wrapRef} style={{ background: '#1a0e06', position: 'relative', minHeight: '100vh', paddingBottom: 100 }}>
       {/* Top separator to blend with the previous scene's floor */}
      <div style={{ height: 100, background: 'linear-gradient(180deg, var(--tile-a), #1a0e06)' }} />

      <div style={{ padding: '60px clamp(16px, 5vw, 60px)' }}>
        {/* Header Section */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ 
            fontFamily: 'var(--font-d)', 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            color: 'var(--yellow)', 
            textShadow: '4px 4px 0 rgba(0,0,0,0.5)',
            lineHeight: 1.1
          }}>
             🏆 The Trophy Wall
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, marginTop: 15, fontSize: '1.1rem', letterSpacing: 1 }}>
            A COLLECTION OF CERTIFIED SKILLS & PROFESSIONAL RECIPES
          </p>
        </div>

        <div style={{ 
          maxWidth: 1100, 
          margin: '0 auto', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
          gap: '60px 40px', 
          alignItems: 'start' 
        }}>
          
          {/* 1. RESUME SECTION — Styled as a printed menu / recipe card */}
          <div className="reveal" style={{ position: 'sticky', top: 100 }}>
             <div style={{ 
               background: 'var(--cream)', 
               border: '2px solid var(--dark)', 
               padding: '50px 40px', 
               boxShadow: '20px 20px 0 rgba(0,0,0,0.4)',
               position: 'relative',
               transform: 'rotate(-1.5deg)',
               borderRadius: '2px',
               overflow: 'hidden'
             }}>
                {/* Decorative Fold line */}
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: '50%', 
                  width: 1, 
                  height: '100%', 
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent)',
                  boxShadow: '-1px 0 3px rgba(0,0,0,0.05)' 
                }} />

                {/* Stains/Texture for authenticity */}
                <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'rgba(160,82,45,0.05)', borderRadius: '50%', filter: 'blur(20px)' }} />
                
                <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 15 }}>👨‍🍳</div>
                  <div style={{ 
                    fontFamily: 'var(--font-d)', 
                    fontSize: '2rem', 
                    color: 'var(--dark)', 
                    borderBottom: '3px double var(--dark)', 
                    display: 'inline-block', 
                    paddingBottom: 8,
                    letterSpacing: 1
                  }}>
                    CURRICULUM VITAE
                  </div>
                  <div style={{ fontSize: '.75rem', fontWeight: 900, color: 'var(--orange)', marginTop: 10, textTransform: 'uppercase' }}>
                    Available for immediate service
                  </div>
                </div>

                <div style={{ marginBottom: 45 }}>
                  <div style={{ 
                    fontFamily: 'var(--font-d)', 
                    color: 'var(--orange)', 
                    fontSize: '1.25rem', 
                    marginBottom: 20, 
                    textAlign: 'center',
                    background: 'rgba(255,107,53,0.1)',
                    padding: '8px',
                    borderRadius: '4px'
                  }}>
                     — Today's Kitchen Specials —
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {RESUME.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: 5 }}>
                        <span style={{ fontWeight: 900, fontSize: '.95rem', color: '#333' }}>{h.label}</span>
                        <div style={{ flex: 1, borderBottom: '1px dotted #ccc', margin: '0 10px', height: 1 }} />
                        <span style={{ fontWeight: 700, fontSize: '.9rem', color: '#666', textAlign: 'right' }}>{h.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <a href={RESUME.downloadLink} target="_blank" rel="noreferrer" className="btn btn-orange" style={{ width: '100%', padding: '15px' }}>
                     GET FULL RECIPE (PDF)
                  </a>
                  <p style={{ fontSize: '.7rem', color: '#999', marginTop: 12, fontWeight: 700 }}>
                    *References available upon request
                  </p>
                </div>
             </div>
          </div>

          {/* 2. CERTIFICATIONS SECTION — Styled as framed certificates on a wall */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
             {CREDENTIALS.map((cert, i) => (
               <div 
                 key={i} 
                 className={`reveal delay-${(i % 5) + 1}`}
                 style={{
                   background: 'white',
                   border: '10px solid var(--wood)',
                   borderImage: 'linear-gradient(to bottom, var(--wood), var(--wood-dark)) 1',
                   padding: '24px',
                   display: 'flex',
                   alignItems: 'center',
                   gap: 25,
                   boxShadow: 'var(--shadow-lg)',
                   transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                   cursor: 'none',
                   position: 'relative',
                 }}
                 onMouseEnter={e => {
                   e.currentTarget.style.transform = 'scale(1.03) rotate(1.5deg) translateY(-8px)';
                   e.currentTarget.style.zIndex = 10;
                 }}
                 onMouseLeave={e => {
                   e.currentTarget.style.transform = 'scale(1) rotate(0deg) translateY(0)';
                   e.currentTarget.style.zIndex = 1;
                 }}
               >
                 {/* Badge Emoji */}
                 <div style={{ 
                   width: 70, height: 70, 
                   background: 'rgba(0,0,0,0.03)', 
                   borderRadius: '50%', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   fontSize: '2.5rem',
                   border: '1px solid rgba(0,0,0,0.05)',
                   flexShrink: 0
                 }}>
                   {cert.emoji}
                 </div>

                 {/* Cert Details */}
                 <div style={{ flex: 1 }}>
                   <div style={{ 
                     fontFamily: 'var(--font-d)', 
                     fontSize: '1.2rem', 
                     color: 'var(--dark)',
                     lineHeight: 1.2,
                     marginBottom: 5
                   }}>
                     {cert.name}
                   </div>
                   <div style={{ 
                     fontSize: '.85rem', 
                     fontWeight: 800, 
                     color: '#888',
                     display: 'flex',
                     alignItems: 'center',
                     gap: 6
                   }}>
                     <span style={{ color: 'var(--orange)' }}>{cert.issuer}</span>
                     <span>•</span>
                     <span>{cert.year}</span>
                   </div>
                 </div>

                 {/* Verify Link */}
                 <a 
                   href={cert.link} 
                   target="_blank" 
                   rel="noreferrer" 
                   style={{ 
                     fontSize: '.7rem', 
                     fontWeight: 900, 
                     color: 'var(--dark)', 
                     textDecoration: 'none',
                     border: '2px solid var(--dark)',
                     padding: '6px 12px',
                     borderRadius: '4px',
                     transition: 'all 0.2s',
                     background: 'transparent'
                   }}
                   onMouseEnter={e => {
                     e.target.style.background = 'var(--dark)';
                     e.target.style.color = 'white';
                   }}
                   onMouseLeave={e => {
                     e.target.style.background = 'transparent';
                     e.target.style.color = 'var(--dark)';
                   }}
                 >
                   VERIFY
                 </a>
               </div>
             ))}

             {/* Little decorative nail heads for the "wall" feel */}
             <div style={{ textAlign: 'center', marginTop: 40, opacity: 0.3 }}>
                <div style={{ fontSize: '2rem' }}>🖼️ 🖼️ 🖼️</div>
             </div>
          </div>

        </div>
      </div>

      <ScrollHint visible label="Last stop — get in touch" />
    </div>
  )
}
