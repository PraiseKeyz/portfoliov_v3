import { ExternalLink } from 'lucide-react'

import { GithubIcon } from '@/components/icons'
import { ProjectVisual } from '@/components/project-visual'
import { Reveal } from '@/components/reveal'
import { projects } from '@/content/site'

export function ProjectsSection() {
  return (
    <section id="work" className="section-shell">
      <Reveal>
        <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-end">
          <p className="font-mono text-xs tracking-[0.1em] text-primary uppercase">01 / Selected work</p>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-muted-foreground sm:text-right">
            A few things I’ve built recently.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 90}>
            <article className="group h-full rounded-[12px] border border-border bg-surface p-5 transition-colors hover:border-primary/40">
              <ProjectVisual title={project.title} image={project.image} seed={index + 1} />

              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">{project.year}</p>
                </div>
                <div className="flex items-center gap-3 pt-1.5">
                  {project.repoHref && (
                    <a
                      href={project.repoHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} source code`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <GithubIcon className="size-[18px]" />
                    </a>
                  )}
                  {project.liveHref && (
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live site`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="size-[18px]" />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-3 font-mono text-[13px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[4px] border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
