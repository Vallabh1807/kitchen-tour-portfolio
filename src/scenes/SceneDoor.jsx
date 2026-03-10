import { useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import ScrollHint from '../components/ScrollHint'

/* ── helpers ──────────────────────────────────────────── */
const ease  = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2
const clamp = (v,lo,hi) => Math.min(hi,Math.max(lo,v))
const remap = (v,a,b,c,d) => c + ((v-a)/(b-a))*(d-c)

/* ── static dust particles ────────────────────────────── */
const PARTICLES = Array.from({length:22},(_,i) => ({
  id:i, x:15+Math.random()*70, baseY:15+Math.random()*75,
  size:1.5+Math.random()*2.5, speed:.35+Math.random()*.55,
  drift:(Math.random()-.5)*50, opacity:.25+Math.random()*.5,
  hue:30+Math.random()*25,
}))

/* ── light shafts ─────────────────────────────────────── */
const RAYS = Array.from({length:8},(_,i)=>({
  id:i, angle:-40+(i*10), blur:10+i*3, width:2+i*0.5,
}))

export default function SceneDoor() {
  const ref = useRef()
  const { sectionProgress } = useScrollProgress()
  const p = sectionProgress(ref)

  // raw → eased door progress (0 closed, 1 fully open)
  const rawProgress  = clamp(p / 0.82, 0, 1)
  const doorProgress = ease(rawProgress)

  // Two doors slide sideways
  // Left goes left, Right goes right
  const slideDistance = 95 // % of width to slide away
  const leftX  = -(doorProgress * slideDistance)
  const rightX = (doorProgress * slideDistance)

  // Environment warmth
  const warmth  = ease(clamp(doorProgress*1.3,0,1))
  const glowOp  = doorProgress

  // Interior light spill
  const spillOp = clamp((doorProgress-0.05)*1.3,0,0.7)

  // Knob glow when door is still shut
  const knobGlow = rawProgress < 0.08

  // Progress bar
  const pctLabel = doorProgress < 0.05 ? 'SCROLL TO UNLOCK' :
                   doorProgress < 0.45 ? 'SLIDING OPEN...' :
                   doorProgress < 0.9  ? 'ALMOST IN…' : 'THE KITCHEN IS OPEN! ✦'

  // Enter banner
  const enterOp = clamp(remap(doorProgress,0.68,1,0,1),0,1)
  const enterY  = remap(enterOp,0,1,26,0)

  // Welcome mat
  const matScale = ease(clamp(remap(doorProgress,0.42,0.88,0,1),0,1))

  // BG gradient warmth
  const bgL = 11 + warmth*8
  const bgS = 8  + warmth*38

  return (
    <div ref={ref} style={{height:'220vh', position:'relative'}}>
      <div style={{
        position:'sticky', top:0, height:'100vh', overflow:'hidden',
        background:`linear-gradient(170deg,
          hsl(220,28%,${bgL}%) 0%,
          hsl(30,${bgS}%,${bgL+16}%) 100%)`,
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>

        {/* ── Ambient halo ── */}
        <div style={{
          position:'absolute', width:'min(600px,140vw)', height:'min(850px,95vh)',
          background:`radial-gradient(ellipse at center,
            rgba(255,180,40,${glowOp*0.35}) 0%, transparent 70%)`,
          filter:'blur(60px)', zIndex:0, pointerEvents:'none',
        }}/>

        {/* ── Light rays ── */}
        {spillOp > 0 && RAYS.map(r=>(
          <div key={r.id} style={{
            position:'absolute',
            width: r.width,
            height:'180vh',
            background:`linear-gradient(180deg,
              rgba(255,225,100,${spillOp*0.6}) 0%,
              rgba(255,170,50,${spillOp*0.2}) 45%,
              transparent 100%)`,
            transform:`rotate(${r.angle}deg)`,
            transformOrigin:'top center',
            top:'25%',
            filter:`blur(${r.blur}px)`,
            borderRadius:99,
            opacity:spillOp,
            zIndex:0,
            pointerEvents:'none',
          }}/>
        ))}

        {/* ── Floor glow ── */}
        <div style={{
          position:'absolute', bottom:'5%',
          width:'70vw', height:130,
          background:`radial-gradient(ellipse at center,
            rgba(255,210,80,${doorProgress*0.4}) 0%, transparent 75%)`,
          filter:'blur(25px)', zIndex:0, pointerEvents:'none',
        }}/>

        {/* ── Door scene wrapper ── */}
        <div style={{
          position:'relative',
          width:'min(320px,80vw)',
          height:'min(440px,70vh)',
          zIndex:2,
        }}>

          {/* Floor shadow */}
          <div style={{
            position:'absolute', bottom:-30, left:'2%', right:'2%', height:30,
            background:`radial-gradient(ellipse at center,
              rgba(0,0,0,${0.65-doorProgress*0.4}) 0%, transparent 80%)`,
            filter:'blur(10px)', zIndex:0,
          }}/>

          {/* Door frame outer */}
          <div style={{
            position:'absolute', inset:-20,
            background:'linear-gradient(145deg, #7e4e24, #462a0e)',
            borderRadius:16,
            boxShadow:`0 0 0 2px rgba(0,0,0,.7), 0 12px 50px rgba(0,0,0,.9),
              inset 0 1px 0 rgba(255,255,255,.08)`,
            zIndex:0,
          }}/>

          {/* Frame inner bevel */}
          <div style={{
            position:'absolute', inset:-8,
            borderRadius:12,
            border:'4px solid rgba(0,0,0,.55)',
            boxShadow:'inset 0 0 16px rgba(0,0,0,.5)',
            zIndex:0,
          }}/>

          {/* Transom */}
          <div style={{
            position:'absolute', top:-20, left:-20, right:-20, height:55,
            background:'linear-gradient(180deg,#8e5830,#6a3d1e)',
            borderBottom:'4px solid rgba(0,0,0,.6)',
            borderRadius:'12px 12px 0 0',
            display:'flex', alignItems:'center', justifyContent:'center',
            zIndex:10,
            boxShadow:'0 4px 15px rgba(0,0,0,.5)',
          }}>
            <span style={{
              fontFamily:'var(--font-d)',
              color:`hsl(45,${80+warmth*20}%,${65+warmth*15}%)`,
              fontSize:'1rem',
              letterSpacing:'0.15em',
              textShadow:`0 0 ${8+warmth*16}px rgba(255,200,60,${0.2+warmth*0.8}), 1.5px 1.5px 0 rgba(0,0,0,.7)`,
            }}>OPEN FOR BUSINESS</span>
          </div>

          {/* ── Interior (clipped by doors) ── */}
          <div style={{
            position:'absolute', inset:0,
            background:`radial-gradient(ellipse at 50% 55%,
              hsl(40,90%,${20+warmth*50}%) 0%,
              hsl(25,70%,${15+warmth*20}%) 55%,
              hsl(220,20%,8%) 100%)`,
            zIndex:1, overflow:'hidden',
            borderRadius: 4,
          }}>
            {/* Tile floor */}
            <div style={{
              position:'absolute', bottom:0, left:0, right:0, height:'45%',
              background:`repeating-linear-gradient(90deg,
                rgba(0,0,0,.2) 0px, rgba(0,0,0,.2) 1px, transparent 1px, transparent 32px
              ), repeating-linear-gradient(0deg,
                rgba(0,0,0,.2) 0px, rgba(0,0,0,.2) 1px, transparent 1px, transparent 32px
              ), hsl(30,40%,${15+warmth*18}%)`,
              opacity:Math.min(1,(doorProgress-.15)*3),
            }}/>

            {/* Steam */}
            {doorProgress>.25 && [25,40,55,75].map((x,i)=>(
              <div key={i} style={{
                position:'absolute', bottom:'35%', left:`${x}%`,
                width:12, height:60,
                background:`linear-gradient(0deg,rgba(255,225,150,${clamp((doorProgress-.25)*1.5,0,0.35)}) 0%,transparent 100%)`,
                filter:'blur(6px)', borderRadius:99,
                animation:`steamRise 2s ${i*.4}s infinite ease-in`,
              }}/>
            ))}

            {/* Sparkle */}
            {doorProgress>.32 && (
              <div style={{
                position:'absolute', inset:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                opacity:Math.min(1,(doorProgress-.32)*3),
                fontSize:'3rem',
                filter:`drop-shadow(0 0 ${warmth*22}px rgba(255,210,60,.9))`,
              }}>✨</div>
            )}
          </div>

          {/* ── Sliding Door Panels (Two Halves) ── */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            overflow: 'hidden', // Extra will be hidden
            zIndex: 3,
            borderRadius: 4,
          }}>
            {/* Left Half Door */}
            <div style={{
              flex: 1, height: '100%',
              background:`linear-gradient(155deg, #a86030 0%, #7a4520 40%, #5c3015 80%)`,
              borderRight:'1px solid rgba(0,0,0,.3)',
              transform: `translateX(${leftX}%)`,
              boxShadow:'inset -2px 0 12px rgba(0,0,0,.3)',
              display:'flex', flexDirection:'column', alignItems:'flex-end', padding:'25px 20px', gap:12,
            }}>
                <div style={{ width:24, height:24, background:'radial-gradient(circle at 35% 35%, #f0c870, #a07030, #603000)', borderRadius:'50%', border:'2px solid rgba(0,0,0,.5)', boxShadow: `0 2px 6px rgba(0,0,0,.5), 0 0 ${knobGlow?12:0}px rgba(255,200,80,0.8)`}} />
                <div style={{ width:10, height:60, background:'linear-gradient(180deg,#d8b060,#906820)', borderRadius:6, border:'1.5px solid rgba(0,0,0,.4)' }} />
                {/* Wood Details */}
                {[20, 50, 80].map(y => (
                  <div key={y} style={{ position:'absolute', top:`${y}%`, left:'15%', right:'5%', height:1, background:'rgba(0,0,0,.15)' }} />
                ))}
            </div>

            {/* Right Half Door */}
            <div style={{
              flex: 1, height: '100%',
              background:`linear-gradient(205deg, #a86030 0%, #7a4520 40%, #5c3015 80%)`,
              borderLeft:'1px solid rgba(0,0,0,.3)',
              transform: `translateX(${rightX}%)`,
              boxShadow:'inset 2px 0 12px rgba(0,0,0,.3)',
              display:'flex', flexDirection:'column', alignItems:'flex-start', padding:'25px 20px', gap:12,
            }}>
                <div style={{ width:24, height:24, background:'radial-gradient(circle at 35% 35%, #f0c870, #a07030, #603000)', borderRadius:'50%', border:'2px solid rgba(0,0,0,.5)', boxShadow: `0 2px 6px rgba(0,0,0,.5), 0 0 ${knobGlow?12:0}px rgba(255,200,80,0.8)`}} />
                <div style={{ width:10, height:60, background:'linear-gradient(180deg,#d8b060,#906820)', borderRadius:6, border:'1.5px solid rgba(0,0,0,.4)' }} />
                {/* Wood Details */}
                {[20, 50, 80].map(y => (
                  <div key={y} style={{ position:'absolute', top:`${y}%`, left:'5%', right:'15%', height:1, background:'rgba(0,0,0,.15)' }} />
                ))}
            </div>
          </div>

          {/* ── Center split leak (when almost closed) ── */}
          <div style={{
            position:'absolute', top:0, bottom:0, left:'50%', width:4,
            background:`linear-gradient(180deg, transparent, rgba(255,210,80,${(1-doorProgress)*0.75}), transparent)`,
            transform:'translateX(-50%)',
            zIndex: 6,
            filter:'blur(2px)',
            opacity: 1 - doorProgress * 1.5,
          }} />

          {/* Dust particles */}
          {PARTICLES.map(pt=>{
            const op = clamp((doorProgress-.1)*2,0,1)*pt.opacity
            if(op<0.01) return null
            const yOff = -(doorProgress*pt.speed*120)
            return (
              <div key={pt.id} style={{
                position:'absolute',
                left:`${pt.x}%`, top:`${pt.baseY+yOff}%`,
                width:pt.size, height:pt.size,
                borderRadius:'50%',
                background:`hsl(${pt.hue},90%,80%)`,
                opacity:op*(1-clamp((-yOff)/140,0,1)),
                transform:`translateX(${pt.drift*doorProgress}px)`,
                boxShadow:`0 0 ${pt.size*2.5}px hsl(${pt.hue},90%,75%)`,
                zIndex:4, pointerEvents:'none',
              }}/>
            )
          })}
        </div>

        {/* ── Welcome mat ── */}
        <div style={{
          position:'absolute', bottom:'7%',
          width:'min(220px,55vw)', height:28,
          background:'linear-gradient(90deg,#5c3010,#8a5020,#5c3010)',
          borderRadius:8, border:'2,5px solid rgba(0,0,0,.6)',
          display:'flex', alignItems:'center', justifyContent:'center',
          transform:`scaleX(${matScale}) scaleY(${matScale})`,
          opacity:matScale,
          zIndex:3,
          boxShadow:'0 6px 20px rgba(0,0,0,.6)',
        }}>
          <span style={{
            fontFamily:'var(--font-d)', fontSize:'.55rem',
            letterSpacing:'.18em', color:'rgba(255,230,140,.9)',
            textShadow:'0 1.5px 3px rgba(0,0,0,.8)',
          }}>WELCOME</span>
        </div>

        {/* ── Progress pill ── */}
        <div style={{
          position:'absolute', top:'10%', left:'50%',
          transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:10,
          zIndex:15,
        }}>
          <div style={{
            width:100, height:5, borderRadius:99,
            background:'rgba(255,255,255,.1)',
            border:'1px solid rgba(255,255,255,.08)',
            overflow:'hidden',
          }}>
            <div style={{
              height:'100%',
              width:`${doorProgress*100}%`,
              background:'linear-gradient(90deg,#f97316,#ef4444)',
              borderRadius:99,
              boxShadow:'0 0 10px rgba(249,115,22,.6)',
            }}/>
          </div>
          <span style={{
            fontFamily:'var(--font-d)', fontSize:'.65rem',
            letterSpacing:'.12em',
            color:`rgba(255,220,100,${Math.min(1,p*6)})`,
            textShadow:'0 0 8px rgba(0,0,0,0.8)'
          }}>{pctLabel}</span>
        </div>

        {/* ── Enter banner ── */}
        <div style={{
          position:'absolute', bottom:'18%',
          opacity:enterOp,
          transform:`translateY(${enterY}px)`,
          textAlign:'center', zIndex:10, pointerEvents:'none',
        }}>
          <p style={{
            color:`hsl(45,${80+warmth*20}%,${65+warmth*15}%)`,
            fontFamily:'var(--font-d)',
            fontSize:'1.4rem',
            textShadow:`0 0 ${10+warmth*25}px var(--orange), 0 3px 10px rgba(0,0,0,.95)`,
            background:'rgba(0,0,0,.65)',
            backdropFilter:'blur(10px)',
            borderRadius:40,
            padding:'12px 32px',
            border:`2.5px solid rgba(255,210,80,${0.25+warmth*0.4})`,
            boxShadow:`0 0 40px rgba(255,160,30,${warmth*.4}), inset 0 1px 0 rgba(255,255,255,.08)`,
          }}>
             The kitchen is ready 🔥
          </p>
        </div>

        <ScrollHint
          visible={p < .85}
          label={doorProgress < 0.5 ? 'Scroll to slide open' : 'Almost in…'}
        />
      </div>

      <style>{`
        @keyframes steamRise {
          0%   { transform:translateY(0)    scaleX(1);   opacity:0; }
          25%  { opacity:1; }
          70%  { transform:translateY(-75px) scaleX(1.8); opacity:.6; }
          100% { transform:translateY(-130px) scaleX(2.5); opacity:0; }
        }
      `}</style>
    </div>
  )
}
