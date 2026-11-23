import type { ReactNode } from "react"
import { delay } from "@/lib/reveal"

/** "/Label" heading with a large outlined ghost word behind it. */
export function SectionHead({ ghost, label, aside, align = "center" }: { ghost: string; label: string; aside?: ReactNode; align?: "center" | "left" }) {
  return (
    <div className={`sec-head${align === "left" ? " left" : ""}`}>
      <span className="ghost-wrap" aria-hidden="true" data-reveal="fade" style={delay(0)}>
        <span className="ghost">{ghost}</span>
      </span>
      <h2 className="slash" data-reveal style={delay(120)}>
        /{label}
      </h2>
      {aside ? (
        <span className="sub" data-reveal style={delay(240)}>
          {aside}
        </span>
      ) : null}
    </div>
  )
}
