import { AboutSection } from '@/components/about-section'
import { AppShell } from '@/components/app-shell'
import { ContactSection } from '@/components/contact-section'
import { HeroSection } from '@/components/hero-section'
import { ProjectsSection } from '@/components/projects-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SkillsSection } from '@/components/skills-section'

export default function Page() {
  return (
    <AppShell>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </AppShell>
  )
}
