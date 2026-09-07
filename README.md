# Praise Adebayo — Portfolio

A personal portfolio site built with Next.js, TypeScript, and Tailwind CSS. Dark, monospace-driven theme with a single amber accent, an animated terminal "boot" intro, a full-width code-rain background, a floating pill navigation header, and Lenis-powered smooth scrolling.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev/) for icons
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth/inertia scrolling
- shadcn-style UI primitives (`components/ui`)

## Getting started

This project uses `pnpm`.

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
pnpm build   # production build
pnpm start   # run the production build
pnpm lint    # lint
```

## Editing content

All of the site's copy lives in one place: **[content/site.ts](content/site.ts)**. Components import from it and map over it — there's no text hardcoded in the components themselves. To update the site, edit this file only:

| Export | Controls |
|---|---|
| `site` | Name, initials, role, location, email, availability line, resume URL |
| `nav` | Header nav links |
| `socials` | GitHub / LinkedIn / X / email links (header, hero, contact section) |
| `hero` | Hero eyebrow, headline lines, accent word, description |
| `bootSequence`, `bootWindowTitle` | The terminal boot-intro script (prompts, commands, output lines) |
| `skills` | Skill categories and the items listed under each |
| `projects` | Project cards — title, year, description, tags, links, optional image |
| `about` | About section heading, paragraphs, quick facts |
| `contact` | Contact section heading and description |

### Things to swap in before shipping

- **Resume**: `site.resumeUrl` points to `/resume.pdf` — add the actual file to `public/resume.pdf`.
- **Social links**: `socials` currently has placeholder URLs (`github.com/yourusername`, etc.) — update with real profile links.
- **Project links/images**: each entry in `projects` has placeholder `liveHref`/`repoHref` (`#`). Add an `image` path (e.g. `/projects/morrow.png`) to a project to replace its generated placeholder cover with a real screenshot.

## Project structure

```
app/
  layout.tsx        # fonts, metadata
  page.tsx           # composes the page from components
  globals.css        # design tokens, theme, one-off effects (code rain, scrollbar, etc.)
content/
  site.ts            # all site copy + typed content shape (see above)
components/
  app-shell.tsx       # boot-sequence gate + Lenis smooth-scroll setup
  boot-sequence.tsx   # terminal intro animation
  site-header.tsx     # floating pill nav, hide-on-scroll-down/show-on-scroll-up
  hero-section.tsx    # hero copy + code-rain background
  code-rain.tsx       # looping background code columns
  projects-section.tsx, project-visual.tsx
  skills-section.tsx
  about-section.tsx
  contact-section.tsx
  site-footer.tsx
  reveal.tsx          # scroll-triggered fade-in wrapper
  custom-cursor.tsx
  icons.tsx           # hand-drawn brand icons (GitHub, LinkedIn, X)
```

## Notes on behavior

- The boot intro plays once per browser tab (via `sessionStorage`) and is skipped entirely for visitors with `prefers-reduced-motion` enabled. Click, press any key, or hit "Skip intro" to jump past it.
- The header hides on scroll-down and reappears on scroll-up (past a small threshold near the top, it always stays visible).
- Section anchor links (`#work`, `#skills`, etc.) smooth-scroll via Lenis with an offset so content clears the floating header.
