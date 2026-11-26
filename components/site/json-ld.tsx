/**
 * Structured data for search engines. Rendered as a plain <script> in the
 * server HTML (not next/script) so crawlers see it without running JS.
 */
export function JsonLd({ data }: { data: object }) {
  // Escape "<" so a value can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c")
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
