import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { StatsStrip } from '@/components/StatsStrip'
import { ProjectGrid } from '@/components/ProjectGrid'
import { AboutStrip } from '@/components/AboutStrip'
import { ContactSection } from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'Kronops — AI Automation Consulting',
  description:
    'I go into businesses, find bottlenecks, and implement AI and automation that saves real time and increases profit.',
  openGraph: {
    title: 'Kronops — AI Automation Consulting',
    description: 'I find the bottleneck. Then I eliminate it.',
    url: 'https://kronops.com',
    siteName: 'Kronops',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <ProjectGrid />
      <AboutStrip />
      <ContactSection />
    </main>
  )
}
