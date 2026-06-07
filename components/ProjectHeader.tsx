import type { Project } from '@/types/project'

const statusStyles: Record<Project['status'], string> = {
  'live-stripe': 'text-green-400 bg-green-400/10 border-green-400/20',
  'live-vps': 'text-green-400 bg-green-400/10 border-green-400/20',
  building: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  client: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
}

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="border-b border-[#141414]">
      {/* Breadcrumb */}
      <div className="px-8 py-3 text-[11px] text-zinc-700 border-b border-[#0f0f0f]">
        <span>Work</span>
        <span className="mx-1.5 text-zinc-800">/</span>
        <span className="text-zinc-500">{project.name}</span>
      </div>

      {/* Header */}
      <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wide mb-4 ${statusStyles[project.status]}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {project.statusLabel}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50 leading-[1.1] mb-3">
            {project.name}
          </h1>
          <p className="text-[15px] text-zinc-500 leading-relaxed max-w-xl">{project.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          {[
            { label: 'Type', value: project.type },
            { label: 'Status', value: project.statusLabel, amber: true },
            { label: 'Built by', value: project.builtBy },
            { label: 'Timeline', value: project.timeline },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[9px] text-zinc-700 uppercase tracking-wider mb-0.5">{item.label}</div>
              <div className={`text-xs ${item.amber ? 'text-amber-400' : 'text-zinc-400'}`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stack row */}
      <div className="px-8 py-3 border-t border-[#141414] flex items-center gap-2 flex-wrap">
        <span className="text-[9px] text-zinc-700 uppercase tracking-wider mr-2">Stack</span>
        {project.stack.map((s) => (
          <span
            key={s}
            className={`text-[10px] px-2 py-0.5 border rounded font-mono ${
              project.accentStack.includes(s)
                ? 'text-amber-400 border-amber-400/20 bg-amber-400/5'
                : 'text-zinc-600 border-[#1f1f1f] bg-[#111]'
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
