'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

import { BootSequence } from '@/components/boot-sequence'
import { CustomCursor } from '@/components/custom-cursor'

const STORAGE_KEY = 'portfolio-booted'

function BootGate({ children }: { children: ReactNode }) {
  const [showBoot, setShowBoot] = useState(false)
  const [ready, setReady] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyBooted = sessionStorage.getItem(STORAGE_KEY)

    if (prefersReducedMotion || alreadyBooted) {
      setReady(true)
      return
    }

    setShowBoot(true)
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    if (showBoot) lenis?.stop()
  }, [lenis, showBoot])

  const handleDone = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    document.body.style.overflow = ''
    lenis?.start()
    setShowBoot(false)
    setReady(true)
  }

  return (
    <>
      {showBoot && <BootSequence onDone={handleDone} />}
      <div
        aria-hidden={!ready}
        className={`transition-opacity duration-700 ease-out ${ready ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        {children}
      </div>
    </>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ anchors: { offset: -100 }, duration: 2.8, easing: (t) => 1 - Math.pow(1 - t, 3) }}>
      <CustomCursor />
      <BootGate>{children}</BootGate>
    </ReactLenis>
  )
}
