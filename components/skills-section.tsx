import { Reveal } from '@/components/reveal'
import { SkillBrowserBuild } from '@/components/skills/skill-browser-build'
import { SkillCodeEditor } from '@/components/skills/skill-code-editor'
import { SkillDataFlow } from '@/components/skills/skill-data-flow'
import { SkillCollisionDock } from '@/components/skills/skill-collision-dock'
import { SkillPipeline } from '@/components/skills/skill-pipeline'
import { skills } from '@/content/site'
import type { SkillAnimation } from '@/content/site'

const animations: Record<SkillAnimation, () => React.JSX.Element> = {
  editor: SkillCodeEditor,
  browser: SkillBrowserBuild,
  dataflow: SkillDataFlow,
  pipeline: SkillPipeline,
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

      <div className="mt-14 flex flex-col gap-6">
        {skills.map((category, index) => {
          const Animation = animations[category.animation]
          const reversed = index % 2 === 1
          const isPipeline = category.animation === 'pipeline'

          return (
            <Reveal key={category.title} delay={index * 80}>
              <article className="grid grid-cols-1 items-stretch overflow-hidden rounded-[14px] border border-border bg-surface lg:grid-cols-2">
                <div
                  className={`flex min-h-[320px] items-center justify-center overflow-hidden ${isPipeline ? '' : 'bg-background/40 p-8'} ${reversed ? 'lg:order-2' : ''}`}
                >
                  <Animation />
                </div>

                <div className="relative h-full min-h-[320px]">
                  <div className="absolute inset-0">
                    <SkillCollisionDock items={category.items} />
                  </div>

                  <div className="relative p-8 pointer-events-none md:p-10">
                    <h3 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-4 font-mono text-[13px] leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
