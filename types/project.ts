export interface CodeLine {
  text: string
  variant: 'accent' | 'dim' | 'string' | 'keyword' | 'default'
}

export interface SavingsModel {
  ratePerHour: number
  minutesPerDoc: number
  docsPerDay: number
  /** Wrap the emphasized phrase in {braces}, e.g. "An hour a document. {Twice a day.} Gone." */
  headline: string
  intro: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  cardDescription: string
  type: string
  status: 'live-stripe' | 'building' | 'live-vps' | 'deployed' | 'client'
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
  savings?: SavingsModel
  featured: boolean
  order: number
}
