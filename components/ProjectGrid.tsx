import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ProjectCard'

export function ProjectGrid() {
  const projects = getAllProjects()
  if (projects.length < 4) return null
  const [featured, ...rest] = projects

  return (
    <section id="work" className="px-8 py-10">
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-[11px] text-zinc-600 tracking-[0.15em] uppercase">Selected Work</span>
        <span className="text-[11px] text-zinc-700">{projects.length} projects</span>
      </div>

      {/* Grid with 1px separators via gap + bg color on container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#141414] border border-[#141414] rounded-lg overflow-hidden">
        {/* Featured: full-width */}
        <ProjectCard project={featured} featured />

        {/* Middle two: side by side */}
        <ProjectCard project={rest[0]} />
        <ProjectCard project={rest[1]} />

        {/* ACWDI: full-width */}
        <ProjectCard project={rest[2]} wide />
      </div>
    </section>
  )
}
