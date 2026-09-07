import { site } from '@/content/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase sm:flex-row sm:justify-between md:px-10">
        <span>© {year} {site.name}</span>
        <span>Built with Next.js & Tailwind CSS</span>
        <a href="#top" className="transition-colors hover:text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
