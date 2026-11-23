"use client"

import { useRef, type PointerEvent } from "react"
import { profile } from "@/lib/content"
import { delay } from "@/lib/reveal"

/**
 * Greyscale portrait with a colour spotlight that follows the cursor.
 * Two copies of the photo are stacked; the colour copy is masked by a
 * radial gradient centred on the pointer.
 */
export function Portrait() {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType === "touch") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  const alt = `Portrait of ${profile.firstName} ${profile.lastName}`
  return (
    <div className="portrait" data-reveal="rise" style={delay(450)}>
      <div className="portrait-in" ref={ref} onPointerMove={move} onPointerEnter={move}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="base" src="/chhatra-portrait.webp" alt={alt} width={860} height={996} fetchPriority="high" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="colour" src="/chhatra-portrait.webp" alt="" aria-hidden="true" width={860} height={996} />
      </div>
    </div>
  )
}
