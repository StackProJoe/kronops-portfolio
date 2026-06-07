import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ProjectCard'

export function ProjectGrid() {
  const projects = getAllProjects()
  if (projects.length < 4) return null
  const [featured, ...rest] = projects
  const count = String(projects.length).padStart(2, '0')

  return (
    <section className="block" id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="sec-label" style={{ marginBottom: 14 }}>
              Selected Work
            </div>
            <h2 className="sec-title">
              Shipped, not <span className="amber">slideware.</span>
            </h2>
          </div>
          <div className="sec-count">{count} / projects</div>
        </div>

        <div className="work-grid">
          <ProjectCard project={featured} featured />
          <ProjectCard project={rest[0]} />
          <ProjectCard project={rest[1]} delay={1} />
          <ProjectCard project={rest[2]} wide />
        </div>
      </div>
    </section>
  )
}
