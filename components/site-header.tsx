'use client'

import { useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'

import { nav, site } from '@/content/site'

const REVEAL_THRESHOLD = 90
const SCROLL_DELTA = 4

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)

      if (currentY < REVEAL_THRESHOLD) {
        setHidden(false)
      } else if (currentY > lastScrollY.current + SCROLL_DELTA) {
        setHidden(true)
      } else if (currentY < lastScrollY.current - SCROLL_DELTA) {
        setHidden(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 px-4 transition-transform duration-300 ease-in-out md:top-6 md:px-6 ${hidden ? '-translate-y-[150%]' : 'translate-y-0'}`}
    >
      <div
        className={`mx-auto flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-border bg-surface/60 px-5 py-3 backdrop-blur-lg transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/20' : 'shadow-md shadow-black/10'}`}
      >
        <a href="#top" className="shrink-0 font-mono text-sm tracking-tight text-foreground">
          <span className="text-primary">{site.initials}</span>
          <span className="text-muted-foreground"> / portfolio</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={site.resumeUrl}
          download
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-xs font-medium tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <Download className="size-3.5" />
          Resume
        </a>
      </div>
    </header>
  )
}
