import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative flex items-start px-8 pt-20 pb-16 overflow-hidden border-b border-[#141414]">
      {/* Amber grid texture — right half only */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.5), transparent)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.5), transparent)',
        }}
      />

      <div className="relative z-10 max-w-2xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-6 bg-amber-400" />
          <span className="text-[11px] text-amber-400 tracking-[0.2em] uppercase">
            AI Automation Consulting
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-50 leading-[1.1] mb-5">
          I find the{' '}
          <span className="text-amber-400">bottleneck.</span>
          <br />
          Then I eliminate it.
        </h1>

        {/* Sub */}
        <p className="text-[15px] text-zinc-500 leading-relaxed max-w-md mb-8">
          I go into businesses, map their workflows, and implement AI and automation that saves real time and increases
          profit. No fluff — just systems that work.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="bg-amber-400 text-black text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-amber-300 transition-colors duration-150"
          >
            Work with me
          </Link>
          <Link
            href="/#work"
            className="text-sm text-zinc-500 border border-[#1f1f1f] px-6 py-2.5 rounded-md hover:text-zinc-300 hover:border-zinc-600 transition-colors duration-150"
          >
            See what I&apos;ve built ↓
          </Link>
        </div>
      </div>
    </section>
  )
}
