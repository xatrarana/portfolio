"use client"

import { useEffect } from "react"

/**
 * Reveals every [data-reveal] element as it scrolls into view by adding `.in`.
 * Elements already on screen at load reveal straight away, so their --d delays
 * play as the intro sequence. Also picks up elements added later (e.g. filters).
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("js")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    const watch = (scope: ParentNode) =>
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((el) => io.observe(el))
    watch(document)
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof HTMLElement && (n.matches("[data-reveal]") ? io.observe(n) : watch(n)))
    })
    mo.observe(document.body, { childList: true, subtree: true })
    // Safety net: never leave content hidden if an observer misses something.
    const t = window.setTimeout(() => document.querySelectorAll("[data-reveal]").forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in")
    }), 2500)
    return () => {
      io.disconnect()
      mo.disconnect()
      window.clearTimeout(t)
    }
  }, [])
  return null
}
