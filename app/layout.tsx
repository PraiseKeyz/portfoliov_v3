import { Analytics } from '@vercel/analytics/next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { site } from '@/content/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ibm-plex-mono' })

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.description,
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0d12',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
