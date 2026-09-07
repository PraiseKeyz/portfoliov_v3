const NODES = [
  { label: 'UI', delay: '0s' },
  { label: 'API', delay: '2.4s' },
  { label: 'DB', delay: '4.9s' },
]

export function SkillDataFlow() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative w-full max-w-sm px-6 py-16">
        <div className="absolute top-1/2 right-6 left-6 h-px -translate-y-1/2 bg-border" />
        <div className="skill-node-pulse absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
        <div className="relative flex items-center justify-between">
          {NODES.map((node) => (
            <div
              key={node.label}
              className="skill-node-highlight relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background font-mono text-[10px] text-muted-foreground"
              style={{ animationDelay: node.delay }}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
