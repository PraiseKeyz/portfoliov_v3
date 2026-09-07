'use client'

import { useEffect, useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Matter from 'matter-js'

import { techIconMap } from '@/components/tech-icons'
import type { SkillItem } from '@/content/site'

const BALL_SIZE = 52
const REPEL_RADIUS_SQUARED = 130 * 130
const REPEL_STRENGTH = 0.06
const TICKER_HEIGHT = 40

function iconMarkup(icon: string) {
  const Icon = techIconMap[icon] ?? techIconMap.generic
  return renderToStaticMarkup(<Icon className="size-full" aria-hidden />)
}

export function SkillCollisionDock({ items }: { items: SkillItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const layerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const layer = layerRef.current
    if (!container || !canvas || !layer) return

    let dispose: (() => void) | undefined
    let started = false
    let pause: (() => void) | undefined
    let resume: (() => void) | undefined

    function mount() {
      if (started || !container || !canvas || !layer) return
      const width = container.clientWidth
      const height = container.clientHeight
      if (width === 0 || height === 0) return
      started = true

      const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Body, Events } = Matter

      const engine = Engine.create({ gravity: { x: 0, y: 1.05 } })
      const world = engine.world

      canvas.width = width
      canvas.height = height

      const wallThickness = 100
      const floorY = height - TICKER_HEIGHT
      const walls = [
        Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
        Bodies.rectangle(width / 2, floorY + wallThickness / 2, width, wallThickness, { isStatic: true }),
        Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
        Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      ]
      Composite.add(world, walls)

      const bodies = items.map((item, index) => {
        const x = width * (0.15 + (index / Math.max(items.length - 1, 1)) * 0.7) + (Math.random() - 0.5) * 20
        const y = height * 0.15 + Math.random() * height * 0.15

        const body = Bodies.circle(x, y, BALL_SIZE / 2, {
          restitution: 0.72,
          friction: 0.04,
          frictionAir: 0.02,
          density: 0.0022,
        })

        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08)
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.6, y: Math.random() * 0.8 })

        const element = document.createElement('div')
        element.className =
          'absolute flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground pointer-events-none'
        element.style.width = `${BALL_SIZE}px`
        element.style.height = `${BALL_SIZE}px`
        element.style.left = '0'
        element.style.top = '0'
        element.style.willChange = 'transform'
        element.innerHTML = `<span style="width:${BALL_SIZE * 0.4}px;height:${BALL_SIZE * 0.4}px;display:flex">${iconMarkup(item.icon)}</span>`
        layer.appendChild(element)

        body.plugin = { element, half: BALL_SIZE / 2 }
        return body
      })

      Composite.add(world, bodies)

      const syncElement = (body: Matter.Body) => {
        const element = body.plugin.element as HTMLDivElement
        const half = body.plugin.half as number
        element.style.transform = `translate3d(${body.position.x - half}px, ${body.position.y - half}px, 0)`
      }

      const mouse = Mouse.create(canvas)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      })
      Composite.add(world, mouseConstraint)

      const pitX = width / 2
      const pitY = floorY - BALL_SIZE
      const invH = 1 / height
      const force = { x: 0, y: 0 }

      const onBeforeUpdate = () => {
        bodies.forEach((body) => {
          syncElement(body)
          const dx = pitX - body.position.x
          const dy = pitY - body.position.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const depth = Math.max(0, body.position.y * invH - 0.35)
          const strength = 1e-6 * (0.35 + depth * depth * 2.2)
          const inv = strength / dist
          force.x = dx * inv
          force.y = dy * inv
          Body.applyForce(body, body.position, force)
        })
      }

      const onMouseMove = (event: Matter.IMouseEvent<Matter.MouseConstraint>) => {
        const mx = event.mouse.position.x
        const my = event.mouse.position.y
        bodies.forEach((body) => {
          const dx = body.position.x - mx
          const dy = body.position.y - my
          const distSq = dx * dx + dy * dy
          if (distSq < REPEL_RADIUS_SQUARED) {
            const dist = Math.sqrt(distSq) || 1
            const inv = REPEL_STRENGTH / dist
            force.x = dx * inv
            force.y = dy * inv
            Body.applyForce(body, body.position, force)
          }
        })
      }

      Events.on(engine, 'beforeUpdate', onBeforeUpdate)
      Events.on(mouseConstraint, 'mousemove', onMouseMove)
      bodies.forEach(syncElement)

      const runner = Runner.create()
      let running = true
      Runner.run(runner, engine)

      pause = () => {
        if (!running) return
        running = false
        Runner.stop(runner)
      }
      resume = () => {
        if (running) return
        running = true
        Runner.run(runner, engine)
      }

      const onResize = () => {
        if (!container || !canvas) return
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
      window.addEventListener('resize', onResize)

      dispose = () => {
        window.removeEventListener('resize', onResize)
        Events.off(engine, 'beforeUpdate', onBeforeUpdate)
        Events.off(mouseConstraint, 'mousemove', onMouseMove)
        Runner.stop(runner)
        Engine.clear(engine)
        bodies.forEach((body) => {
          const element = body.plugin.element as HTMLDivElement
          element?.remove()
        })
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!started) mount()
          resume?.()
        } else {
          pause?.()
        }
      },
      { threshold: 0, rootMargin: '200px 0px' },
    )
    observer.observe(container)

    return () => {
      observer.disconnect()
      dispose?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div ref={layerRef} className="pointer-events-none absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  )
}
