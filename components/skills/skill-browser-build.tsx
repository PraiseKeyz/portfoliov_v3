export function SkillBrowserBuild() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-sm overflow-hidden rounded-[10px] border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="ml-2 h-4 flex-1 rounded-sm bg-surface" />
        </div>
        <div className="grid grid-cols-4 gap-3 p-5">
          <div className="skill-block-in col-span-4 h-6 rounded-sm border border-primary/40 bg-primary/10" style={{ animationDelay: '0s' }} />
          <div className="skill-block-in col-span-1 h-24 rounded-sm border border-border bg-surface" style={{ animationDelay: '0.6s' }} />
          <div className="col-span-3 grid grid-rows-2 gap-3">
            <div className="skill-block-in h-full rounded-sm border border-border bg-surface" style={{ animationDelay: '1.2s' }} />
            <div className="skill-block-in h-full rounded-sm border border-border bg-surface" style={{ animationDelay: '1.8s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
