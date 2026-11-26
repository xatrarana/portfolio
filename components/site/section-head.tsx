import type { ReactNode } from "react"
import { delay } from "@/lib/reveal"

/** "/Label" heading with a large outlined ghost word behind it. */
export function SectionHead({
  ghost,
  label,
  aside,
  align = "center",
  as: Tag = "h2",
}: {
  ghost: string
  label: string
  aside?: ReactNode
  align?: "center" | "left"
  /** h1 when the section heading is the page's main heading. */
  as?: "h1" | "h2"
}) {
  return (
    <div className={`sec-head${align === "left" ? " left" : ""}`}>
      <span className="ghost-wrap" aria-hidden="true" data-reveal="fade" style={delay(0)}>
        <span className="ghost">{ghost}</span>
      </span>
      <Tag className="slash" data-reveal style={delay(120)}>
        /{label}
      </Tag>
      {aside ? (
        <span className="sub" data-reveal style={delay(240)}>
          {aside}
        </span>
      ) : null}
    </div>
  )
}
