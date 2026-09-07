import { Reveal } from '@/components/reveal'
import { about } from '@/content/site'

export function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <Reveal>
        <p className="border-t border-border pt-6 font-mono text-xs tracking-[0.1em] text-primary uppercase">
          03 / {about.eyebrow}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <Reveal>
          <h2 className="font-display text-4xl leading-[0.98] font-medium tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
            {about.heading.map((line, index) => (
              <span key={line} className={index === 1 ? 'text-primary' : ''}>
                {line}
                <br />
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="font-mono text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}

            <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3 lg:grid-cols-1">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
