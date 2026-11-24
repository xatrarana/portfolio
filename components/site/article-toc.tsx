"use client"

import { useEffect, useState, type MouseEvent } from "react"

type Group = { part: string; items: { id: string; no?: string; text: string }[] }

/**
 * "On this page" contents grouped by part. The part you are reading opens to
 * show its sections, and a bar at the top of the screen shows reading progress.
 */
export function ArticleToc({ groups }: { groups: Group[] }) {
  const [cur, setCur] = useState(groups[0]?.items[0]?.id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((s) => s.id))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const body = document.querySelector<HTMLElement>(".art-body")
    let raf = 0
    const update = () => {
      raf = 0
      let active = els[0]?.id
      for (const el of els) if (el.getBoundingClientRect().top < window.innerHeight * 0.3) active = el.id
      setCur(active)
      if (body) {
        const r = body.getBoundingClientRect()
        setProgress(Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight))))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [groups])

  const go = (id: string) => (e: MouseEvent) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 })
    else el.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <>
      <div className="read-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav className="toc" aria-label="On this page">
        <b>On this page</b>
        <ol>
          {groups.map((g) => {
            const open = g.items.some((s) => s.id === cur)
            return (
              <li key={g.part} data-open={open ? "" : undefined}>
                <a href={`#${g.items[0]?.id}`} onClick={go(g.items[0]?.id)} className="toc-part">
                  {g.part}
                  <span>{g.items.length}</span>
                </a>
                <ol>
                  {g.items.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} onClick={go(s.id)} aria-current={s.id === cur ? "location" : undefined}>
                        <span>{s.no ? s.no.padStart(2, "0") : "·"}</span>
                        {s.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
