"use client"

import { useEffect, useRef, useState } from "react"
import { services } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"
import { ProjectShot } from "./project-shot"
import { useFollow } from "./use-follow"

type Service = (typeof services)[number]

function ServiceRow({ s, i, isOpen, onIntent, onToggle }: { s: Service; i: number; isOpen: boolean; onIntent: (i: number) => void; onToggle: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const follow = useFollow(ref, { vars: ["--fx", "--fy"], ease: 0.12 })
  return (
    <li ref={ref} data-open={isOpen ? "" : undefined} data-reveal="left" style={delay(i * 120)} onMouseEnter={() => onIntent(i)} {...follow}>
      <button type="button" aria-expanded={isOpen} aria-controls={`svc-${i}`} onClick={() => onToggle(i)}>
        <span className="t" aria-label={s.title}>
          <span aria-hidden="true">{s.title}</span>
          <span aria-hidden="true">{s.title}</span>
        </span>
        <span className="ar" aria-hidden="true">
          <span>↗</span>
          <span>×</span>
        </span>
      </button>
      <div className="float-card" aria-hidden="true">
        <div className="shot">
          <ProjectShot kind={s.shot} />
        </div>
      </div>
      <div className="panel" id={`svc-${i}`}>
        <div>
          <div className="panel-in">
            <p>{s.body}</p>
            <div className="stack">
              {s.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

/**
 * Hover (or tap) a row to open it: the row turns dark, its label rolls, and a
 * tilted preview glides after the cursor. A short hover-intent delay stops rows
 * flickering open and shut while the pointer passes over them.
 */
export function Services() {
  const [open, setOpen] = useState<number | null>(null)
  const timer = useRef<number | null>(null)
  const clear = () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = null
  }
  const intent = (i: number | null, wait = 140) => {
    clear()
    timer.current = window.setTimeout(() => setOpen(i), wait)
  }
  useEffect(() => clear, [])

  return (
    <section className="sec" id="services">
      <div className="wrap">
        <SectionHead ghost="Services" label="Services" align="left" />
        <ul className="svc" onMouseLeave={() => intent(null, 220)}>
          {services.map((s, i) => (
            <ServiceRow
              key={s.title}
              s={s}
              i={i}
              isOpen={open === i}
              onIntent={(n) => intent(n)}
              onToggle={(n) => {
                clear()
                setOpen((cur) => (cur === n ? null : n))
              }}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
