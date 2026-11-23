"use client"

import { useState } from "react"
import { services } from "@/lib/content"
import { SectionHead } from "./section-head"

export function Services() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <SectionHead ghost="Services" label="Services" align="left" aside="Tap a row to open it" />
        <ul className="svc">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.title} className={isOpen ? "on" : undefined}>
                <button type="button" aria-expanded={isOpen} aria-controls={`svc-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="t">{s.title}</span>
                  <span className="ar" aria-hidden="true">↗</span>
                </button>
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
