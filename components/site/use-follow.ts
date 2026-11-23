"use client"

import { useCallback, useEffect, useRef, type PointerEvent, type RefObject } from "react"

type Options = {
  /** Fraction of the remaining distance covered each frame (0–1). Lower is smoother. */
  ease?: number
  /** CSS custom properties that receive the x and y positions, in px. */
  vars?: [string, string]
  /** "local" measures from the target element's box; "viewport" uses clientX/Y. */
  space?: "local" | "viewport"
  /** Element that receives the CSS variables, if different from the measured one. */
  output?: RefObject<HTMLElement | null>
}

/**
 * Smoothly eases CSS position variables towards the pointer with
 * requestAnimationFrame, so cursor-following effects glide instead of snapping.
 */
export function useFollow<T extends HTMLElement>(ref: RefObject<T | null>, { ease = 0.16, vars = ["--x", "--y"], space = "local", output }: Options = {}) {
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)
  const active = useRef(false)

  const write = useCallback(() => {
    const el = output?.current ?? ref.current
    if (!el) return
    el.style.setProperty(vars[0], `${current.current.x.toFixed(2)}px`)
    el.style.setProperty(vars[1], `${current.current.y.toFixed(2)}px`)
  }, [output, ref, vars])

  const tick = useCallback(() => {
    const c = current.current
    const t = target.current
    c.x += (t.x - c.x) * ease
    c.y += (t.y - c.y) * ease
    write()
    if (Math.abs(t.x - c.x) > 0.1 || Math.abs(t.y - c.y) > 0.1) {
      frame.current = requestAnimationFrame(tick)
    } else {
      frame.current = null
    }
  }, [ease, write])

  const update = useCallback(
    (e: PointerEvent<HTMLElement>, snap = false) => {
      if (e.pointerType === "touch") return
      let x = e.clientX
      let y = e.clientY
      if (space === "local" && ref.current) {
        const r = ref.current.getBoundingClientRect()
        x -= r.left
        y -= r.top
      }
      target.current = { x, y }
      if (snap || !active.current) {
        current.current = { x, y }
        active.current = true
        write()
      }
      if (frame.current === null) frame.current = requestAnimationFrame(tick)
    },
    [ref, space, tick, write],
  )

  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
  }, [])

  return {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => update(e, !active.current),
    onPointerMove: (e: PointerEvent<HTMLElement>) => update(e),
    onPointerLeave: () => {
      active.current = false
    },
  }
}
