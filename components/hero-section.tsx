import { ArrowDown, Download } from 'lucide-react'

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons'
import { CodeRain } from '@/components/code-rain'
import { hero, site, socials } from '@/content/site'

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  mail: null,
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-border px-6 pt-32 pb-20 md:px-10"
    >
      <CodeRain />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="mb-6 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.1em] text-primary uppercase">
          <span className="status-dot" />
          {hero.eyebrow}
        </p>

        <h1 className="max-w-4xl font-display text-[13vw] leading-[0.9] font-medium tracking-[-0.04em] text-foreground sm:text-[9vw] md:text-[6.4vw]">
          {hero.headingLines.map((line) => (
            <span key={line} className="block">
              {line === hero.accentWord ? (
                <em className="text-primary not-italic">{line}</em>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-xs font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View my work
          </a>
          <a
            href={site.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-mono text-xs tracking-wide text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Download className="size-3.5" />
            Download CV
          </a>
        </div>

        <div className="mt-12 flex items-center gap-5">
          {socials
            .filter((s) => s.icon !== 'mail')
            .map((social) => {
              const Icon = socialIcons[social.icon]
              if (!Icon) return null
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="size-[18px]" />
                </a>
              )
            })}
        </div>
      </div>

      <a
        href="#work"
        className="absolute bottom-10 left-6 z-10 hidden items-center gap-3 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-primary md:flex md:left-10"
      >
        Scroll to explore
        <ArrowDown className="size-3.5 animate-bounce" />
      </a>

      <p className="absolute right-6 bottom-10 z-10 hidden font-mono text-[10px] tracking-[0.1em] text-muted-foreground md:block md:right-10">
        © {site.initials} / 01—04
      </p>
    </section>
  )
}
