import { articleCard, ogSize } from "@/lib/og-article"
import { getPosts } from "@/lib/writing"

export const size = ogSize
export const contentType = "image/png"
export const alt = "Article by Chhatra Rana"

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export default function Image({ params }: { params: { slug: string } }) {
  return articleCard(params.slug)
}
