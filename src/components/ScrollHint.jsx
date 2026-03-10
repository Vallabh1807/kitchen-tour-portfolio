export default function ScrollHint({ visible = true, label = 'Scroll to continue', dark = false }) {
  if (!visible) return null

  const textColor  = dark ? 'rgba(0,0,0,.75)'   : 'rgba(255,255,255,.85)'
  const strokeColor = dark ? 'rgba(0,0,0,.65)'  : 'rgba(255,255,255,.75)'
  const bgColor    = dark ? 'rgba(0,0,0,.08)'   : 'rgba(255,255,255,.1)'

  return (
    <div style={{
      position:  'absolute',
      bottom:    10,
      left:      '50%',
      transform: 'translateX(-50%)',
      display:   'flex',
      flexDirection: 'column',
      alignItems:    'center',
      gap:           5,
      opacity:       visible ? 1 : 0,
      transition:    'opacity .4s',
      pointerEvents: 'none',
      zIndex:        50,
      background:    bgColor,
      borderRadius:  20,
      padding:       '6px 16px 8px',
      backdropFilter:'blur(4px)',
      whiteSpace:    'nowrap',
    }}>
      <span style={{ color: textColor, fontSize: '.75rem', fontWeight: 800, fontFamily: 'var(--font-b)', letterSpacing: '.5px', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ animation: 'bounce 1.4s ease-in-out infinite' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }`}</style>
    </div>
  )
}
