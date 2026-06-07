import { ContactForm } from '@/components/ContactForm'

const steps = [
  { n: '1', title: 'Send the form', desc: 'Tell me the problem in plain terms. No jargon needed.' },
  { n: '2', title: 'I respond within 24h', desc: 'With a few questions or a short call link.' },
  { n: '3', title: 'We scope it', desc: "I'll tell you what's possible, what it takes, and what it costs." },
]

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-[#141414]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — context */}
        <div className="px-8 py-12 border-b md:border-b-0 md:border-r border-[#141414] flex flex-col justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-5 bg-amber-400" />
              <span className="text-[10px] text-amber-400 tracking-[0.2em] uppercase">Let&apos;s talk</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-50 leading-[1.15] mb-4">
              Tell me what&apos;s{' '}
              <span className="text-amber-400">slowing you down.</span>
            </h2>
            <p className="text-sm text-zinc-500 leading-[1.8] max-w-sm mb-8">
              I work with small businesses and founders who have a bottleneck they haven&apos;t been able to fix. If you
              think AI or automation might help — let&apos;s find out.
            </p>
            <div className="flex flex-col gap-4">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[10px] text-amber-400 font-semibold flex-shrink-0 mt-0.5">
                    {s.n}
                  </div>
                  <div className="text-xs text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300 font-medium">{s.title}</span> — {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects
          </div>
        </div>

        {/* Right — form */}
        <div className="px-8 py-12">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
