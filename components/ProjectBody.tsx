import Link from 'next/link'
import type { Project } from '@/types/project'
import { SavingsBand } from '@/components/SavingsBand'

const codeVariant: Record<string, string> = {
  accent: 'c-accent',
  string: 'c-str',
  dim: 'c-dim',
  keyword: 'c-accent',
  default: 'c-def',
}

function CaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="case-label">
      <span className="txt">{children}</span>
      <span className="ln" />
    </div>
  )
}

function CodeBlock({ snippet }: { snippet: NonNullable<Project['codeSnippet']> }) {
  return (
    <div className="code" style={{ marginTop: 22 }}>
      <div className="fn">{`// ${snippet.filename}`}</div>
      {snippet.lines.map((line, i) => (
        <div key={i} className={codeVariant[line.variant] ?? 'c-def'}>
          {line.text}
        </div>
      ))}
    </div>
  )
}

export function ProjectBody({
  project,
  prev,
  next,
}: {
  project: Project
  prev: Project | null
  next: Project | null
}) {
  return (
    <>
      <div className="body-grid">
        <div className="main-col">
          <section className="reveal">
            <CaseLabel>The Problem</CaseLabel>
            <p className="prose">{project.problem}</p>
          </section>

          <section className="reveal">
            <CaseLabel>What I Built</CaseLabel>
            <div className="built-list">
              {project.builtPoints.map((point) => (
                <div key={point} className="built-item">
                  <span className="ar">→</span> {point}
                </div>
              ))}
            </div>
            {project.codeSnippet && <CodeBlock snippet={project.codeSnippet} />}
          </section>

          <section className="reveal">
            <CaseLabel>Key Technical Decisions</CaseLabel>
            <p className="prose">{project.technicalDecisions}</p>
          </section>
        </div>

        <aside className="side-col">
          <div className="side-block reveal">
            <div className="side-h">Links</div>
            {project.liveUrl && (
              <a className="link-btn live" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                ↗ Visit live site
              </a>
            )}
            <div className="link-btn gh">
              {project.githubPrivate ? '⌥ GitHub · private' : '⌥ GitHub · available on request'}
            </div>
          </div>

          <div className="side-block reveal" data-d="1">
            <div className="side-h">Outcomes</div>
            {project.outcomes.map((o) => (
              <div key={o} className="outcome">
                <span className="dot">·</span> {o}
              </div>
            ))}
          </div>

          <div className="side-block reveal" data-d="2">
            <div className="side-h">Relevant for</div>
            <p className="relevant">{project.relevantFor}</p>
          </div>
        </aside>
      </div>

      {project.savings && <SavingsBand savings={project.savings} />}

      <section className="cta-strip">
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2>
            Have a workflow that needs <span className="amber">this kind of system?</span>
          </h2>
          <p>If you want something built the same way — end to end, shipped, in production — let&apos;s talk.</p>
          <Link href="/#contact" className="btn btn-primary">
            Work with me →
          </Link>
        </div>
      </section>

      <div className="pn">
        {prev ? (
          <Link href={`/work/${prev.slug}`}>← {prev.name}</Link>
        ) : (
          <Link href="/#work">← All work</Link>
        )}
        {next && <Link href={`/work/${next.slug}`}>{next.name} →</Link>}
      </div>
    </>
  )
}
