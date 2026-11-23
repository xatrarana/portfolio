import type { ReactNode } from "react"

/** "/Label" heading with a large outlined ghost word drifting behind it. */
export function SectionHead({ ghost, label, aside, align = "center" }: { ghost: string; label: string; aside?: ReactNode; align?: "center" | "left" }) {
  return (
    <div className={`sec-head${align === "left" ? " left" : ""}`}>
      <span className="ghost" aria-hidden="true">
        {ghost}
      </span>
      <h2 className="slash">/{label}</h2>
      {aside ? <span className="sub">{aside}</span> : null}
    </div>
  )
}
