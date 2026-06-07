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
    <div
      className={`rounded-lg p-5 border ${
        highlight
          ? 'border-amber-400/30 bg-amber-400/[0.06]'
          : 'border-[#1a1a1a] bg-surface'
      }`}
    >
      <div
        className={`text-[10px] font-mono uppercase tracking-[0.14em] mb-5 ${
          highlight ? 'text-amber-400' : 'text-zinc-600'
        }`}
      >
        {label}
      </div>
      <div className="text-3xl font-extrabold tracking-tight text-zinc-50 leading-none">
        {fmt(h)}
        <span className="text-sm font-normal text-zinc-500 ml-1.5">
          {hours === 1 ? 'hr' : 'hrs'}
        </span>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-700 mt-2 mb-4">
        of manual review
      </div>
      <div className="text-3xl font-extrabold tracking-tight text-amber-400 leading-none">
        ${fmt(m)}
      </div>
      <div className="text-[10px] font-mono text-zinc-600 mt-2 leading-snug">
        in clerk wages · {note}
      </div>
    </div>
  )
}

function Headline({ text }: { text: string }) {
  // Split on {emphasis} markers and render those segments in amber.
  const parts = text.split(/(\{[^}]*\})/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{') && p.endsWith('}') ? (
          <span key={i} className="text-amber-400">
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
    <section ref={ref} className="px-8 py-12 border-t border-b border-[#141414]">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] text-amber-400 uppercase tracking-[0.15em] font-semibold">
          The Math
        </span>
        <div className="flex-1 h-px bg-[#1a1a1a]" />
      </div>

      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-50 leading-[1.12] max-w-[18ch] mb-3">
        <Headline text={savings.headline} />
      </h2>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl mb-8">{savings.intro}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

      <p className="text-[11px] font-mono text-zinc-700 leading-relaxed mt-6 pt-4 border-t border-[#1a1a1a]">
        Assumes <span className="text-zinc-400">{minutesPerDoc} min</span> per document ×{' '}
        <span className="text-zinc-400">{docsPerDay} documents/day</span> at{' '}
        <span className="text-zinc-400">${ratePerHour}/hr</span>. That is{' '}
        <span className="text-zinc-400">{yearHours} hours</span> and{' '}
        <span className="text-zinc-400">${fmt(yearMoney)}</span> of manual review per clerk, every
        year — recovered in seconds. Scale by headcount.
      </p>
    </section>
  )
}
