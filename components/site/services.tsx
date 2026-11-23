"use client"

import { useState } from "react"
import { services } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"
import { ProjectShot } from "./project-shot"

/** Hover (or tap) a row to open it: the row turns dark, its label rolls, and a tilted preview floats in. */
export function Services() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <SectionHead ghost="Services" label="Services" align="left" />
        <ul className="svc" onMouseLeave={() => setOpen(null)}>
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.title} data-open={isOpen ? "" : undefined} data-reveal="left" style={delay(i * 120)} onMouseEnter={() => setOpen(i)}>
                <button type="button" aria-expanded={isOpen} aria-controls={`svc-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="t" aria-label={s.title}>
                    <span aria-hidden="true">{s.title}</span>
                    <span aria-hidden="true">{s.title}</span>
                  </span>
                  <span className="ar" aria-hidden="true">{isOpen ? "×" : "↗"}</span>
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
          })}
        </ul>
      </div>
    </section>
  )
}
