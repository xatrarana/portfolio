"use client"

import { useState } from "react"
import { TransitionLink } from "./page-transition"

export type CardPost = {
  slug: string
  card: string
  tags: string[]
  summary: string
  date: string
  minutes: number
  sections: number
  stack?: string
  visual?: string
  outline: string[]
}

/** Title where *words* are set in the italic serif. */
export function Styled({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((s, i) => (s.startsWith("*") ? <em key={i}>{s.slice(1, -1)}</em> : s))}
    </>
  )
}

/**
 * Featured article card. Its dark panel is a small live diagram of the guide:
 * hovering (or focusing) the card fails the primary collector and the virtual
 * IP moves to the secondary, which is the whole point of the article.
 */
export function WritingCard({ p }: { p: CardPost }) {
  const [fail, setFail] = useState(false)
  const on = () => setFail(true)
  const off = () => setFail(false)
  return (
    <TransitionLink href={`/writing/${p.slug}`} className="post-card">
      <span className="txt" onMouseEnter={on} onMouseLeave={off} onFocus={on} onBlur={off}>
        <span className="tags">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
        <span className="h">
          <Styled text={p.card} />
        </span>
        <span className="sum">{p.summary}</span>
        <span className="meta-row">
          <b>{p.date}</b>
          <span>{p.minutes} min read</span>
          <span>{p.sections} steps</span>
          {p.stack ? <span>{p.stack}</span> : null}
        </span>
        <span className="go btn btn-dark">
          Read the guide
          <span className="ic" aria-hidden="true">
            <span>↗</span>
            <span>↗</span>
          </span>
        </span>
      </span>
      {p.visual === "failover" ? (
      <span className="viz" aria-hidden="true" data-fail={fail ? "" : undefined} onMouseEnter={on} onMouseLeave={off}>
        <span className="bar">
          <span>vrrp_instance VI_1</span>
          <b>● {fail ? "failover" : "normal"}</b>
        </span>
        <span className="dia">
          <span className="node">
            Syslog clients<small>UDP :1539</small>
          </span>
          <span className="flow" />
          <span className="node vip">
            Virtual IP<small>192.168.1.85</small>
          </span>
          <span className="pair">
            <span className="node pri">
              Primary<small>MASTER · 150</small>
              <small className="st">{fail ? "down" : "owns VIP"}</small>
            </span>
            <span className="node bak">
              Secondary<small>BACKUP · 100</small>
              <small className="st">{fail ? "owns VIP" : "standby"}</small>
            </span>
          </span>
          <span className="down">↓</span>
          <span className="node">Falcon LogScale</span>
        </span>
        <span className="cap">{fail ? "Secondary took the VIP. Clients changed nothing." : "Hover to fail the primary"}</span>
      </span>
      ) : (
        <span className="viz outline" aria-hidden="true">
          <span className="bar">
            <span>contents</span>
            <b>● {p.sections} sections</b>
          </span>
          <span className="lines">
            {p.outline.map((t, i) => (
              <span key={t}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {t}
              </span>
            ))}
          </span>
        </span>
      )}
    </TransitionLink>
  )
}

/** Compact row for the rest of the articles. */
export function WritingRow({ p, i }: { p: CardPost; i: number }) {
  return (
    <TransitionLink href={`/writing/${p.slug}`} className="post-row">
      <span className="n">{String(i + 1).padStart(2, "0")}</span>
      <span className="t">
        <Styled text={p.card} />
        <small>{p.summary}</small>
      </span>
      <span className="m">
        {p.date} · {p.minutes} min
      </span>
    </TransitionLink>
  )
}
