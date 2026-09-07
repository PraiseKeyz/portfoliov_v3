'use client'

import { useMemo } from 'react'

const codeLines = [
  'import { useState, useEffect } from "react"',
  '',
  'const engineer = new Developer({',
  '  stack: ["typescript", "react", "node"],',
  '  mindset: "ship, measure, refine",',
  '})',
  '',
  'export async function build(idea: Idea) {',
  '  const spec = await clarify(idea)',
  '  return spec.map(intoSoftware)',
  '}',
  '',
  '// small details, considered carefully',
  'const release = await ship({',
  '  performance: "measured",',
  '  accessibility: true,',
  '})',
  '',
  'interface Craft {',
  '  purpose: string',
  '  polish: Level',
  '}',
  '',
  'export function useDebounced<T>(value: T, ms = 300) {',
  '  const [state, setState] = useState(value)',
  '  useEffect(() => {',
  '    const id = setTimeout(() => setState(value), ms)',
  '    return () => clearTimeout(id)',
  '  }, [value, ms])',
  '  return state',
  '}',
  '',
  'app.get("/api/health", (_req, res) => {',
  '  res.status(200).json({ status: "ok" })',
  '})',
  '',
  'const query = `',
  '  SELECT id, title, updated_at',
  '  FROM projects',
  '  ORDER BY updated_at DESC',
  '`',
  '',
  'type Result<T> = { ok: true; data: T } | { ok: false; error: string }',
  '',
  'export const cn = (...classes: string[]) =>',
  '  classes.filter(Boolean).join(" ")',
  '',
  '$ git commit -m "refactor: simplify data layer"',
  '$ pnpm build && pnpm test',
  '✓ compiled successfully',
]

const COLUMN_COUNT = 3
const LINES_PER_COLUMN = 70
const COLUMN_OFFSET_STEP = 9

function buildColumnLines(offset: number) {
  return Array.from({ length: LINES_PER_COLUMN }, (_, i) => codeLines[(offset + i) % codeLines.length])
}

export function CodeRain() {
  const columns = useMemo(
    () =>
      Array.from({ length: COLUMN_COUNT }, (_, columnIndex) =>
        buildColumnLines((columnIndex * COLUMN_OFFSET_STEP) % codeLines.length),
      ),
    [],
  )

  return (
    <div className="code-rain" aria-hidden="true">
      {columns.map((lines, columnIndex) => (
        <div className="code-rain-column" key={columnIndex}>
          <div className="code-rain-track">
            {[0, 1].map((copy) => (
              <div key={copy}>
                {lines.map((line, index) => (
                  <div className="code-rain-line" key={`${copy}-${index}`}>
                    <span>{String((index % 60) + 1).padStart(2, '0')}</span>
                    {line || ' '}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
