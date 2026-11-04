import type { Project } from '@/types/project'

const projects: Project[] = [
  {
    slug: 'swiftdocpro',
    name: 'SwiftDocPro',
    tagline: 'Reads scanned legal property documents word for word, pulls out the details a clerk needs, and cites the page for every one.',
    cardDescription: 'Document platform for property appraisal and records offices. OCR transcript, cited field extraction, legal description plotting, and a chat that answers only from the document.',
    type: 'B2G SaaS',
    status: 'deployed',
    statusLabel: 'Live · Open for pilots',
    stack: ['Python', 'FastAPI', 'Tesseract OCR', 'Postgres', 'Cloudflare Workers', 'Docker'],
    accentStack: ['Tesseract OCR', 'Cloudflare Workers'],
    liveUrl: 'https://swiftdocpro.com',
    githubPrivate: true,
    timeline: '2025–present',
    builtBy: 'Solo',
    problem: 'Appraisal and records clerks key details from scanned recorded documents by hand. A condo declaration can run past 140 pages, and one misread bearing or parcel number ends up in the official record. General AI tools make this worse: they can reword text or fill in a digit, and nobody can tell. The job needs a tool that never guesses and always shows its source.',
    builtPoints: [
      'Upload a scanned or recorded PDF. If the office already holds that document, the existing copy opens and nothing is processed twice',
      'Tesseract OCR with image cleanup produces the transcript word for word. Poorly scanned pages are flagged, not hidden',
      'The AI reads only the OCR text to extract parcels, ownership shares, shared facilities and more, each with a page number',
      'Legal descriptions are plotted into a labeled drawing with closure error, area and perimeter, so a misread leg stands out',
      'Ask the document: answers come only from its text, and every answer links to the page that proves it',
      'Each office is isolated at the database level. Roles, admin tools and a full activity log of sign-ins, downloads and questions',
    ],
    codeSnippet: {
      filename: 'pipeline.py',
      lines: [
        { text: '# the model never writes the transcript', variant: 'accent' },
        { text: 'text = tesseract_ocr(page)', variant: 'default' },
        { text: 'fields = extract(text)', variant: 'default' },
        { text: 'for f in fields:', variant: 'keyword' },
        { text: '    assert f.page and f.confidence', variant: 'default' },
        { text: '# every field cites its page', variant: 'dim' },
      ],
    },
    technicalDecisions: 'One rule drives the design: the model never produces the transcript. OCR does, because OCR cannot invent text and a vision model can silently drop a digit. The model only reads that text, and every field it returns must carry a page citation and a confidence score. The model was picked by a measured bake-off on real documents, not by preference. Jobs run from a Postgres queue on a VPS, the site runs on Cloudflare Workers.',
    outcomes: [
      'Live at swiftdocpro.com and accepting pilot offices',
      'Tested on real Miami-Dade recorded instruments, including a 148-page master declaration',
      'Every extracted field and answer cites its source page',
      'Each office kept separate by the database, every action logged',
    ],
    relevantFor: 'Any office that keys data from scanned documents into a system of record: appraisal, recording, permitting, title, legal. The same pipeline (OCR, cited extraction, human check) works for any document where a wrong digit costs money.',
    savings: {
      ratePerHour: 24,
      minutesPerDoc: 60,
      docsPerDay: 2,
      headline: 'An hour a document. {Twice a day.} Gone.',
      intro:
        "Reviewing a recorded legal document by hand takes about an hour. Estimate for a clerk on $24/hr handling two a day, if SwiftDocPro does the reading and the clerk only checks the cited answers. Here's the manual labour it could remove, per clerk.",
    },
    featured: true,
    order: 1,
  },
  {
    slug: 'noctlore',
    name: 'Noctlore',
    tagline: 'AI-powered dream analysis. Users log their dreams, Claude interprets them. Built and shipped solo.',
    cardDescription: 'AI-powered dream analysis app. Users log dreams, Claude interprets them. Subscription product with Supabase auth and Stripe billing — built and shipped solo.',
    type: 'Consumer SaaS',
    status: 'live-stripe',
    statusLabel: 'Live · Stripe active',
    stack: ['Next.js', 'Claude API', 'Supabase', 'Stripe', 'TypeScript', 'Vercel'],
    accentStack: ['Next.js', 'Claude API'],
    liveUrl: 'https://noctlore.com',
    githubPrivate: true,
    timeline: '2025–present',
    builtBy: 'Solo',
    problem: 'Dream journaling apps existed but none actually analyzed the content. Users wanted more than a blank text field — they wanted to understand what their dreams meant. The gap: no one had shipped a clean AI layer on top of a journaling experience.',
    builtPoints: [
      'Full-stack Next.js app with Supabase auth — email/password and OAuth',
      'Dream entry flow — text input → prompt engineering → Claude Sonnet analysis',
      'Subscription billing via Stripe — live keys, webhook handling, gated features',
      'Dream history with pattern tracking across sessions',
      'Deployed to Vercel with analytics baked in from day one',
    ],
    codeSnippet: {
      filename: 'dream-analysis.ts',
      lines: [
        { text: '// core analysis call', variant: 'accent' },
        { text: 'const response = await anthropic.messages.create({', variant: 'default' },
        { text: "  model: 'claude-sonnet-4-6',", variant: 'string' },
        { text: '  max_tokens: 1024,', variant: 'default' },
        { text: "  messages: [{ role: 'user', content: prompt }]", variant: 'default' },
        { text: '});', variant: 'default' },
        { text: '// prompt includes entry + user history', variant: 'dim' },
      ],
    },
    technicalDecisions: 'Used server-side API calls only — the Anthropic key never touches the client. Supabase Row Level Security locks every query to the authenticated user. Stripe webhooks handle subscription state changes asynchronously so billing never blocks the UX.',
    outcomes: [
      'Stripe live — accepting real payments',
      'Full auth + billing shipped solo',
      'Claude API integrated with prompt engineering',
      'Running in production on Vercel',
    ],
    relevantFor: 'Businesses wanting to add AI features to existing workflows. End-to-end: API integration, auth, billing, deployment — not just a demo.',
    featured: false,
    order: 2,
  },
  {
    slug: 'bodytrack',
    name: 'BodyTrack',
    tagline: 'Free weight loss tracking app supporting study participants. Self-hosted, containerized, zero downtime.',
    cardDescription: 'Free weight loss tracking app supporting study participants. Node.js + Postgres, self-hosted on a VPS with Docker and Caddy.',
    type: 'Free app',
    status: 'live-vps',
    statusLabel: 'Live on VPS',
    stack: ['Node.js', 'PostgreSQL', 'Docker', 'Caddy'],
    accentStack: ['Docker', 'Caddy'],
    githubPrivate: false,
    timeline: '2024–present',
    builtBy: 'Solo',
    problem: 'Weight loss study participants needed a simple way to log daily check-ins — weight, meals, notes. The requirement was free and reliable, with no third-party data sharing. That meant self-hosted.',
    builtPoints: [
      'Node.js REST API handling user entries and auth',
      'PostgreSQL database in its own container with persistent volume',
      "Caddy reverse proxy handling HTTPS automatically via ACME/Let's Encrypt",
      'Full Docker Compose setup — one command to deploy or restart the entire stack',
      'Health check endpoints so monitoring knows when a container goes down',
    ],
    codeSnippet: {
      filename: 'docker-compose.yml',
      lines: [
        { text: 'services:', variant: 'accent' },
        { text: '  app:', variant: 'default' },
        { text: '    image: bodytrack_app', variant: 'string' },
        { text: '    ports: ["3000:3000"]', variant: 'default' },
        { text: '  db:', variant: 'default' },
        { text: '    image: postgres:15', variant: 'string' },
        { text: '  caddy:', variant: 'default' },
        { text: '    image: caddy:2', variant: 'string' },
      ],
    },
    technicalDecisions: 'Docker Compose was the right call for a solo-maintained VPS app — the entire stack (app + db + proxy) starts with one command and survives reboots. Caddy over Nginx because it handles TLS automatically with no cert renewal scripts to maintain.',
    outcomes: [
      'Running in production on VPS',
      'Automatic HTTPS via Caddy — no manual cert renewal',
      'One-command deploys with Docker Compose',
      'PostgreSQL data persisted across container restarts',
    ],
    relevantFor: 'Businesses that need a lightweight internal tool or data collection app without cloud vendor lock-in. This stack handles small-to-medium workloads at a fraction of managed hosting costs.',
    featured: false,
    order: 3,
  },
  {
    slug: 'acwdi',
    name: 'ACWDI',
    tagline: 'Client website for AC Wholesalers — built, deployed, and handed off.',
    cardDescription: 'Built and deployed a client website for an AC wholesale business. Cloudflare Pages, automated deploy pipeline from GitHub.',
    type: 'Client work',
    status: 'client',
    statusLabel: 'Client work',
    stack: ['Cloudflare Pages', 'HTML/CSS/JS', 'GitHub CI'],
    accentStack: ['Cloudflare Pages'],
    liveUrl: 'https://acwdi.com',
    githubPrivate: false,
    timeline: '2024',
    builtBy: 'Solo',
    problem: 'AC Wholesalers needed a professional web presence fast — no CMS complexity, no maintenance overhead, just a clean site that loads instantly and deploys automatically when updated.',
    builtPoints: [
      'Static site — HTML, CSS, vanilla JS. No framework overhead for a marketing site.',
      'Hosted on Cloudflare Pages — global CDN, free tier, sub-second load times',
      'GitHub → Cloudflare auto-deploy pipeline — client pushes code, site updates in seconds',
      'Custom domain wired up with Cloudflare DNS',
      'Built and delivered in under a week',
    ],
    technicalDecisions: 'No framework for a static marketing site — adding React or Next.js would be pure overhead. Cloudflare Pages was chosen over Netlify/Vercel because the client already used Cloudflare for DNS, so the integration was seamless.',
    outcomes: [
      'Site live at acwdi.com',
      'Automated deploy pipeline — no manual FTP or uploads',
      'Page load under 1s on mobile via Cloudflare CDN',
      'Client can update content via GitHub',
    ],
    relevantFor: 'Small businesses needing a fast, low-maintenance web presence. This shows I can scope, build, and hand off a project cleanly — not just build for myself.',
    featured: false,
    order: 4,
  },
]

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const sorted = getAllProjects()
  const index = sorted.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  }
}
