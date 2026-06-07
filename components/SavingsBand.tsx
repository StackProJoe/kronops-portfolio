'use client'

import { useEffect, useRef, useState } from 'react'
import type { SavingsModel } from '@/types/project'

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return val
}

function SavingsCard({
  label,
  hours,
  money,
  note,
  highlight,
  active,
}: {
  label: string
  hours: number
  money: number
  note: string
  highlight?: boolean
  active: boolean
}) {
  const h = useCountUp(hours, active)
  const m = useCountUp(money, active)
  return (
    <div className={`sv-card${highlight ? ' hl' : ''}`}>
      <div className="sv-period">{label}</div>
      <div className="sv-hours">
        {fmt(h)}
        <span className="u">{hours === 1 ? 'hr' : 'hrs'}</span>
      </div>
      <div className="sv-hlabel">of manual review</div>
      <div className="sv-money">${fmt(m)}</div>
      <div className="sv-note">in clerk wages · {note}</div>
    </div>
  )
}

function Headline({ text }: { text: string }) {
  const parts = text.split(/(\{[^}]*\})/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{') && p.endsWith('}') ? (
          <span key={i} className="amber">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export function SavingsBand({ savings }: { savings: SavingsModel }) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const { ratePerHour, minutesPerDoc, docsPerDay } = savings
  const hoursPerDay = (minutesPerDoc * docsPerDay) / 60

  const periods = [
    { label: 'Per day', days: 1, note: `${docsPerDay} docs reviewed` },
    { label: 'Per week', days: 5, note: '5 working days' },
    { label: 'Per month', days: 22, note: '~22 working days' },
    { label: 'Per year', days: 260, note: '260 working days', highlight: true },
  ]

  const yearHours = Math.round(hoursPerDay * 260)
  const yearMoney = yearHours * ratePerHour

  return (
    <section ref={ref} className="savings">
      <div className="savings-tex" />
      <div className="savings-inner">
        <div className="case-label">
          <span className="txt">The Math</span>
          <span className="ln" />
        </div>

        <div className="savings-head">
          <h2>
            <Headline text={savings.headline} />
          </h2>
          <p>{savings.intro}</p>
        </div>

        <div className="savings-grid">
          {periods.map((p) => {
            const hours = Math.round(hoursPerDay * p.days)
            return (
              <SavingsCard
                key={p.label}
                label={p.label}
                hours={hours}
                money={hours * ratePerHour}
                note={p.note}
                highlight={p.highlight}
                active={active}
              />
            )
          })}
        </div>

        <p className="savings-foot">
          Assumes <b>{minutesPerDoc} min</b> per document × <b>{docsPerDay} documents/day</b> at{' '}
          <b>${ratePerHour}/hr</b>. That is <b>{yearHours} hours</b> and <b>${fmt(yearMoney)}</b> of manual review per
          clerk, every year — recovered in seconds. Scale by headcount.
        </p>
      </div>
    </section>
  )
}
