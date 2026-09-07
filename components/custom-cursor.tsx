'use client'

import { useEffect, useRef } from 'react'

const GLYPHS = ['0', '1', '{', '}', '<', '>', '/', ';', '=', '$']
const SPAWN_DISTANCE = 28
const MAX_PARTICLES = 40
const LIFETIME_MS = 850

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], select, label, input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="button"]'
const TEXT_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (prefersReducedMotion || !hasFinePointer) return

    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    document.documentElement.classList.add('custom-cursor-active')

    const probe = document.createElement('div')
    probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;background:var(--primary);'
    document.body.appendChild(probe)
    const primaryColor = getComputedStyle(probe).backgroundColor
    probe.remove()

    let lastPoint: { x: number; y: number } | null = null
    let particleCount = 0

    function spawnParticle(x: number, y: number) {
      if (particleCount >= MAX_PARTICLES || !trail) return

      const el = document.createElement('span')
      el.className = 'cursor-particle'
      el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.animationDuration = `${LIFETIME_MS}ms`
      el.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 44}px`)
      el.style.setProperty('--drift-rotate', `${(Math.random() - 0.5) * 50}deg`)
      el.style.color = Math.random() > 0.6 ? 'var(--primary)' : 'var(--muted-foreground)'

      particleCount += 1
      trail.appendChild(el)

      el.addEventListener(
        'animationend',
        () => {
          el.remove()
          particleCount -= 1
        },
        { once: true },
      )
    }

    function handlePointerMove(event: PointerEvent) {
      const { clientX: x, clientY: y } = event

      cursor!.style.transform = `translate3d(${x}px, ${y}px, 0)`
      cursor!.classList.add('is-visible')

      if (!lastPoint || Math.hypot(x - lastPoint.x, y - lastPoint.y) >= SPAWN_DISTANCE) {
        spawnParticle(x, y)
        lastPoint = { x, y }
      }
    }

    function handlePointerOver(event: PointerEvent) {
      const target = event.target as Element | null
      const isText = !!target?.closest(TEXT_SELECTOR)
      const interactiveEl = isText ? null : target?.closest(INTERACTIVE_SELECTOR)
      const isInteractive = !!interactiveEl
      const isOnPrimary = isInteractive && getComputedStyle(interactiveEl).backgroundColor === primaryColor

      cursor!.classList.toggle('is-text', isText)
      cursor!.classList.toggle('is-interactive', isInteractive)
      cursor!.classList.toggle('is-on-primary', isOnPrimary)
    }

    function handlePointerDown() {
      cursor!.classList.add('is-active')
    }

    function handlePointerUp() {
      cursor!.classList.remove('is-active')
    }

    function handlePointerLeaveDoc() {
      cursor!.classList.remove('is-visible')
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerover', handlePointerOver)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.documentElement.addEventListener('pointerleave', handlePointerLeaveDoc)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerover', handlePointerOver)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeaveDoc)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <span className="custom-cursor-shape" />
      </div>
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
    </>
  )
}
