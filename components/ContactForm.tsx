'use client'

import { useState } from 'react'

const INQUIRY_TYPES = ['AI integration', 'Workflow automation', 'Custom build', 'Not sure yet']

interface FormState {
  name: string
  email: string
  type: string
  business: string
  problem: string
}

const EMPTY: FormState = { name: '', email: '', type: '', business: '', problem: '' }

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm(EMPTY)
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 gap-3">
        <div className="text-2xl text-amber-400">✓</div>
        <p className="text-sm text-zinc-50 font-semibold">Message sent.</p>
        <p className="text-xs text-zinc-500">I&apos;ll reply within 24 hours.</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-[#0d0d0d] border border-[#1f1f1f] rounded-md px-3 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-amber-400/40 transition-colors duration-150'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-zinc-600 uppercase tracking-wider mb-1.5">
            Name <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[10px] text-zinc-600 uppercase tracking-wider mb-1.5">
            Email <span className="text-amber-400">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] text-zinc-600 uppercase tracking-wider mb-1.5">
          What do you need?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {INQUIRY_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set('type', form.type === t ? '' : t)}
              className={`text-[11px] px-3 py-2 border rounded-md text-left transition-colors duration-150 ${
                form.type === t
                  ? 'border-amber-400/40 text-amber-400 bg-amber-400/[0.06]'
                  : 'border-[#1f1f1f] text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[10px] text-zinc-600 uppercase tracking-wider mb-1.5">
          Business / company
          <span className="normal-case text-zinc-700 ml-1 tracking-normal">— helps me prep</span>
        </label>
        <input
          type="text"
          value={form.business}
          onChange={(e) => set('business', e.target.value)}
          placeholder="Optional"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-[10px] text-zinc-600 uppercase tracking-wider mb-1.5">
          Describe the problem <span className="text-amber-400">*</span>
        </label>
        <textarea
          required
          value={form.problem}
          onChange={(e) => set('problem', e.target.value)}
          rows={4}
          placeholder="What's the task you're doing manually 10x a day? What's the process you wish was faster?"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-amber-400 text-black text-sm font-bold py-3 rounded-md hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
      >
        {status === 'loading' ? 'Sending...' : 'Send message →'}
      </button>

      <p className="text-[11px] text-zinc-700 text-center">
        No spam. No sales sequence. Just a real reply.
      </p>
    </form>
  )
}
