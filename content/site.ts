export type NavLink = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'x' | 'mail'
}

export type SkillCategory = {
  title: string
  icon: 'code' | 'server' | 'layers' | 'terminal'
  items: string[]
}

export type Project = {
  id: string
  title: string
  year: string
  description: string
  tags: string[]
  image?: string
  liveHref?: string
  repoHref?: string
  featured?: boolean
}

export const site = {
  name: 'Praise Adebayo',
  initials: 'PA',
  role: 'Full-Stack Software Engineer',
  location: 'Lagos, Nigeria · Remote',
  email: 'praiseoluwatobilobaadebayo@gmail.com',
  availability: 'Available for new opportunities',
  resumeUrl: '/resume.pdf',
  tagline: 'I design and build software that feels as good as it works.',
  description:
    "A full-stack engineer who cares about the details most people skip — load times, empty states, the last 10% of polish. I turn ambiguous ideas into products people enjoy using.",
}

export const nav: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/yourusername', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
  { label: 'X (Twitter)', href: 'https://x.com/yourusername', icon: 'x' },
  { label: 'Email', href: 'mailto:praiseoluwatobilobaadebayo@gmail.com', icon: 'mail' },
]

export const hero = {
  eyebrow: site.availability,
  headingLines: ['Building', 'thoughtful', 'software.'],
  accentWord: 'thoughtful',
  description:
    'I’m Praise — a full-stack engineer who ships clean, fast, well-considered products. Currently focused on TypeScript, React, and backend systems that hold up under real use.',
}

export type BootLine =
  | { type: 'command'; prompt: string; text: string }
  | { type: 'output'; text: string }

export const bootWindowTitle = 'zsh — portfolio'

export const bootSequence: BootLine[] = [
  {
    type: 'command',
    prompt: 'praise@portfolio ~ %',
    text: 'git clone https://github.com/yourusername/portfolio.git',
  },
  { type: 'output', text: "Cloning into 'portfolio'... done." },
  {
    type: 'command',
    prompt: 'praise@portfolio ~ %',
    text: 'cd portfolio && pnpm install',
  },
  { type: 'output', text: 'Packages installed in 1.4s' },
  {
    type: 'command',
    prompt: 'praise@portfolio portfolio %',
    text: 'pnpm dev',
  },
  { type: 'output', text: '✓ Ready — launching experience...' },
]

export const skills: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'code',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML & CSS'],
  },
  {
    title: 'Frontend',
    icon: 'layers',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    title: 'Backend & Data',
    icon: 'server',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST & GraphQL'],
  },
  {
    title: 'Tooling & Platforms',
    icon: 'terminal',
    items: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD'],
  },
]

export const projects: Project[] = [
  {
    id: 'morrow',
    title: 'Morrow',
    year: '2026',
    description:
      'A calmer operating system for ambitious independent teams — unifying tasks, docs, and async updates in one focused workspace.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    liveHref: '#',
    repoHref: '#',
    featured: true,
  },
  {
    id: 'aster-labs',
    title: 'Aster Labs',
    year: '2025',
    description:
      'Turning complex climate data into decisions people can act on, with real-time dashboards built for non-technical stakeholders.',
    tags: ['React', 'D3.js', 'Node.js'],
    liveHref: '#',
    repoHref: '#',
    featured: true,
  },
  {
    id: 'field-notes',
    title: 'Field Notes',
    year: '2025',
    description:
      'A living editorial archive for ideas shaping tomorrow’s internet, with a custom CMS built for fast-moving writers.',
    tags: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    liveHref: '#',
    repoHref: '#',
  },
  {
    id: 'relay',
    title: 'Relay',
    year: '2024',
    description:
      'The small, focused tool that keeps distributed teams in sync — async standups without the meeting.',
    tags: ['React Native', 'Express', 'GraphQL'],
    liveHref: '#',
    repoHref: '#',
  },
]

export const about = {
  eyebrow: 'About',
  heading: ['Designing for the', 'space between', 'people & technology.'],
  paragraphs: [
    "I'm a full-stack engineer who cares about the feeling of a product as much as its function. I work across product, interface, and the systems underneath — comfortable moving from a Figma file to a database schema in the same afternoon.",
    'Outside of client and product work, I spend time contributing to open source, exploring new frameworks, and writing about what I learn along the way.',
  ],
  facts: [
    { label: 'Based in', value: site.location },
    { label: 'Focus', value: 'Product engineering' },
    { label: 'Currently', value: 'Open to full-time roles' },
  ],
}

export const contact = {
  eyebrow: 'Contact',
  heading: ['Have a good idea?', 'Let’s talk.'],
  description: 'My inbox is always open — whether it’s a role, a project, or just a question.',
}
