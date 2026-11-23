import Script from "next/script"
import { Nav } from "@/components/site/nav"
import { Hero } from "@/components/site/hero"
import { Work } from "@/components/site/work"
import { Services } from "@/components/site/services"
import { Experience } from "@/components/site/experience"
import { Contact, Footer } from "@/components/site/contact"
import { profile } from "@/lib/content"
import { Motion } from "@/components/site/motion"

export default function Home() {
  return (
    <>
      <Script id="ld-json" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Chhatra Bahadur Rana",
          url: "https://chhatrarana.com.np",
          jobTitle: profile.role,
          worksFor: [
            { "@type": "Organization", name: "Raechal Enterprise" },
            { "@type": "Organization", name: "Astoria Company" },
          ],
          address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
          sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
          description: profile.intro,
        })}
      </Script>
      <Motion />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
