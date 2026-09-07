import { Download } from 'lucide-react'

import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons'
import { Reveal } from '@/components/reveal'
import { contact, site, socials } from '@/content/site'

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  mail: null,
}

export function ContactSection() {
  return (
    <section id="contact" className="section-shell border-t border-border pt-24">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.1em] text-primary uppercase">04 / {contact.eyebrow}</p>

        <h2 className="mt-8 font-display text-5xl leading-[0.92] font-medium tracking-[-0.04em] text-foreground sm:text-7xl md:text-8xl">
          {contact.heading.map((line, index) => (
            <span key={line} className={index === 1 ? 'text-primary' : ''}>
              {line}
              <br />
            </span>
          ))}
        </h2>

        <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
          {contact.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 rounded-md bg-primary px-6 py-3.5 font-mono text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {site.email}
          </a>
          <a
            href={site.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3.5 font-mono text-xs tracking-wide text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Download className="size-3.5" />
            Download CV
          </a>
        </div>

        <div className="mt-10 flex items-center gap-5">
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
      </Reveal>
    </section>
  )
}
