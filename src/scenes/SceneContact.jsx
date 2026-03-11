import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { CHEF } from '../data/index'
import emailjs from '@emailjs/browser'

export default function SceneContact() {
  const wrapRef = useRef()
  useReveal(wrapRef)

  const [form, setForm] = useState({ name: '', email: '', subject: '', msg: '' })
  const [sent, setSent]  = useState(false)
  const [sending, setSending] = useState(false)
  const [num]            = useState(() => Math.floor(Math.random() * 900) + 100)

  const update = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const submit = async () => {
    if (!form.name || !form.email) return

    try {
      setSending(true)
      await emailjs.send(
        'service_7p2vgql',
        'template_flmi53l',
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || 'New order from portfolio',
          message:    form.msg    || '(no message)',
          to_email:   'panigrahivallabh@gmail.com',
        },
        'Gcd5WbWlTHha80xm1'
      )
      setSent(true)
      setTimeout(() => setSent(false), 4000)
      setForm({ name: '', email: '', subject: '', msg: '' })
      setSending(false)
    } catch (error) {
      console.error('EmailJS error:', error)
      alert('Oops! Order failed to send. Please email me directly at panigrahivallabh@gmail.com')
      setSending(false)
    }
  }

  const socials = [
    { emoji: '🐙', label: 'GitHub',   href: CHEF.socials.github },
    { emoji: '💼', label: 'LinkedIn', href: CHEF.socials.linkedin },
    { emoji: '🐦', label: 'Twitter',  href: CHEF.socials.twitter },
    { emoji: '📧', label: 'Email',    href: `mailto:${CHEF.socials.email}` },
  ]

  return (
    <div ref={wrapRef} style={{ background: '#0d0d0d', position: 'relative' }}>
      <div style={{ height: 60, background: 'linear-gradient(180deg,#1a0e06,#0d0d0d)' }} />

      <div className="tile-floor" style={{ padding: '60px clamp(16px,5vw,60px) 0' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--dark)', textShadow: '3px 3px 0 var(--yellow)' }}>
            📋 Leave Your Order
          </div>
          <p style={{ color: '#777', fontWeight: 700, marginTop: 8 }}>
            Before you head out — tell me what you're cooking up
          </p>
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Social links */}
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 32 }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="card"
                style={{ 
                  padding: '16px 8px', 
                  textAlign: 'center', 
                  textDecoration: 'none', 
                  color: 'var(--dark)', 
                  cursor: 'none', 
                  transition: 'all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px) rotate(-3deg) scale(1.05)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  e.currentTarget.style.borderColor = 'var(--orange)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <div style={{ fontSize: '1.8rem' }}>{s.emoji}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '.9rem', marginTop: 4 }}>{s.label}</div>
              </a>
            ))}
          </div>

          {/* Ticket form */}
          <div className="reveal" style={{ background: 'white', border: '4px solid var(--dark)', borderRadius: 8, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            {/* header */}
            <div style={{
              background: '#7a3f22', padding: '18px 28px',
              borderBottom: '4px dashed var(--dark)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'var(--yellow)', textShadow: '2px 2px 0 var(--dark)' }}>
                🎫 Order Ticket
              </span>
              <span style={{ background: 'var(--yellow)', border: '2px solid var(--dark)', borderRadius: 8, padding: '3px 12px', fontFamily: 'var(--font-d)', fontSize: '1rem' }}>
                #{num}
              </span>
            </div>
            <div style={{ padding: 28 }}>
              {[
                { k: 'name',    label: '👤 Your Name',    type: 'text',  ph: 'Gordon Ramsay' },
                { k: 'email',   label: '📧 Email',        type: 'email', ph: 'chef@kitchen.com' },
                { k: 'subject', label: '📌 Subject',      type: 'text',  ph: "I'd like to hire you!" },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 900, fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 5 }}>{f.label}</label>
                  <input
                    type={f.type} placeholder={f.ph} value={form[f.k]} onChange={update(f.k)}
                    style={{ width: '100%', border: '3px solid var(--dark)', borderRadius: 10, padding: '9px 13px', fontFamily: 'var(--font-b)', fontSize: '.95rem', fontWeight: 700, background: 'var(--cream)', outline: 'none', cursor: 'none' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--orange)'; e.target.style.boxShadow = '3px 3px 0 var(--orange)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'var(--dark)';   e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontWeight: 900, fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 5 }}>💬 Your Order</label>
                <textarea
                  placeholder="I need a full-stack app with extra TypeScript on the side, delivered by next month..."
                  value={form.msg} onChange={update('msg')}
                  style={{ width: '100%', minHeight: 100, border: '3px solid var(--dark)', borderRadius: 10, padding: '9px 13px', fontFamily: 'var(--font-b)', fontSize: '.95rem', fontWeight: 700, background: 'var(--cream)', outline: 'none', resize: 'vertical', cursor: 'none' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--orange)'; e.target.style.boxShadow = '3px 3px 0 var(--orange)'; }}
                  onBlur={e  => { e.target.style.borderColor = 'var(--dark)';   e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <button
                onClick={submit}
                disabled={sending}
                className={`btn ${sent ? 'btn-green' : 'btn-orange'}`}
                style={{ width: '100%', fontSize: '1.1rem', borderRadius: 12, opacity: sending ? 0.7 : 1 }}
              >
                {sending ? '⏳ Sending...' : sent ? '✅ Order received!' : '🚀 Send to Kitchen!'}
              </button>
              <div style={{ height: 18, marginTop: 20, background: 'repeating-linear-gradient(90deg,var(--cream) 0 10px,transparent 10px 20px)', borderTop: '3px dashed var(--dark)' }} />
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: 16, color: '#aaa', fontWeight: 700, fontSize: '.82rem' }}>
            ⏱️ Avg. response: under 24h · Always freshly prepared
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0d0d0d', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12, animation: 'wiggle 3s ease-in-out infinite' }}>👨‍🍳</div>
        <style>{`@keyframes wiggle{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}`}</style>
        <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'var(--yellow)', marginBottom: 6 }}>
          Thanks for the tour!
        </div>
        <p style={{ color: 'rgba(255,255,255,.4)', fontWeight: 700, fontSize: '.85rem', marginBottom: 20 }}>
          Built with React + Vite · Seasoned with ❤️ and 🌶️
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn btn-orange"
          style={{ fontSize: '.9rem', padding: '10px 24px' }}
        >
          ↑ Back to the entrance
        </button>
      </div>
    </div>
  )
}
