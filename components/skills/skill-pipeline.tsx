'use client'

import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Check } from 'lucide-react'

type Stage = { label: string; delay: string }

const TRUNK: Stage[] = [
  { label: 'Install', delay: '0s' },
  { label: 'Build', delay: '1.5s' },
  { label: 'Test', delay: '3s' },
]

const BRANCHES: Stage[] = [
  { label: 'Preview', delay: '4.5s' },
  { label: 'Deploy', delay: '4.5s' },
]

function PipelineNode({ label, delay }: Stage) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3">
      <span
        className="skill-pipeline-badge flex size-5 shrink-0 items-center justify-center rounded-full border border-border"
        style={{ animationDelay: delay }}
      >
        <Check
          className="skill-pipeline-check size-3 text-primary-foreground"
          style={{ animationDelay: delay }}
        />
      </span>
      <span className="font-display text-sm font-semibold whitespace-nowrap text-foreground">{label}</span>
    </div>
  )
}

function JunctionDot({ className = '' }: { className?: string }) {
  return <span className={`absolute size-1.5 rounded-full border border-border bg-background ${className}`} />
}

function StraightConnector() {
  return (
    <div className="relative flex h-full w-10 items-center">
      <span className="h-px w-full bg-border" />
      <JunctionDot className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
      <JunctionDot className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}

function BranchConnector() {
  return (
    <div className="relative h-full w-10">
      <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-border" />
      <JunctionDot className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
      <span className="absolute top-1/4 bottom-1/4 left-4 w-px -translate-y-1/2 bg-border" />
      <span className="absolute top-1/4 left-4 h-px w-6 -translate-y-1/2 bg-border" />
      <span className="absolute bottom-1/4 left-4 h-px w-6 translate-y-1/2 bg-border" />
      <JunctionDot className="top-1/4 right-0 -translate-y-1/2 translate-x-1/2" />
      <JunctionDot className="right-0 bottom-1/4 translate-x-1/2 translate-y-1/2" />
    </div>
  )
}

export function SkillPipeline() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ startX: 0, startScrollLeft: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return
    dragState.current = { startX: event.clientX, startScrollLeft: el.scrollLeft }
    setIsDragging(true)
    el.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el || !isDragging) return
    el.scrollLeft = dragState.current.startScrollLeft - (event.clientX - dragState.current.startX)
  }

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(false)
    scrollRef.current?.releasePointerCapture(event.pointerId)
  }

  return (
    <div
      ref={scrollRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={`skill-pipeline-canvas no-scrollbar flex h-full w-full touch-pan-y items-center overflow-x-auto px-6 py-10 select-none sm:px-10 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      <div className="grid grid-cols-[auto_auto_auto_auto_auto_auto_auto] grid-rows-2 items-center gap-y-3">
        <div className="col-start-1 row-span-2">
          <PipelineNode {...TRUNK[0]} />
        </div>
        <div className="col-start-2 row-span-2">
          <StraightConnector />
        </div>
        <div className="col-start-3 row-span-2">
          <PipelineNode {...TRUNK[1]} />
        </div>
        <div className="col-start-4 row-span-2">
          <StraightConnector />
        </div>
        <div className="col-start-5 row-span-2">
          <PipelineNode {...TRUNK[2]} />
        </div>
        <div className="col-start-6 row-span-2">
          <BranchConnector />
        </div>
        <div className="col-start-7 row-start-1">
          <PipelineNode {...BRANCHES[0]} />
        </div>
        <div className="col-start-7 row-start-2">
          <PipelineNode {...BRANCHES[1]} />
        </div>
      </div>
    </div>
  )
}
