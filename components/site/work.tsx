"use client"

import { useRef, useState } from "react"
import { projects, type ProjectKind } from "@/lib/content"
import { useFollow } from "./use-follow"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"
import { ProjectShot } from "./project-shot"
import { ArrowButton } from "./arrow-button"
import { TransitionLink } from "./page-transition"

const filters: { id: "all" | ProjectKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sec", label: "Security" },
  { id: "dev", label: "Development" },
]

type Project = (typeof projects)[number]

/** Project card whose round "open" button glides after the cursor. Opens the project page. */
export function ProjectCard({ p }: { p: Project }) {
  const shot = useRef<HTMLDivElement>(null)
  const follow = useFollow(shot, { vars: ["--cx", "--cy"], ease: 0.18 })
  return (
    <TransitionLink className="proj" href={`/work/${p.slug}`}>
      <div className="shot" ref={shot} {...follow}>
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
    </TransitionLink>
  )
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
            <div key={`${filter}-${p.name}`} className={p.featured ? "feat" : undefined} data-reveal style={delay((i % 2) * 140)}>
              <ProjectCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
