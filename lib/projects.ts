import type { Project } from '@/types/project'

const projects: Project[] = [
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
    featured: true,
    order: 1,
  },
  {
    slug: 'swiftdocpro',
    name: 'SwiftDocPro',
    tagline: 'Realty SaaS — upload a legal property document, get plain-English analysis in seconds.',
    cardDescription: 'SaaS for realtors — upload a legal property document, get a plain-English analysis in seconds. n8n backend, Cloudflare front.',
    type: 'B2B SaaS',
    status: 'building',
    statusLabel: 'In development',
    stack: ['Cloudflare Pages', 'n8n', 'Stripe', 'GitHub CI'],
    accentStack: ['n8n'],
    githubPrivate: false,
    timeline: '2025–present',
    builtBy: 'Solo',
    problem: 'Realtors and cadastralists spend hours manually reviewing property legal documents. The content is dense, technical, and repetitive. The opportunity: an AI layer that reads the document and surfaces what actually matters.',
    builtPoints: [
      'Frontend on Cloudflare Pages — auto-deploys from GitHub on every push',
      'Document upload flow — PDF/image → n8n workflow → AI analysis pipeline',
      'n8n backend on VPS — handles document processing and AI calls',
      'Stripe sandbox wired up — ready to go live once user testing completes',
      'Webhook-driven architecture — frontend stays thin and fast',
    ],
    codeSnippet: {
      filename: 'analyze-document.js',
      lines: [
        { text: '// n8n webhook trigger', variant: 'accent' },
        { text: 'const response = await fetch(', variant: 'default' },
        { text: '  process.env.N8N_WEBHOOK_URL,', variant: 'string' },
        { text: '  { method: "POST", body: formData }', variant: 'default' },
        { text: ');', variant: 'default' },
        { text: 'const { analysis } = await response.json();', variant: 'dim' },
      ],
    },
    technicalDecisions: 'Chose n8n as the backend automation layer — it handles the document processing pipeline visually and makes it easy to swap AI models or add steps without redeploying. Cloudflare Pages keeps the frontend at the edge with zero server maintenance.',
    outcomes: [
      'Full document analysis pipeline operational',
      'Stripe sandbox integrated and tested',
      'Deploy chain: GitHub → Cloudflare automated',
      'n8n backend live on VPS',
    ],
    relevantFor: 'Any business processing high volumes of structured documents. This stack — webhook trigger + n8n pipeline + AI analysis — ports directly to invoices, contracts, applications, and reports.',
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
