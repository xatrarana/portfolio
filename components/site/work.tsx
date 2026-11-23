"use client"

import { useState } from "react"
import { projects, type ProjectKind } from "@/lib/content"
import { SectionHead } from "./section-head"
import { ProjectShot } from "./project-shot"
import { ArrowButton } from "./arrow-button"

const filters: { id: "all" | ProjectKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sec", label: "Security" },
  { id: "dev", label: "Development" },
]

export function Work() {
  const [filter, setFilter] = useState<"all" | ProjectKind>("all")
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <SectionHead ghost="Portfolio" label="Selected work" />
        <div className="work-bar">
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
          {projects
            .filter((p) => filter === "all" || p.kind === filter)
            .map((p) => (
              <a key={p.name} className="proj reveal" href={p.href} target="_blank" rel="noopener noreferrer">
                <div className="shot">
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
            ))}
        </div>
      </div>
    </section>
  )
}
