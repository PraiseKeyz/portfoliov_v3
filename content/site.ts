export type NavLink = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'x' | 'mail'
}

export type SkillAnimation = 'editor' | 'browser' | 'dataflow' | 'pipeline'

export type SkillItem = {
  name: string
  icon: string
}

export type SkillCategory = {
  title: string
  description: string
  animation: SkillAnimation
  items: SkillItem[]
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
  role: 'Full-Stack Engineer',
  location: 'Nigeria · Remote',
  email: 'praiseoluwatobilobaadebayo@gmail.com',
  availability: 'Available for new opportunities',
  resumeUrl: '/Praise_Adebayo_Resume.pdf',
  tagline: 'I move fluidly across the stack — from database schema to polished UI.',
  description:
    'An agile full-stack engineer with particular depth in backend systems and cloud infrastructure, building APIs, databases, and interfaces for production platforms — currently working across Nigerian startups while studying for a B.Sc. at Obafemi Awolowo University.',
}

export const nav: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/PraiseKeyz', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/praise0x', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:praiseoluwatobilobaadebayo@gmail.com', icon: 'mail' },
]

export const hero = {
  eyebrow: site.availability,
  headingLines: ['Building', 'complete', 'products.'],
  accentWord: 'complete',
  description:
    'I’m Praise — an agile full-stack engineer who moves comfortably from database schema to polished UI, with particular depth in backend systems and cloud infrastructure. Currently building production systems for startups across Nigeria.',
}

export type BootLine =
  | { type: 'command'; prompt: string; text: string }
  | { type: 'output'; text: string }

export const bootWindowTitle = 'zsh — portfolio'

export const bootSequence: BootLine[] = [
  {
    type: 'command',
    prompt: 'praise@portfolio ~ %',
    text: 'git clone https://github.com/praisekeyz/portfoliov_v3.git',
  },
  { type: 'output', text: "Cloning into 'portfolio'... done." },
  {
    type: 'command',
    prompt: 'praise@portfolio ~ %',
    text: 'cd portfoliov_v3 && pnpm install',
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
    description:
      'The languages I reach for daily — TypeScript and JavaScript for almost everything I ship, with Rust and C++ from lower-level coursework and systems curiosity.',
    animation: 'editor',
    items: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Rust', icon: 'rust' },
      { name: 'C++', icon: 'cpp' },
      { name: 'SQL', icon: 'generic' },
    ],
  },
  {
    title: 'Frontend',
    description:
      'I build the interfaces my own APIs power — React and Next.js on top of Tailwind CSS, kept fast and unfussy.',
    animation: 'browser',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    title: 'Backend & Data',
    description:
      'Backend is where I live — Node.js and NestJS APIs on PostgreSQL and MongoDB, designing schemas and service boundaries for platforms handling real payments and real users.',
    animation: 'dataflow',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    description:
      'Owning systems past the codebase — Dockerized deployments, Nginx reverse proxies with SSL, hardened Linux servers, and CI/CD pipelines that ship with confidence.',
    animation: 'pipeline',
    items: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'Git', icon: 'git' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'CI/CD', icon: 'generic' },
    ],
  },
]

export const projects: Project[] = [
    {
    id: 'gps360-academy',
    title: 'GPS360 Academy',
    year: 'Personal project',
    description:
      'An e-learning platform with course management, progress tracking, interactive quizzes, and Stripe-powered course enrollment.',
    tags: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
    liveHref: 'https://gps360academy.com',
    repoHref: '#',
  },
    {
    id: 'layer3-cloud',
    title: 'Layer3 Cloud',
    year: 'Personal project',
    description:
      'The full marketing website for a Nigerian cloud infrastructure company, designed and built for clean UI, performance, and responsive design.',
    tags: ['Next.js', 'Tailwind CSS'],
    liveHref: 'https://layer3.cloud',
    repoHref: '#',
  },
  {
    id: 'myfithub',
    title: 'MyFitHub',
    year: '2025',
    description:
      'A fitness subscription platform connecting users to gyms, yoga, swimming, boxing, and wellness centers across Nigeria — architected the backend from the ground up, including a full Paystack subscription flow and a multi-vendor venue management system now serving 100+ active users and 15+ partner venues.',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Paystack'],
    liveHref: '#',
    repoHref: '#',
    featured: true,
  },
  {
    id: 'dailydrip',
    title: 'DailyDrip',
    year: 'In development',
    description:
      'A mobile-first personal finance app built around time-locked envelope budgeting — locked category budgets auto-disburse daily allowances through a scheduled job system, enforcing spending discipline. Leading full product design end to end, from UI/UX wireframes through backend architecture and frontend implementation.',
    tags: ['NestJS', 'Next.js', 'PostgreSQL', 'TypeScript'],
    liveHref: '#',
    repoHref: '#',
  },
  {
    id: 'paysub',
    title: 'PaySub',
    year: 'Personal project',
    description:
      'A virtual top-up platform for airtime, data bundles, and utility bill payments, with a responsive React frontend and a REST API handling real-time transaction processing.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveHref: 'https://pay-sub.vercel.app',
    repoHref: '#',
  },
]

export const about = {
  eyebrow: 'About',
  heading: ['Comfortable on', 'both sides', 'of the stack.'],
  paragraphs: [
    'I’m an agile, full-stack engineer — equally comfortable designing a database schema, hardening a server, or building the interface someone actually taps through. I’ve built and run production systems for Nigerian startups, from a multi-vendor fitness subscription platform to a two-sided marketplace with KYC verification built into onboarding, often owning the product end to end, UI included.',
    'Outside client work, I’m building DailyDrip, a personal finance app with time-locked budgeting, and studying for a B.Sc. at Obafemi Awolowo University.',
  ],
  facts: [
    { label: 'Based in', value: site.location },
    { label: 'Focus', value: 'Full-stack — backend to UI' },
    { label: 'Currently', value: 'Open to full-stack roles' },
  ],
}

export const contact = {
  eyebrow: 'Contact',
  heading: ['Have a good idea?', 'Let’s talk.'],
  description: 'My inbox is always open — whether it’s a role, a project, or just a question.',
}
