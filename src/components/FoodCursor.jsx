import { useState, useEffect, useRef, useCallback } from 'react'

const FOOD_TRAIL = [
  '🍤','🍜','🌶️','🍚','🍣','🥟',
  '🧄','🫙','🥕','🍋','🌮','🥩',
  '🧆','🍱','🫕','🥦','🍙','🦐',
]

let idCounter = 0

export default function FoodCursor() {
  const cursorRef               = useRef()
  const [particles, setParticles] = useState([])
  const lastSpawn               = useRef(0)

  const spawnParticle = useCallback((x, y, count = 1) => {
    const now = Date.now()
    if (count === 1 && now - lastSpawn.current < 40) return
    if (count === 1) lastSpawn.current = now

    const newParticles = Array.from({ length: count }, () => {
      const range    = count > 1 ? 70 : 40
      const angle    = (Math.random() * (range * 2) - range) * (Math.PI / 180)
      // distance adjusted to satisfy -10 to -60 dy and -40 to 40 dx
      const distance = 20 + Math.random() * 40 
      return {
        id:       ++idCounter,
        emoji:    FOOD_TRAIL[Math.floor(Math.random() * FOOD_TRAIL.length)],
        x,
        y,
        dx:       Math.sin(angle) * distance,
        dy:       -(Math.cos(angle) * distance),
        size:     0.9 + Math.random() * 0.7,
        rotate:   Math.random() * 360,
        rotateTo: 90 + Math.random() * 90,
        life:     700 + Math.random() * 200,
        born:     Date.now(),
      }
    })

    setParticles(prev => [...prev, ...newParticles])
  }, [])

  useEffect(() => {
    const onMove = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
      spawnParticle(e.clientX, e.clientY, 1)
    }
    const onDown = e => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1.5) rotate(-20deg)'
      }
      // burst of 5 particles on click
      spawnParticle(e.clientX, e.clientY, 5)
    }
    const onUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [spawnParticle])

  // cleanup expired particles every 200ms
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setParticles(prev => prev.filter(p => now - p.born < p.life + 100))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Chef hat cursor */}
      <div 
        ref={cursorRef}
        style={{
          position:      'fixed',
          left:          '-100px',
          top:           '-100px',
          zIndex:        99999,
          pointerEvents: 'none',
          transform:     'translate(-50%,-50%)',
          transition:    'transform 0.1s ease',
          fontSize:      '24px',
          lineHeight:     1,
          userSelect:    'none',
          willChange:    'left, top',
        }}
      >
        👨‍🍳
      </div>

      {/* Food particles */}
      {particles.map(p => {
        const age      = Date.now() - p.born
        const progress = Math.min(age / p.life, 1)
        const opacity  = progress < 0.6
          ? 0.9 - progress * 0.3
          : 0.7 - ((progress - 0.6) / 0.4) * 0.7
        const scale    = 1 + progress * 0.1 - progress * progress * 0.7

        return (
          <div
            key={p.id}
            className="food-particle"
            style={{
              position:      'fixed',
              left:          p.x + p.dx * progress,
              top:           p.y + p.dy * progress,
              zIndex:        99998,
              pointerEvents: 'none',
              fontSize:      `${p.size}rem`,
              opacity,
              transform:     `translate(-50%,-50%) scale(${scale}) rotate(${p.rotate + p.rotateTo * progress}deg)`,
              userSelect:    'none',
              filter:        'drop-shadow(0 1px 3px rgba(0,0,0,0.3))',
            }}
          >
            {p.emoji}
          </div>
        )
      })}
    </>
  )
}
