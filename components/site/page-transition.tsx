"use client"

import { useEffect, type MouseEvent, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"

const OUT_MS = 520

function jumpTo(hash: string) {
  const el = hash ? document.getElementById(hash.slice(1)) : null
  const top = el ? el.getBoundingClientRect().top + window.scrollY - 80 : 0
  if (window.__lenis) window.__lenis.scrollTo(top, { immediate: true, force: true })
  else window.scrollTo(0, top)
}

/**
 * Full-screen veil that fades in when leaving a page and back out once the next
 * page has rendered, so moving between the home page and a project feels like
 * one continuous piece rather than a hard cut.
 */
export function PageTransition() {
  const pathname = usePathname()
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains("leaving")) return
    jumpTo(window.location.hash)
    const id = window.setTimeout(() => root.classList.remove("leaving"), 60)
    return () => window.clearTimeout(id)
  }, [pathname])
  return <div className="veil" aria-hidden="true" />
}

/** Internal link that plays the page transition before navigating. */
export function TransitionLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; "aria-label"?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const url = new URL(href, window.location.href)
    if (url.pathname === pathname) {
      // Same page: just glide to the section.
      if (url.hash) {
        e.preventDefault()
        const el = document.getElementById(url.hash.slice(1))
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" })
        history.replaceState(null, "", url.hash)
      }
      return
    }
    e.preventDefault()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.documentElement.classList.add("leaving")
    window.setTimeout(() => router.push(url.pathname + url.hash, { scroll: false }), reduce ? 0 : OUT_MS)
  }
  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}
