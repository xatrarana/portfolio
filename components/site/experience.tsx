"use client"

import { useState, type MouseEvent } from "react"
import { experience } from "@/lib/content"
import { SectionHead } from "./section-head"

export function Experience() {
  const [peek, setPeek] = useState<{ tech: string[]; x: number; y: number } | null>(null)
  const move = (tech: string[]) => (e: MouseEvent) => setPeek({ tech, x: e.clientX + 140, y: e.clientY })

  return (
    <section className="sec night" id="experience">
      <div className="wrap">
        <SectionHead ghost="Experience" label="Experience" align="left" aside="4+ years of experience" />
        <ol className="xp">
          {experience.map((j) => (
            <li key={j.company} className="reveal" onMouseEnter={move(j.tech)} onMouseMove={move(j.tech)} onMouseLeave={() => setPeek(null)}>
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
        <b>Tech used</b>
        <div className="chips">
          {peek?.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
