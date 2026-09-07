'use client'

import { useEffect, useState } from 'react'

import { bootSequence, bootWindowTitle } from '@/content/site'

const CHAR_DELAY = 22
const LINE_PAUSE = 260
const OUTPUT_PAUSE = 420
const EXIT_DELAY = 500
const EXIT_DURATION = 650

type BootSequenceProps = {
  onDone: () => void
}

export function BootSequence({ onDone }: BootSequenceProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (exiting) return

    if (lineIndex >= bootSequence.length) {
      const timer = setTimeout(() => setExiting(true), EXIT_DELAY)
      return () => clearTimeout(timer)
    }

    const line = bootSequence[lineIndex]

    if (typed.length < line.text.length) {
      const timer = setTimeout(() => setTyped(line.text.slice(0, typed.length + 1)), CHAR_DELAY)
      return () => clearTimeout(timer)
    }

    const pause = line.type === 'output' ? OUTPUT_PAUSE : LINE_PAUSE
    const timer = setTimeout(() => {
      setLineIndex((index) => index + 1)
      setTyped('')
    }, pause)
    return () => clearTimeout(timer)
  }, [lineIndex, typed, exiting])

  useEffect(() => {
    if (!exiting) return
    const timer = setTimeout(onDone, EXIT_DURATION)
    return () => clearTimeout(timer)
  }, [exiting, onDone])

  const skip = () => {
    setTyped('')
    setLineIndex(bootSequence.length)
    setExiting(true)
  }

  useEffect(() => {
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const completedLines = bootSequence.slice(0, lineIndex)
  const currentLine = bootSequence[lineIndex]

  return (
    <div
      role="presentation"
      aria-hidden="true"
      onClick={skip}
      className={`fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-background px-6 transition-opacity duration-[650ms] ease-in-out ${exiting ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <div
        className={`w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl transition-all duration-[650ms] ease-in-out ${exiting ? 'translate-y-3 scale-[0.98] opacity-0' : 'translate-y-0 scale-100 opacity-100'}`}
      >
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 font-mono text-[10px] tracking-wide text-muted-foreground">
            {bootWindowTitle}
          </span>
        </div>

        <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">
          {completedLines.map((line, index) =>
            line.type === 'command' ? (
              <p key={index}>
                <span className="text-primary">{line.prompt}</span>{' '}
                <span className="text-foreground">{line.text}</span>
              </p>
            ) : (
              <p key={index} className="text-muted-foreground">
                {line.text}
              </p>
            ),
          )}

          {currentLine && (
            <p>
              {currentLine.type === 'command' ? (
                <>
                  <span className="text-primary">{currentLine.prompt}</span>{' '}
                  <span className="text-foreground">{typed}</span>
                </>
              ) : (
                <span className="text-muted-foreground">{typed}</span>
              )}
              <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-primary align-middle" />
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          skip()
        }}
        className="absolute bottom-10 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-primary"
      >
        Skip intro →
      </button>
    </div>
  )
}
