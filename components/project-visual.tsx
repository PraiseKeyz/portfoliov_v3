import Image from 'next/image'

type ProjectVisualProps = {
  title: string
  image?: string
  seed: number
}

export function ProjectVisual({ title, image, seed }: ProjectVisualProps) {
  if (image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-border bg-surface">
        <Image src={image} alt={`${title} preview`} fill className="object-cover" />
      </div>
    )
  }

  const angle = (seed * 47) % 360

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-border bg-surface">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `conic-gradient(from ${angle}deg at 30% 20%, color-mix(in oklab, var(--color-primary) 35%, transparent), transparent 55%)`,
        }}
      />
      <div className="project-visual-grid absolute inset-0 opacity-[0.18]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/70 uppercase">
          {title}
        </span>
      </div>
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </div>
    </div>
  )
}
