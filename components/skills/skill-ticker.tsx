import { techIconMap } from '@/components/tech-icons'
import type { SkillItem } from '@/content/site'

export function SkillTicker({ items }: { items: SkillItem[] }) {
  const track = [...items, ...items]

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-10 items-center overflow-hidden border-t border-border bg-surface">
      <div className="skill-ticker-track flex items-center gap-8 px-6">
        {track.map((item, index) => {
          const Icon = techIconMap[item.icon] ?? techIconMap.generic
          return (
            <span
              key={`${item.name}-${index}`}
              className="flex items-center gap-2 font-mono text-[11px] whitespace-nowrap text-muted-foreground"
            >
              <Icon className="size-3.5 shrink-0 text-primary" />
              {item.name}
            </span>
          )
        })}
      </div>
    </div>
  )
}
