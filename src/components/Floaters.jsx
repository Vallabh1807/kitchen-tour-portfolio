import { useMemo } from 'react'

const FOOD_ITEMS = [
  '🍕','🍜','🌮','🥗','🍣','🥐','🍔','🥦',
  '🍎','🧁','🫐','🥕','🍋','🌽','🫙','🌶️',
  '🧅','🍇','🥩','🧆','🍱','🥟','🫕','🍤',
]

export default function Floaters() {
  const items = useMemo(() => 
    FOOD_ITEMS.map((food, i) => ({
      food,
      left:     `${(i * 4.3 + 2) % 96}%`,
      fontSize: `${1.0 + (i % 4) * 0.35}rem`,
      duration: `${12 + (i % 8) * 2.5}s`,
      delay:    `-${(i * 2.1) % 14}s`,     
      opacity:  0.35 + (i % 3) * 0.1,
    })),
  [])

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(100vh) rotate(0deg);   opacity: 0; }
          5%   { opacity: var(--fop); }
          90%  { opacity: var(--fop); }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <div style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        2,
        overflow:      'hidden',
      }}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              position:         'absolute',
              left:             item.left,
              bottom:           '-80px',
              fontSize:         item.fontSize,
              '--fop':          item.opacity,
              opacity:          0,
              animation:        `floatUp ${item.duration} ${item.delay} linear infinite`,
              userSelect:       'none',
              filter:           'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            {item.food}
          </span>
        ))}
      </div>
    </>
  )
}
