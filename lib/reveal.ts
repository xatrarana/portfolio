import type { CSSProperties } from "react"

/** Inline style for a reveal delay, in milliseconds. */
export const delay = (ms: number): CSSProperties => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties
