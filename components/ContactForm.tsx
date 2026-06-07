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
      <div className="form-success">
        <div className="check">✓</div>
        <h4>Got it — talk soon.</h4>
        <p>I&apos;ll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Jane Doe"
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="jane@company.com"
        />
      </div>

      <div className="field">
        <label>What do you need?</label>
        <div className="type-grid">
          {INQUIRY_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set('type', form.type === t ? '' : t)}
              className={`type-btn${form.type === t ? ' on' : ''}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="business">
          Business / company<span className="opt">— helps me prep</span>
        </label>
        <input
          id="business"
          type="text"
          value={form.business}
          onChange={(e) => set('business', e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div className="field">
        <label htmlFor="problem">What&apos;s slowing you down?</label>
        <textarea
          id="problem"
          required
          rows={4}
          value={form.problem}
          onChange={(e) => set('problem', e.target.value)}
          placeholder="Describe the bottleneck — the manual task, the slow process, the thing that eats your week."
        />
      </div>

      {status === 'error' && <div className="field-err">{errorMsg}</div>}

      <button type="submit" disabled={status === 'loading'} className="btn btn-primary submit-btn">
        {status === 'loading' ? 'Sending…' : 'Send it over →'}
      </button>

      <p className="form-note">No spam. No sales sequence. Just a real reply.</p>
    </form>
  )
}
