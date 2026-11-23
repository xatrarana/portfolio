"use client"

import { useEffect, useRef } from "react"
import { profile } from "@/lib/content"
import { TransitionLink } from "./page-transition"

const N = 9 // rope points

/**
 * Footer that sits underneath the page and is uncovered as the last section
 * scrolls away. A lanyard ID badge hangs over the giant name: it sways on a
 * small rope simulation, can be grabbed and flung, and the cursor brushing
 * past the strap nudges it.
 */
export function Footer() {
  const foot = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const badge = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = foot.current
    const cv = canvas.current
    const card = badge.current
    const ctx = cv?.getContext("2d")
    if (!el || !cv || !card || !ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    type P = { x: number; y: number; px: number; py: number }
    let pts: P[] = []
    let seg = 0, W = 0, H = 0, dpr = 1, ax = 0
    let drag: { x: number; y: number } | null = null
    const mouse = { x: -999, y: -999, vx: 0, vy: 0 }
    let raf = 0
    let visible = false

    const layout = () => {
      W = el.clientWidth
      H = el.clientHeight
      dpr = Math.min(2, window.devicePixelRatio || 1)
      cv.width = W * dpr
      cv.height = H * dpr
      ax = W * (W < 640 ? 0.62 : 0.6)
      const prev = seg
      seg = Math.min(H * (W < 640 ? 0.3 : 0.34), 320) / (N - 1)
      if (!pts.length || Math.abs(prev - seg) > 1) {
        pts = Array.from({ length: N }, (_, i) => ({ x: ax + i * 3, y: i * seg, px: ax + i * 3 - (i ? 6 : 0), py: i * seg }))
      }
    }

    const step = () => {
      for (let i = 1; i < N; i++) {
        const p = pts[i]
        const vx = (p.x - p.px) * 0.985
        const vy = (p.y - p.py) * 0.985
        p.px = p.x
        p.py = p.y
        p.x += vx
        p.y += vy + 0.55
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        if (!drag && dx * dx + dy * dy < 3600) {
          p.x += mouse.vx * 0.06
          p.y += mouse.vy * 0.03
        }
      }
      if (drag) {
        const e = pts[N - 1]
        e.x += (drag.x - e.x) * 0.5
        e.y += (drag.y - e.y) * 0.5
      }
      for (let k = 0; k < 14; k++) {
        pts[0].x = ax
        pts[0].y = 0
        for (let i = 0; i < N - 1; i++) {
          const a = pts[i], b = pts[i + 1]
          const dx = b.x - a.x, dy = b.y - a.y
          const d = Math.hypot(dx, dy) || 0.001
          const diff = (d - seg) / d
          if (i === 0) {
            b.x -= dx * diff
            b.y -= dy * diff
          } else {
            a.x += dx * diff * 0.5
            a.y += dy * diff * 0.5
            b.x -= dx * diff * 0.5
            b.y -= dy * diff * 0.5
          }
        }
      }
      mouse.vx *= 0.8
      mouse.vy *= 0.8
    }

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      const path = () => {
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < N - 1; i++) {
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[i + 1].x) / 2, (pts[i].y + pts[i + 1].y) / 2)
        }
        ctx.lineTo(pts[N - 1].x, pts[N - 1].y)
      }
      path()
      ctx.strokeStyle = "#0d0d0d"
      ctx.lineWidth = 16
      ctx.stroke()
      path()
      ctx.strokeStyle = "#3a3a3c"
      ctx.lineWidth = 12
      ctx.stroke()
      ctx.setLineDash([4, 6])
      path()
      ctx.strokeStyle = "rgba(255,255,255,.35)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])
      const e = pts[N - 1], p = pts[N - 2]
      const ang = Math.atan2(e.x - p.x, e.y - p.y)
      ctx.save()
      ctx.translate(e.x, e.y)
      ctx.rotate(-ang)
      ctx.fillStyle = "#bdbdbd"
      ctx.fillRect(-7, -6, 14, 12)
      ctx.fillStyle = "#7a7a7a"
      ctx.fillRect(-4, 4, 8, 6)
      ctx.restore()
      const hw = card.offsetWidth
      card.style.transformOrigin = `${hw / 2}px 8px`
      card.style.transform = `translate3d(${e.x - hw / 2}px, ${e.y - 2}px, 0) rotate(${-ang}rad)`
    }

    const loop = () => {
      step()
      draw()
      raf = visible ? requestAnimationFrame(loop) : 0
    }
    const settle = () => {
      for (let i = 0; i < 400; i++) step()
      draw()
    }

    const local = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return { x: ev.clientX - r.left, y: ev.clientY - r.top }
    }
    const down = (ev: PointerEvent) => {
      card.setPointerCapture(ev.pointerId)
      drag = local(ev)
      ev.preventDefault()
    }
    const moveCard = (ev: PointerEvent) => {
      if (drag) drag = local(ev)
    }
    const up = () => {
      drag = null
      if (reduce) settle()
    }
    const moveFoot = (ev: PointerEvent) => {
      const q = local(ev)
      if (mouse.x > -900) {
        mouse.vx = q.x - mouse.x
        mouse.vy = q.y - mouse.y
      }
      mouse.x = q.x
      mouse.y = q.y
      if (reduce && drag) {
        step()
        draw()
      }
    }
    const leave = () => {
      mouse.x = mouse.y = -999
    }
    const resize = () => {
      layout()
      check()
      if (reduce || !visible) settle()
    }

    layout()
    settle()
    pts.forEach((p, i) => {
      if (i) p.px = p.x - 10
    })

    // The footer is pinned behind the page the whole time, so only simulate once
    // the page above has scrolled far enough to uncover it.
    const check = () => {
      const cover = el.previousElementSibling as HTMLElement | null
      visible = !cover || cover.getBoundingClientRect().bottom < window.innerHeight
      if (visible && !reduce && !raf) raf = requestAnimationFrame(loop)
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    card.addEventListener("pointerdown", down)
    card.addEventListener("pointermove", moveCard)
    card.addEventListener("pointerup", up)
    card.addEventListener("pointercancel", up)
    el.addEventListener("pointermove", moveFoot)
    el.addEventListener("pointerleave", leave)
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", check)
      card.removeEventListener("pointerdown", down)
      card.removeEventListener("pointermove", moveCard)
      card.removeEventListener("pointerup", up)
      card.removeEventListener("pointercancel", up)
      el.removeEventListener("pointermove", moveFoot)
      el.removeEventListener("pointerleave", leave)
      window.removeEventListener("resize", resize)
    }
  }, [])

  const links = [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Experience", href: "/#experience" },
    ...profile.socials.filter((s) => s.label === "GitHub" || s.label === "LinkedIn").map((s) => ({ label: s.label, href: s.href })),
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <footer className="foot" ref={foot}>
      <canvas ref={canvas} className="rope" aria-hidden="true" />
      <nav className="foot-links wrap" aria-label="Footer">
        {links.map((l) =>
          l.href.startsWith("http") ? (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ) : (
            <TransitionLink key={l.label} href={l.href}>
              {l.label}
            </TransitionLink>
          ),
        )}
      </nav>
      <div className="foot-stage">
        <div className="foot-mark wrap" aria-label={`${profile.firstName} ${profile.lastName}`}>
          <svg viewBox="0 0 1000 250" aria-hidden="true">
            <text className="w1" x="0" y="105" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="122">
              {profile.firstName}
            </text>
            <text className="w2" x="0" y="245" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="140">
              {profile.lastName}
            </text>
          </svg>
        </div>
      </div>
      <div className="foot-legal wrap">
        <span>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName} · {profile.location}
        </span>
        <span>{profile.email}</span>
        <button type="button" onClick={() => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}>
          Back to top ↑
        </button>
      </div>
      <div className="id-badge" ref={badge} role="img" aria-label={`ID badge: ${profile.firstName} ${profile.lastName}, ${profile.role}. Drag it to swing.`}>
        <div className="slot" />
        <div className="ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/chhatra-badge.webp" alt="" width={400} height={449} draggable={false} loading="lazy" />
        </div>
        <b>
          {profile.firstName} {profile.lastName}
        </b>
        <small>{profile.role}</small>
        <div className="id-foot">
          <span>{profile.location}</span>
          <i />
        </div>
      </div>
    </footer>
  )
}
