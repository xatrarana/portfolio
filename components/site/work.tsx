"use client"

import { useState, type PointerEvent } from "react"
import { projects, type ProjectKind } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"
import { ProjectShot } from "./project-shot"
import { ArrowButton } from "./arrow-button"

const filters: { id: "all" | ProjectKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sec", label: "Security" },
  { id: "dev", label: "Development" },
]

/** Moves the round "open" button to the pointer inside a project image. */
function follow(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty("--cx", `${e.clientX - r.left}px`)
  el.style.setProperty("--cy", `${e.clientY - r.top}px`)
}

export function Work() {
  const [filter, setFilter] = useState<"all" | ProjectKind>("all")
  const shown = projects.filter((p) => filter === "all" || p.kind === filter)
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <SectionHead ghost="Portfolio" label="Selected work" />
        <div className="work-bar" data-reveal style={delay(240)}>
          <div className="tabs" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
          <ArrowButton href="https://github.com/xatrarana" variant="light" external>
            View all on GitHub
          </ArrowButton>
        </div>
        <div className="work-grid">
          {shown.map((p, i) => (
            <div key={`${filter}-${p.name}`} data-reveal style={delay((i % 2) * 140)}>
              <a className="proj" href={p.href} target="_blank" rel="noopener noreferrer">
                <div className="shot" onPointerMove={follow} onPointerEnter={follow}>
                  <span className="badge">{p.badge}</span>
                  <span className="open" aria-hidden="true">↗</span>
                  <ProjectShot kind={p.shot} />
                </div>
                <div className="proj-meta">
                  <h3>
                    {p.name} <span>· {p.tagline}</span>
                  </h3>
                  <div className="chips">
                    {p.chips.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
