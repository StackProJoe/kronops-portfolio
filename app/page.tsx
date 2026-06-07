import { Hero } from '@/components/Hero'
import { StatsStrip } from '@/components/StatsStrip'
import { ProjectGrid } from '@/components/ProjectGrid'
import { AboutStrip } from '@/components/AboutStrip'
import { ContactSection } from '@/components/ContactSection'

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
