import Link from 'next/link'
import type { Project } from '@/types/project'

const statusStyles: Record<Project['status'], string> = {
  'live-stripe': 'text-green-400 bg-green-400/10 border-green-400/20',
  'live-vps': 'text-green-400 bg-green-400/10 border-green-400/20',
  building: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  client: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
}

function StatusBadge({ status, label }: { status: Project['status']; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wide mb-3 ${statusStyles[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

function StackChips({ stack, accentStack }: { stack: string[]; accentStack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {stack.map((s) => (
        <span
          key={s}
          className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
            accentStack.includes(s)
              ? 'text-amber-400 border-amber-400/20 bg-amber-400/5'
              : 'text-zinc-600 border-[#1f1f1f] bg-[#111]'
          }`}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function CodePreview({ snippet }: { snippet: NonNullable<Project['codeSnippet']> }) {
  const variantClass: Record<string, string> = {
    accent: 'text-amber-400',
    dim: 'text-zinc-700',
    string: 'text-green-400',
    keyword: 'text-indigo-400',
    default: 'text-zinc-500',
  }
  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-md p-4 font-mono text-[11px] leading-[1.9] hidden md:block">
      <div className="text-zinc-700 mb-1">{`// ${snippet.filename}`}</div>
      {snippet.lines.map((line, i) => (
        <div key={i} className={variantClass[line.variant]}>
          {line.text}
        </div>
      ))}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  featured?: boolean
  wide?: boolean
}

export function ProjectCard({ project, featured = false, wide = false }: ProjectCardProps) {
  const colSpan = (featured || wide) ? 'col-span-1 md:col-span-2' : 'col-span-1'

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`${colSpan} group block bg-surface hover:bg-elevated transition-colors duration-150 p-6 ${
        featured ? 'grid grid-cols-1 md:grid-cols-2 gap-6 items-center' : ''
      }`}
    >
      <div>
        <StatusBadge status={project.status} label={project.statusLabel} />
        <h3 className="text-[17px] font-bold text-zinc-50 tracking-tight mb-1.5">{project.name}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-3">{project.cardDescription}</p>
        <StackChips stack={project.stack} accentStack={project.accentStack} />
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400 mt-4 group-hover:gap-2.5 transition-all duration-150">
          View case study <span>→</span>
        </div>
      </div>
      {featured && project.codeSnippet && (
        <CodePreview snippet={project.codeSnippet} />
      )}
    </Link>
  )
}
