"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/** Inertia scrolling for the whole site, like the reference. Off for reduced motion and touch. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -80 }, autoRaf: true })
    window.__lenis = lenis
    return () => {
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
  return null
}
