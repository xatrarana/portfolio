"use client"

import { useRef, useState } from "react"
import { experience } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"
import { useFollow } from "./use-follow"

export function Experience() {
  const [active, setActive] = useState<number | null>(null)
  const list = useRef<HTMLOListElement>(null)
  const peek = useRef<HTMLDivElement>(null)
  const follow = useFollow(list, { vars: ["--px", "--py"], space: "viewport", output: peek, ease: 0.14 })
  const job = active !== null ? experience[active] : null

  return (
    <section className="sec night" id="experience">
      <div className="wrap">
        <SectionHead ghost="Experience" label="Experience" align="left" aside="4+ years of experience" />
        <ol className="xp" ref={list} {...follow} onMouseLeave={() => setActive(null)}>
          {experience.map((j, i) => (
            <li key={j.company} data-reveal style={delay(i * 110)} onMouseEnter={() => setActive(i)}>
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
      <div ref={peek} className={`peek${job ? " show" : ""}`} aria-hidden="true">
        <div className="peek-card">
          <span className="peek-co">{job?.company}</span>
          {job?.summary ? <p>{job.summary}</p> : null}
          <div className="chips">
            {job?.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
