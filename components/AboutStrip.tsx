const bullets = [
  'Miami-based — available remotely',
  'Next.js · Node.js · n8n · Claude API',
  'Available for consulting projects',
]

export function AboutStrip() {
  return (
    <section id="about" className="flex flex-col md:flex-row gap-10 md:gap-16 px-8 py-10 border-t border-[#141414]">
      <div className="flex-1">
        <div className="text-[11px] text-amber-400 tracking-[0.15em] uppercase mb-3">About</div>
        <p className="text-sm text-zinc-500 leading-[1.8] max-w-md">
          I&apos;m Joel Gomez — I build things and ship them. Indie developer, solo founder, AI consultant. My
          background is hands-on and trades-adjacent. I bring that same directness to software: no fluff, no
          committees, just results.
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-center">
        {bullets.map((b) => (
          <div key={b} className="flex items-center gap-2.5 text-xs text-zinc-600">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 flex-shrink-0" />
            {b}
          </div>
        ))}
      </div>
    </section>
  )
}
