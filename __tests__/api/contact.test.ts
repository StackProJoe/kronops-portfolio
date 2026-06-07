/**
 * @jest-environment node
 */
import { POST } from '@/app/api/contact/route'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}))

process.env.RESEND_API_KEY = 'test-key'
process.env.CONTACT_EMAIL = 'joel@test.com'

function makeRequest(body: object) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/contact', () => {
  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ email: 'a@b.com', problem: 'help' }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ name: 'Joel', problem: 'help' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when problem is missing', async () => {
    const res = await POST(makeRequest({ name: 'Joel', email: 'a@b.com' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid email format', async () => {
    const res = await POST(makeRequest({ name: 'Joel', email: 'notanemail', problem: 'help' }))
    expect(res.status).toBe(400)
  })

  it('returns 200 with all required fields', async () => {
    const res = await POST(
      makeRequest({ name: 'Joel', email: 'joel@test.com', problem: 'I need automation help' })
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.success).toBe(true)
  })
})
