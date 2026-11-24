import Script from "next/script"
import { Nav } from "@/components/site/nav"
import { Hero } from "@/components/site/hero"
import { Work } from "@/components/site/work"
import { Services } from "@/components/site/services"
import { Experience } from "@/components/site/experience"
import { Certifications } from "@/components/site/certifications"
import { Writing } from "@/components/site/writing"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/site-footer"
import { profile } from "@/lib/content"

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
      <Nav />
      <main className="cover">
        <Hero />
        <Work />
        <Services />
        <Experience />
        <Certifications />
        <Writing />
        <Contact after="light" />
      </main>
      <Footer />
    </>
  )
}
