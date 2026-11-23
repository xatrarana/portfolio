"use client"

import { useState, type MouseEvent } from "react"
import { experience } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"

export function Experience() {
  const [peek, setPeek] = useState<{ i: number; x: number; y: number } | null>(null)
  const move = (i: number) => (e: MouseEvent) => setPeek({ i, x: e.clientX + 150, y: e.clientY })
  const job = peek ? experience[peek.i] : null

  return (
    <section className="sec night" id="experience">
      <div className="wrap">
        <SectionHead ghost="Experience" label="Experience" align="left" aside="4+ years of experience" />
        <ol className="xp">
          {experience.map((j, i) => (
            <li key={j.company} data-reveal style={delay(i * 110)} onMouseEnter={move(i)} onMouseMove={move(i)} onMouseLeave={() => setPeek(null)}>
              <div>
                <b>{j.company}</b>
                <small>{j.role}</small>
              </div>
              <time>
                {j.from} – {j.to ?? <span className="now">Now</span>}
              </time>
            </li>
          ))}
        </ol>
      </div>
      <div style={{ height: 72 }} />
      <div className={`peek${peek ? " show" : ""}`} aria-hidden="true" style={peek ? { left: peek.x, top: peek.y } : undefined}>
        <span className="peek-co">{job?.company}</span>
        <b>Tech used</b>
        <div className="chips">
          {job?.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
