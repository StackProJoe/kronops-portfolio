const stats = [
  { count: 4, suffix: '+', label: 'Products shipped' },
  { count: 3, label: 'Live in production' },
  { text: 'AI', amber: true, label: 'Claude · n8n · Supabase' },
  { count: 1, label: 'Client delivered' },
]

export function StatsStrip() {
  return (
    <div className="stats">
      <div className="stats-grid" id="stats">
        {stats.map((s, i) => (
          <div key={s.label} className="stat reveal" data-d={i === 0 ? undefined : String(i)}>
            {s.text ? (
              <div className="num amber">{s.text}</div>
            ) : (
              <div className="num" data-count={s.count} data-suffix={s.suffix}>
                0
              </div>
            )}
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
