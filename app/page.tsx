import { Nav } from "@/components/site/nav"
import { Hero } from "@/components/site/hero"
import { Work } from "@/components/site/work"
import { Services } from "@/components/site/services"
import { Experience } from "@/components/site/experience"
import { Certifications } from "@/components/site/certifications"
import { Writing } from "@/components/site/writing"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/site-footer"
import { JsonLd } from "@/components/site/json-ld"
import { homeLd } from "@/lib/seo"

export default function Home() {
  return (
    <>
      <JsonLd data={homeLd()} />
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
