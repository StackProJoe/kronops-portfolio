const facts = [
  { text: 'Miami-based — available remotely', k: 'Location' },
  { text: 'Next.js · Node.js · n8n · Claude API', k: 'Stack' },
  { text: 'Solo — scope, build, hand off', k: 'Model' },
  { text: 'Available for consulting', k: 'Status' },
]

export function AboutStrip() {
  return (
    <section className="block" id="about" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="about">
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="tick" /> About
            </div>
            <p className="about-lead">
              Indie developer, solo founder, AI consultant. I build things and{' '}
              <span className="amber">ship them</span> — no committees, no fluff.
            </p>
            <p className="about-body">
              My background is hands-on and trades-adjacent, and I bring that same directness to software. I go into a
              business, find what&apos;s actually slowing it down, and build the system that fixes it — end to end. API
              integration, auth, billing, deployment. Not just a demo.
            </p>
            <div className="about-name">
              — <b>Joel Gomez</b> · Founder, Kronops
            </div>
          </div>
          <div className="reveal" data-d="1">
            <div className="fact-list">
              {facts.map((f) => (
                <div key={f.k} className="fact">
                  <span className="ic" /> {f.text} <span className="k">{f.k}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
