import Link from 'next/link'
import type { Project } from '@/types/project'

const badgeClass: Record<Project['status'], string> = {
  'live-stripe': 'green',
  'live-vps': 'green',
  deployed: 'green',
  building: 'amber',
  client: 'indigo',
}

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <>
      <div className="crumb">
        <div className="crumb-inner">
          <Link href="/#work">Work</Link>
          <span className="sep">/</span>
          <span className="cur">{project.name}</span>
        </div>
      </div>

      <header className="ph">
        <div className="ph-glow" />
        <div className="ph-tex" />
        <div className="ph-inner">
          <div className="reveal">
            <span className={`badge ${badgeClass[project.status]}`}>
              <span className="bd" /> {project.statusLabel}
            </span>
            <h1 className="ph-title">{project.name}</h1>
            <p className="ph-tag">{project.tagline}</p>
          </div>
          <div className="meta reveal" data-d="1">
            <div className="meta-row">
              <span className="meta-k">Type</span>
              <span className="meta-v">{project.type}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Status</span>
              <span className="meta-v amber">{project.statusLabel}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Built by</span>
              <span className="meta-v">{project.builtBy}</span>
            </div>
            <div className="meta-row">
              <span className="meta-k">Timeline</span>
              <span className="meta-v">{project.timeline}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="stack-bar">
        <div className="stack-inner">
          <span className="lab">Stack</span>
          {project.stack.map((s) => (
            <span key={s} className={`chip${project.accentStack.includes(s) ? ' acc' : ''}`}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
