import { ContactForm } from '@/components/ContactForm'

const steps = [
  { n: '1', title: 'Send the form', desc: 'tell me the problem in plain terms. No jargon needed.' },
  { n: '2', title: 'I respond within 24h', desc: 'with a few questions or a short call link.' },
  { n: '3', title: 'We scope it', desc: "I'll tell you what's possible, what it takes, and what it costs." },
]

export function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left reveal">
            <div className="eyebrow">
              <span className="tick" /> Let&apos;s talk
            </div>
            <h2>
              Tell me what&apos;s <span className="amber">slowing you down.</span>
            </h2>
            <p className="contact-p">
              I work with small businesses and founders who have a bottleneck they haven&apos;t been able to fix. If you
              think AI or automation might help — let&apos;s find out.
            </p>
            <div className="steps">
              {steps.map((s) => (
                <div key={s.n} className="step">
                  <span className="n">{s.n}</span>
                  <span className="t">
                    <b>{s.title}</b> — {s.desc}
                  </span>
                </div>
              ))}
            </div>
            <div className="avail-tag">
              <span className="dot" /> Available for new projects
            </div>
          </div>

          <div className="contact-right reveal" data-d="1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
