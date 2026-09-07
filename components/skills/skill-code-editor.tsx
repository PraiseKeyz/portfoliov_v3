const LINES = [
  'const skill = "typescript"',
  'function ship(idea) {',
  '  return build(idea)',
]

export function SkillCodeEditor() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-sm overflow-hidden rounded-[10px] border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
        </div>
        <div className="space-y-2.5 px-5 py-6 font-mono text-[13px] leading-relaxed">
          {LINES.map((line, index) => (
            <div key={line} className="skill-type-line" style={{ animationDelay: `${index * 2}s` }}>
              <span className="whitespace-pre text-foreground">{line}</span>
            </div>
          ))}
          <span className="skill-cursor-blink inline-block h-[1em] w-[7px] translate-y-[2px] bg-primary align-middle" />
        </div>
      </div>
    </div>
  )
}
