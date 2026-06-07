import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllProjects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects'
import { ProjectHeader } from '@/components/ProjectHeader'
import { ProjectBody } from '@/components/ProjectBody'

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.name} — Kronops`,
    description: project.tagline,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <main>
      <ProjectHeader project={project} />
      <ProjectBody project={project} prev={prev} next={next} />
    </main>
  )
}
