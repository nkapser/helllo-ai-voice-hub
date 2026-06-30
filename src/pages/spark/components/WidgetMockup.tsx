/**
 * WidgetMockup — realistic browser-chrome + Spark chat widget preview.
 * Pure presentational; no interactivity needed.
 */
export default function WidgetMockup() {
  return (
    <div className="relative w-full max-w-[480px]">
      {/* ── Outer glow ── */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(124,92,255,0.22) 0%, transparent 70%)',
          filter: 'blur(30px)',
          transform: 'scale(1.1)',
        }}
      />

      {/* ── Browser chrome ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-4 h-10"
          style={{ background: 'rgba(18,22,46,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          {/* Fake URL bar */}
          <div
            className="flex-1 flex items-center gap-2 rounded-md px-3 h-6"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(34,211,238,0.6)' }} />
            <span className="text-[10.5px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              yourwebsite.com
            </span>
          </div>
        </div>

        {/* ── Fake website content ── */}
        <div className="relative" style={{ background: '#0d1128', minHeight: 320 }}>
          {/* Header bar */}
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded" style={{ background: 'rgba(124,92,255,0.6)' }} />
              <div className="w-16 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <div className="flex items-center gap-3">
              {[40,36,44].map((w,i) => (
                <div key={i} className="h-2 rounded-full" style={{ width: w, background: 'rgba(255,255,255,0.12)' }} />
              ))}
              <div className="w-14 h-5 rounded-md" style={{ background: 'rgba(124,92,255,0.35)' }} />
            </div>
          </div>

          {/* Hero area */}
          <div className="px-5 pt-6 pb-4">
            <div className="w-2/3 h-6 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <div className="w-1/2 h-4 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="w-3/5 h-4 rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="w-24 h-7 rounded-lg" style={{ background: 'rgba(124,92,255,0.5)' }} />
          </div>

          {/* Content rows */}
          <div className="px-5 flex gap-3">
            {[1,2,3].map((i) => (
              <div key={i} className="flex-1 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-8 h-8 rounded-lg mb-2" style={{ background: 'rgba(124,92,255,0.25)' }} />
                <div className="w-full h-2 rounded-full mb-1.5" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="w-3/4 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }} />
              </div>
            ))}
          </div>

          {/* ── Spark Widget ── */}
          <div className="absolute bottom-4 right-4">
            {/* Chat popup */}
            <div
              className="mb-3 rounded-2xl overflow-hidden"
              style={{
                width: 240,
                background: 'rgba(13,17,40,0.97)',
                border: '1px solid rgba(124,92,255,0.3)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,255,0.15)',
              }}
            >
              {/* Widget header */}
              <div
                className="px-3.5 py-2.5 flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg,#7c5cff,#22d3ee)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✦</div>
                <div>
                  <div className="text-white text-[11px] font-medium leading-tight">Your Assistant</div>
                  <div className="text-white/60 text-[9px] leading-tight">by Spark · yourwebsite.com</div>
                </div>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>

              {/* Messages */}
              <div className="px-3 py-3 flex flex-col gap-2">
                <div
                  className="rounded-xl rounded-tl-sm px-3 py-2 text-[11px] leading-relaxed"
                  style={{ background: 'rgba(124,92,255,0.18)', color: 'rgba(255,255,255,0.85)' }}
                >
                  Hi! Ask me anything about pricing, features, or how to get in touch.
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['What do you offer?', 'Pricing?', 'Contact us'].map((chip) => (
                    <div
                      key={chip}
                      className="px-2 py-1 rounded-full text-[9.5px]"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(124,92,255,0.35)',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {chip}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launcher FAB */}
            <div className="flex justify-end">
              <div
                className="widget-pulse w-11 h-11 rounded-full flex items-center justify-center cursor-pointer select-none"
                style={{
                  background: 'linear-gradient(135deg,#7c5cff,#22d3ee)',
                  boxShadow: '0 4px 20px rgba(124,92,255,0.5)',
                }}
              >
                <span className="text-white text-base">✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
