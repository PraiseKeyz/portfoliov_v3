import { Code2, Layers, Server, TerminalSquare } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { skills } from '@/content/site'

const categoryIcons = {
  code: Code2,
  layers: Layers,
  server: Server,
  terminal: TerminalSquare,
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell">
      <Reveal>
        <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-end">
          <p className="font-mono text-xs tracking-[0.1em] text-primary uppercase">02 / Skills</p>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-muted-foreground sm:text-right">
            The languages and tools I reach for most.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((category, index) => {
          const Icon = categoryIcons[category.icon]
          return (
            <Reveal key={category.title} delay={index * 80}>
              <div className="h-full rounded-[10px] border border-border bg-surface p-6 transition-colors hover:border-primary/40">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-foreground">
                  {category.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[4px] border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
