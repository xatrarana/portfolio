import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { TimelineSection } from "@/components/timeline-section"
import { Web3Section } from "@/components/web3-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import Script from "next/script"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Script id="ld-json" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Chhatra Bahadur Rana',
          url: 'https://chhatrarana.com.np',
          jobTitle: 'Software Developer & Cybersecurity Enthusiast',
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance / Remote',
          },
          sameAs: [
            'https://github.com/yourusername',
            'https://linkedin.com/in/yourusername',
            'https://twitter.com/yourusername',
          ],
          description:
            'software developer and Certified cybersecurity and enthusiast with expertise in secure development, .NET, Laravel, and JavaScript.',
        })}
      </Script>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
      {/* <Web3Section /> */}
      <ContactSection />
      <Footer />
    </main>
  )
}
