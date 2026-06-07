import Link from 'next/link'
import type { Project } from '@/types/project'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] text-amber-400 uppercase tracking-[0.15em] font-semibold">{children}</span>
      <div className="flex-1 h-px bg-[#1a1a1a]" />
    </div>
  )
}

function CodeSnippet({ snippet }: { snippet: NonNullable<Project['codeSnippet']> }) {
  const variantClass: Record<string, string> = {
    accent: 'text-amber-400',
    dim: 'text-zinc-700',
    string: 'text-green-400',
    keyword: 'text-indigo-400',
    default: 'text-zinc-500',
  }
  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-md p-4 font-mono text-[11px] leading-[1.9] mt-4">
      <div className="text-zinc-700 mb-1">{`// ${snippet.filename}`}</div>
      {snippet.lines.map((line, i) => (
        <div key={i} className={variantClass[line.variant]}>
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">
        {/* Main content */}
        <div className="px-8 py-8 border-r border-[#141414] flex flex-col gap-8">
          <div>
            <SectionLabel>The Problem</SectionLabel>
            <p className="text-sm text-zinc-500 leading-[1.85]">{project.problem}</p>
          </div>

          <div>
            <SectionLabel>What I Built</SectionLabel>
            <ul className="flex flex-col gap-3">
              {project.builtPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-zinc-500 leading-relaxed">
                  <span className="text-amber-400 text-xs mt-0.5 flex-shrink-0">→</span>
                  {point}
                </li>
              ))}
            </ul>
            {project.codeSnippet && <CodeSnippet snippet={project.codeSnippet} />}
          </div>

          <div>
            <SectionLabel>Key Technical Decisions</SectionLabel>
            <p className="text-sm text-zinc-500 leading-[1.85]">{project.technicalDecisions}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="px-6 py-8 flex flex-col gap-6">
          {/* Links */}
          <div>
            <div className="text-[9px] text-zinc-700 uppercase tracking-wider mb-2">Links</div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-amber-400 border border-amber-400/20 bg-amber-400/5 px-3 py-2 rounded-md mb-2 hover:bg-amber-400/10 transition-colors"
              >
                ↗ View live app
              </a>
            )}
            <div className="flex items-center gap-2 text-xs text-zinc-600 border border-[#1a1a1a] px-3 py-2 rounded-md">
              {project.githubPrivate ? '⌥ GitHub (private)' : '⌥ GitHub'}
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <div className="text-[9px] text-zinc-700 uppercase tracking-wider mb-2">Outcomes</div>
            <div className="flex flex-col gap-2">
              {project.outcomes.map((o) => (
                <div key={o} className="flex gap-2 text-xs text-zinc-500 leading-relaxed">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">·</span>
                  {o}
                </div>
              ))}
            </div>
          </div>

          {/* Relevant for */}
          <div>
            <div className="text-[9px] text-zinc-700 uppercase tracking-wider mb-2">Relevant for</div>
            <p className="text-[11px] text-zinc-600 leading-relaxed">{project.relevantFor}</p>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between px-8 py-4 border-t border-[#141414] text-xs text-zinc-600">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="hover:text-zinc-400 transition-colors">
            ← {prev.name}
          </Link>
        ) : (
          <Link href="/#work" className="hover:text-zinc-400 transition-colors">
            ← Back to all work
          </Link>
        )}
        {next && (
          <Link href={`/work/${next.slug}`} className="hover:text-zinc-400 transition-colors">
            {next.name} →
          </Link>
        )}
      </div>
    </div>
  )
}
