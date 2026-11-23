import type { ReactNode } from "react"

type Props = {
  href?: string
  variant?: "dark" | "light"
  external?: boolean
  onClick?: () => void
  children: ReactNode
}

/** Pill button whose arrow slides out and back in on hover. */
export function ArrowButton({ href, variant = "dark", external, onClick, children }: Props) {
  const className = `btn btn-${variant}`
  const inner = (
    <>
      {children}
      <span className="ic" aria-hidden="true">
        <span>↗</span>
        <span>↗</span>
      </span>
    </>
  )
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
