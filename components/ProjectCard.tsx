import Link from 'next/link'
import type { Project } from '@/types/project'

const badgeClass: Record<Project['status'], string> = {
  'live-stripe': 'green',
  'live-vps': 'green',
  deployed: 'green',
  building: 'amber',
  client: 'indigo',
}

const codeVariant: Record<string, string> = {
  accent: 'c-accent',
  string: 'c-str',
  dim: 'c-dim',
  keyword: 'c-accent',
  default: 'c-def',
}

function yearlySavings(p: Project): string | null {
  if (!p.savings) return null
  const { minutesPerDoc, docsPerDay, ratePerHour } = p.savings
  const value = ((minutesPerDoc * docsPerDay) / 60) * 260 * ratePerHour
  return value.toLocaleString('en-US')
}

function CodeBlock({ snippet }: { snippet: NonNullable<Project['codeSnippet']> }) {
  return (
    <div className="code">
      <div className="fn">{`// ${snippet.filename}`}</div>
      {snippet.lines.map((line, i) => (
        <div key={i} className={codeVariant[line.variant] ?? 'c-def'}>
          {line.text}
        </div>
      ))}
    </div>
  )
}

function CardInner({ project }: { project: Project }) {
  const saved = yearlySavings(project)
  return (
    <>
      <span className={`badge ${badgeClass[project.status]}`}>
        <span className="bd" /> {project.statusLabel}
      </span>
      <h3>{project.name}</h3>
      <p className="desc">{project.cardDescription}</p>
      <div className="chips">
        {project.stack.map((s) => (
          <span key={s} className={`chip${project.accentStack.includes(s) ? ' acc' : ''}`}>
            {s}
          </span>
        ))}
      </div>
      {saved && (
        <div className="save-tag">
          <span className="amt">${saved}/yr</span>
          <span className="lab">manual review saved · per clerk</span>
        </div>
      )}
      <span className="view">View case study →</span>
    </>
  )
}

export function ProjectCard({
  project,
  featured = false,
  wide = false,
  delay,
}: {
  project: Project
  featured?: boolean
  wide?: boolean
  delay?: number
}) {
  const cls = ['card', 'reveal', featured ? 'featured span2' : '', wide ? 'span2' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <Link href={`/work/${project.slug}`} className={cls} data-d={delay ? String(delay) : undefined}>
      {featured ? (
        <>
          <div>
            <CardInner project={project} />
          </div>
          {project.codeSnippet && <CodeBlock snippet={project.codeSnippet} />}
        </>
      ) : (
        <CardInner project={project} />
      )}
    </Link>
  )
}
