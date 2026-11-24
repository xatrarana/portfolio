import type { ReactNode } from "react"
import { TransitionLink } from "./page-transition"

type Props = {
  href?: string
  variant?: "dark" | "light"
  external?: boolean
  onClick?: () => void
  /** Downloads the file at href instead of opening it; the arrow points down. */
  download?: boolean
  children: ReactNode
}

/** Pill button whose arrow slides out and back in on hover. */
export function ArrowButton({ href, variant = "dark", external, onClick, download, children }: Props) {
  const className = `btn btn-${variant}${download ? " btn-dl" : ""}`
  const arrow = download ? "↓" : "↗"
  const inner = (
    <>
      {children}
      <span className="ic" aria-hidden="true">
        <span>{arrow}</span>
        <span>{arrow}</span>
      </span>
    </>
  )
  if (href && download) {
    return (
      <a className={className} href={href} download>
        {inner}
      </a>
    )
  }
  if (href?.startsWith("/")) {
    return (
      <TransitionLink className={className} href={href}>
        {inner}
      </TransitionLink>
    )
  }
  if (href) {
    return (
      <a className={className} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {inner}
    </button>
  )
}
