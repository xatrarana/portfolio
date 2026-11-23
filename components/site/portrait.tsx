"use client"

import { useRef } from "react"
import { profile } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { useFollow } from "./use-follow"

/**
 * Greyscale portrait with a colour spotlight that glides after the cursor.
 * Two copies of the photo are stacked; the colour copy is masked by a
 * radial gradient centred on the eased pointer position.
 */
export function Portrait() {
  const ref = useRef<HTMLDivElement>(null)
  const follow = useFollow(ref, { vars: ["--mx", "--my"], ease: 0.14 })
  const alt = `Portrait of ${profile.firstName} ${profile.lastName}`
  return (
    <div className="portrait" data-reveal="rise" style={delay(450)}>
      <div className="portrait-in" ref={ref} {...follow}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="base" src="/chhatra-portrait.webp" alt={alt} width={860} height={996} fetchPriority="high" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="colour" src="/chhatra-portrait.webp" alt="" aria-hidden="true" width={860} height={996} />
      </div>
    </div>
  )
}
