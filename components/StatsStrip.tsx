const stats = [
  { value: '4+', label: 'Products shipped' },
  { value: '3', label: 'Live in production' },
  { value: 'AI', label: 'Claude · n8n · Supabase', amber: true },
  { value: '1', label: 'Client delivered' },
]

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#141414]">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-8 py-5 ${i < stats.length - 1 ? 'border-r border-[#141414]' : ''}`}
        >
          <div className={`text-2xl font-bold mb-1 ${stat.amber ? 'text-amber-400' : 'text-zinc-50'}`}>
            {stat.value}
          </div>
          <div className="text-[11px] text-zinc-600 uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
