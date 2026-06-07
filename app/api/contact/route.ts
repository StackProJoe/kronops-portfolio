import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, problem, type, business } = body

  if (!name || !email || !problem) {
    return Response.json(
      { error: 'Name, email, and problem description are required.' },
      { status: 400 }
    )
  }

  if (!EMAIL_REGEX.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Kronops Contact <contact@kronops.com>',
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `New inquiry${type ? ` — ${type}` : ''} from ${name}`,
    html: `
      <h2 style="font-family:sans-serif">New contact submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${type ? `<p><strong>Type:</strong> ${type}</p>` : ''}
      ${business ? `<p><strong>Business:</strong> ${business}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${problem}</p>
    `,
  })

  if (error) {
    return Response.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }

  return Response.json({ success: true })
}
