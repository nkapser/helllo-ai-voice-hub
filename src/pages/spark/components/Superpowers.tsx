import { Navigation, Calendar, Upload } from 'lucide-react'

const CARDS = [
  {
    icon:    Navigation,
    badge:   'On by default',
    badgeColor: 'rgba(96,165,250,0.2)',
    badgeBorder: 'rgba(96,165,250,0.4)',
    badgeText: 'var(--spark-ember)',
    accentBg: 'rgba(96,165,250,0.1)',
    accentBorder: 'rgba(96,165,250,0.25)',
    iconColor: 'var(--spark)',
    title: 'Guide visitors to the right page',
    body: "When someone asks about pricing, shipping, or contact — your assistant doesn't just answer. It offers to take them there, and keeps the conversation going after they land.",
    demo: (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--spark-border))]" style={{ background: 'rgba(241,245,249,0.6)' }}>
        <div className="p-3 flex flex-col gap-2">
          <div className="self-end rounded-xl rounded-br-sm px-3 py-1.5 text-[11px] spark-text-primary" style={{ background: 'rgba(241,245,249,0.9)', border: '1px solid hsl(var(--spark-border))', maxWidth: '85%' }}>
            How much does it cost?
          </div>
          <div className="self-start flex flex-col gap-1.5" style={{ maxWidth: '90%' }}>
            <div className="rounded-xl rounded-bl-sm px-3 py-1.5 text-[11px] spark-text-primary" style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.2)' }}>
              We offer plans from $49/mo. Want me to open your Pricing page?
            </div>
            <div className="flex gap-1.5">
              <div
                className="px-3 py-1 rounded-full text-[10px] font-medium cursor-pointer"
                style={{ background: 'rgba(96,165,250,0.2)', border: '1px solid rgba(96,165,250,0.4)', color: 'var(--spark-ember)' }}
              >
                Yes, take me there →
              </div>
              <div
                className="spark-chip px-3 py-1 rounded-full text-[10px] spark-text-subtle"
              >
                Tell me more
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon:    Calendar,
    badge:   'Paste a link',
    badgeColor: 'rgba(96,165,250,0.15)',
    badgeBorder: 'rgba(96,165,250,0.35)',
    badgeText: 'var(--spark-ember)',
    accentBg: 'rgba(96,165,250,0.1)',
    accentBorder: 'rgba(96,165,250,0.25)',
    iconColor: 'var(--spark-ember)',
    title: 'Turn chats into booked meetings',
    body: 'Drop in your Calendly link (or connect Google Calendar). Your assistant shares it naturally when someone is ready to talk.',
    demo: (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--spark-border))]" style={{ background: 'rgba(241,245,249,0.6)' }}>
        <div className="p-3">
          <div className="text-[10.5px] mb-2 spark-text-subtle">Booking link</div>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] spark-text-muted"
            style={{ background: 'rgba(241,245,249,0.9)', border: '1px solid rgba(96,165,250,0.3)' }}
          >
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--spark-ember)' }} />
            calendly.com/your-name/30min
          </div>
          <div className="mt-3 rounded-lg px-3 py-2 text-[11px] leading-relaxed spark-text-muted" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
            "I'd love to chat! Here's a link to book a 30-min call: 📅 Book with us"
          </div>
        </div>
      </div>
    ),
  },
  {
    icon:    Upload,
    badge:   'Drag & drop',
    badgeColor: 'rgba(147,197,253,0.2)',
    badgeBorder: 'rgba(147,197,253,0.35)',
    badgeText: 'var(--spark-glow)',
    accentBg: 'rgba(147,197,253,0.1)',
    accentBorder: 'rgba(147,197,253,0.25)',
    iconColor: 'var(--spark-glow)',
    title: "Answer questions your website doesn't cover",
    body: 'Upload FAQs, price lists, return policies — PDF, DOCX, CSV. Your assistant gets smarter without rewriting your site.',
    demo: (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--spark-border))]" style={{ background: 'rgba(241,245,249,0.6)' }}>
        <div className="p-3 flex flex-col gap-2">
          {['FAQ_2024.pdf', 'Pricing_Sheet.xlsx', 'Return_Policy.docx'].map((file, i) => (
            <div
              key={file}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid hsl(var(--spark-border))' }}
            >
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: ['rgba(239,68,68,0.2)', 'rgba(34,197,94,0.2)', 'rgba(59,130,246,0.2)'][i], color: ['#f87171', '#4ade80', '#60a5fa'][i] }}
              >
                {['PDF', 'XLS', 'DOC'][i]}
              </div>
              <span className="text-[11.5px] flex-1 spark-text-muted">{file}</span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--spark)' }} />
            </div>
          ))}
          <div
            className="flex items-center justify-center gap-2 py-2 rounded-lg mt-1 text-[11px]"
            style={{ border: '1px dashed rgba(96,165,250,0.35)', color: 'var(--spark-ember)' }}
          >
            <Upload className="w-3 h-3" /> Drop files here
          </div>
        </div>
      </div>
    ),
  },
]

export default function Superpowers() {
  return (
    <section id="superpowers" className="relative py-24">
      <div className="glow-divider" />

      {/* Subtle aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute"
          style={{
            width: 600, height: 400,
            background: 'radial-gradient(ellipse, rgba(96,165,250,0.09) 0%, transparent 70%)',
            top: '20%', left: '30%',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 mt-24">
        <div className="text-center mb-4 reveal">
          <span className="inline-block text-[12px] uppercase tracking-widest mb-4 font-medium" style={{ color: 'var(--spark-ember)' }}>
            Superpowers
          </span>
          <h2
            className="mb-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}
          >
            Not just a chatbot.
          </h2>
          <h2
            className="mb-5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}
          >
            <em className="gradient-text not-italic">An assistant that moves your business forward.</em>
          </h2>
          <p className="text-[15px] max-w-xl mx-auto spark-text-muted">
            Three capabilities every SMB website needs — two take 10 seconds to set up.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mt-14">
          {CARDS.map(({ icon: Icon, badge, badgeColor, badgeBorder, badgeText, accentBg, accentBorder, iconColor, title, body, demo }, i) => (
            <div
              key={title}
              className={`glass glass-hover rounded-2xl p-6 flex flex-col gap-5 reveal rd${i + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: iconColor }} />
                </div>
                <span
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{ background: badgeColor, border: `1px solid ${badgeBorder}`, color: badgeText }}
                >
                  {badge}
                </span>
              </div>

              <div>
                <h3 className="spark-text-primary font-semibold text-[15px] mb-2 leading-snug">{title}</h3>
                <p className="text-[13.5px] leading-relaxed spark-text-muted">{body}</p>
              </div>

              <div className="mt-auto">{demo}</div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-[13px] spark-text-subtle">
          All optional. Skip anything and still go live.
        </p>
      </div>
    </section>
  )
}
