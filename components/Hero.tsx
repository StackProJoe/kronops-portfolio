import Link from 'next/link'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid-tex" />
      <div className="hero-glow" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="avail-pill reveal">
            <span className="dot" /> Available for new projects
          </div>
          <div className="eyebrow reveal" data-d="1">
            <span className="tick" /> AI Automation Consulting
          </div>
          <h1 className="hero-h reveal" data-d="1">
            I find the <span className="amber">bottleneck.</span>
            <br />
            Then I eliminate it.
          </h1>
          <p className="hero-sub reveal" data-d="2">
            I go into businesses, map their workflows, and implement AI and automation that{' '}
            <b>saves real time and increases profit.</b> No fluff — just systems that work.
          </p>
          <div className="cta-row reveal" data-d="3">
            <Link href="/#contact" className="btn btn-primary">
              Work with me
            </Link>
            <Link href="/#work" className="btn btn-ghost">
              See what I&apos;ve built <span className="arr">↓</span>
            </Link>
          </div>
        </div>

        <div className="flow-wrap reveal" data-d="2">
          <div className="flow-card">
            <div className="flow-card-head">
              <div className="flow-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="flow-cap">
                <span className="a">~/</span>workflow.optimize()
              </div>
            </div>
            <svg
              viewBox="0 0 440 240"
              width="100%"
              className="flow-svg"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Diagram: tangled inputs squeezed through a bottleneck, then flowing cleanly out"
            >
              <defs>
                <linearGradient id="gIn" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#3f3f46" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#52525b" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="gOut" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              {/* input nodes (left, messy) */}
              <g fill="#1a1a1f" stroke="#2a2a30" strokeWidth="1">
                <circle cx="34" cy="48" r="9" />
                <circle cx="34" cy="96" r="9" />
                <circle cx="34" cy="144" r="9" />
                <circle cx="34" cy="192" r="9" />
              </g>

              {/* tangled input paths converging */}
              <g fill="none" stroke="url(#gIn)" strokeWidth="1.6">
                <path d="M43 48 C 120 48, 140 110, 205 120" />
                <path d="M43 96 C 120 96, 150 118, 205 120" />
                <path d="M43 144 C 120 144, 150 122, 205 120" />
                <path d="M43 192 C 120 192, 140 130, 205 120" />
              </g>

              {/* bottleneck node */}
              <circle cx="220" cy="120" r="22" fill="currentColor" fillOpacity="0.12" />
              <circle cx="220" cy="120" r="13" fill="currentColor" />
              <circle cx="216" cy="116" r="4.5" fill="#fff" fillOpacity="0.35" />
              <circle cx="220" cy="120" r="13" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" />

              {/* clean output paths */}
              <g fill="none" stroke="url(#gOut)" strokeWidth="2" strokeLinecap="round">
                <path d="M235 120 C 300 120, 320 60, 400 60" />
                <path d="M235 120 C 300 120, 320 120, 400 120" />
                <path d="M235 120 C 300 120, 320 180, 400 180" />
              </g>

              {/* output nodes (clean) */}
              <g fill="#0a0a0b" stroke="currentColor" strokeWidth="1.4">
                <circle cx="408" cy="60" r="8" />
                <circle cx="408" cy="120" r="8" />
                <circle cx="408" cy="180" r="8" />
              </g>

              {/* flowing pulses */}
              <circle r="3" fill="currentColor">
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M235 120 C 300 120, 320 60, 400 60" />
              </circle>
              <circle r="3" fill="currentColor">
                <animateMotion dur="2.2s" begin="0.7s" repeatCount="indefinite" path="M235 120 C 300 120, 320 120, 400 120" />
              </circle>
              <circle r="3" fill="currentColor">
                <animateMotion dur="2.2s" begin="1.4s" repeatCount="indefinite" path="M235 120 C 300 120, 320 180, 400 180" />
              </circle>
            </svg>
            <div className="flow-legend">
              <div className="li">
                <span className="sw" style={{ background: '#3f3f46' }} /> Tangled inputs
              </div>
              <div className="li">
                <span className="sw" style={{ background: 'var(--accent-deep)' }} /> The bottleneck
              </div>
              <div className="li">
                <span
                  className="sw"
                  style={{ background: 'rgba(var(--accent-rgb),0.4)', border: '1px solid var(--accent)' }}
                />{' '}
                Clean automated flow
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
