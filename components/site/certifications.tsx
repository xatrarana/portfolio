"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { certDate, certMeta, certs, type CertType } from "@/lib/certs"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"

type Filter = "All" | CertType
const filters: Filter[] = ["All", ...Array.from(new Set(certs.map((c) => c.type)))]

/** Short issuer names for the heading, e.g. "CrowdStrike University" → "CrowdStrike". */
const issuerName = (i: string) => i.replace(/ (University|Falcon Champions)$/, "")

/**
 * The list on the left drives a stacked deck of the real certificates on the
 * right: the active one comes forward in colour, the rest wait behind in
 * greyscale. Clicking the front certificate opens it full size.
 */
export function Certifications() {
  const [filter, setFilter] = useState<Filter>("All")
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const shown = certs.map((c, i) => (filter === "All" || c.type === filter ? i : -1)).filter((i) => i >= 0)
  const issuers = Array.from(new Set(shown.map((i) => issuerName(certs[i].issuer)))).join(", ")
  const order = [...shown.slice(shown.indexOf(active)), ...shown.slice(0, shown.indexOf(active))]

  const pick = (f: Filter) => {
    setFilter(f)
    const next = certs.findIndex((c) => f === "All" || c.type === f)
    if (!(f === "All" || certs[active].type === f)) setActive(next)
  }
  const step = (d: number) => {
    const k = shown.indexOf(active)
    setActive(shown[(k + d + shown.length) % shown.length])
  }

  // Lightbox: lock the page scroll and close on Escape.
  useEffect(() => {
    if (open === null) return
    window.__lenis?.stop()
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
    window.addEventListener("keydown", onKey)
    return () => {
      window.__lenis?.start()
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const cur = certs[active]
  const lb = open !== null ? certs[open] : null

  return (
    <section className="sec certs" id="certifications">
      <div className="wrap">
        <SectionHead
          ghost="Credentials"
          label="Certifications"
          align="left"
          aside={
            <>
              <em>{shown.length}</em> credentials · {issuers}
            </>
          }
        />
        <div data-reveal style={delay(200)}>
          <div className="tabs" role="group" aria-label="Filter certifications">
            {filters.map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => pick(f)}>
                {f}
                <sup>({f === "All" ? certs.length : certs.filter((c) => c.type === f).length})</sup>
              </button>
            ))}
          </div>
        </div>
        <div className="cert-grid">
          <ol className="cert-list">
            {certs.map((c, i) => (
              <li key={c.slug} hidden={!shown.includes(i)} data-on={i === active ? "" : undefined} data-reveal="left" style={delay(i * 70)}>
                <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t">
                    {c.title}
                    <span className="kind">{c.type}</span>
                  </span>
                  <span className="m">{certMeta(c)}</span>
                  <time dateTime={c.date}>{certDate(c.date)}</time>
                </button>
              </li>
            ))}
          </ol>
          <div className="cert-stage" data-reveal="right" style={delay(250)}>
            <div className="cert-deck">
              {certs.map((c, i) => {
                const pos = order.indexOf(i)
                const depth = Math.min(Math.max(pos, 0), 4)
                const side = pos % 2 ? 1 : -1
                const rot = pos === 0 ? -2 : side * (3 + depth * 2.2)
                const x = pos === 0 ? 0 : side * (4 + depth * 3)
                return (
                  <button
                    key={c.slug}
                    type="button"
                    className={`cert-card${c.portrait ? " tall" : ""}`}
                    data-front={pos === 0 ? "" : undefined}
                    data-gone={pos < 0 ? "" : undefined}
                    tabIndex={pos === 0 ? 0 : -1}
                    aria-hidden={pos !== 0}
                    aria-label={pos === 0 ? `Open ${c.title} certificate` : undefined}
                    onClick={() => (pos === 0 ? setOpen(i) : setActive(i))}
                    style={{
                      zIndex: 50 - Math.max(pos, 0),
                      transform:
                        pos < 0
                          ? "translate(-50%, -40%) scale(.8)"
                          : `translate(calc(-50% + ${x}%), calc(-50% - ${depth * 4}%)) rotate(${rot}deg) scale(${1 - depth * 0.05})`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/certs/${c.slug}.webp`} alt="" loading="lazy" width={c.portrait ? 679 : 960} height={c.portrait ? 960 : 679} />
                  </button>
                )
              })}
            </div>
            <div className="cert-foot">
              <span>
                <b>{cur.title}</b> · {certDate(cur.date)}
              </span>
              <span className="cert-ctrl">
                <button type="button" onClick={() => step(-1)} aria-label="Previous certificate">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next certificate">
                  →
                </button>
                <button type="button" onClick={() => setOpen(active)}>
                  View
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {mounted ? createPortal(
      <div className={`cert-lb${lb ? " open" : ""}`} role="dialog" aria-modal="true" aria-label={lb ? `${lb.title} certificate` : "Certificate"} aria-hidden={!lb} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        {lb ? (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/certs/${lb.slug}.webp`} alt={`${lb.title} certificate`} />
            <figcaption>
              <span>
                <b>{lb.title}</b>
                <small>
                  {certMeta(lb)} · {certDate(lb.date)}
                </small>
              </span>
              <span className="cert-ctrl">
                <a className="dark" href={`/certs/${lb.slug}.pdf`} target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
                <button type="button" ref={closeBtn} onClick={() => setOpen(null)}>
                  Close
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </div>,
      document.body,
      ) : null}
    </section>
  )
}
