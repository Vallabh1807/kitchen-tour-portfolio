const STOPS = [
  { pct: 0,   label: '🌙 Outside',   },
  { pct: 12,  label: '🚪 Entrance',  },
  { pct: 25,  label: '🤝 Welcome',   },
  { pct: 38,  label: '🍽️ Projects',  },
  { pct: 60,  label: '🫙 Pantry',    },
  { pct: 70,  label: '📅 Journey',   },
  { pct: 83,  label: '🏆 Credentials', },
  { pct: 95,  label: '📋 Contact',   },
]

export default function ProgressBar({ progress }) {
  const pct = Math.round(progress * 100)

  // find current scene label
  let currentLabel = STOPS[0].label
  for (const s of STOPS) {
    if (pct >= s.pct) currentLabel = s.label
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 1000, height: 4,
      background: 'rgba(0,0,0,.3)',
    }}>
      {/* fill */}
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: 'linear-gradient(90deg, var(--orange), var(--yellow))',
        transition: 'width .1s linear',
        boxShadow: '0 0 8px var(--orange)',
      }} />

      {/* floating label */}
      <div style={{
        position: 'absolute', top: 8,
        left: `clamp(10px, ${pct}%, calc(100% - 140px))`,
        background: 'rgba(0,0,0,.75)',
        color: 'white',
        fontSize: '.72rem', fontWeight: 800,
        fontFamily: 'var(--font-b)',
        padding: '3px 10px',
        borderRadius: 20,
        whiteSpace: 'nowrap',
        transition: 'left .15s linear',
        border: '1px solid rgba(255,255,255,.15)',
      }}>
        {currentLabel} · {pct}%
      </div>
    </div>
  )
}
