export interface CodeLine {
  text: string
  variant: 'accent' | 'dim' | 'string' | 'keyword' | 'default'
}

export interface Project {
  slug: string
  name: string
  tagline: string
  cardDescription: string
  type: string
  status: 'live-stripe' | 'building' | 'live-vps' | 'client'
  statusLabel: string
  stack: string[]
  accentStack: string[]
  liveUrl?: string
  githubPrivate: boolean
  timeline: string
  builtBy: string
  problem: string
  builtPoints: string[]
  codeSnippet?: {
    filename: string
    lines: CodeLine[]
  }
  technicalDecisions: string
  outcomes: string[]
  relevantFor: string
  featured: boolean
  order: number
}
