"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const developmentSkills = [
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    ".NET",
    "php (Laravel)",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "AWS",
  ]

  const securitySkills = [
    "NIDS Development",
    "Snort",
    "Wazuh SIEM",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Secure Code Review",
    "Network Security",
    "Incident Response",
    "Security Architecture",
    "Risk Assessment",
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-card/50">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Technical <span className="text-primary">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className={`text-primary transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <path d="M45 10L25 35H35L30 70L50 45H40L45 10Z" fill="currentColor" className="animate-pulse" />
              <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
            </svg>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 relative">
            <Card
              className={`p-8 hover:shadow-2xl transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold">Software Development</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Proficient in modern full-stack development with adaptable expertise across JavaScript, .NET, and PHP (Laravel), delivering scalable and maintainable solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                {developmentSkills.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className={`hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card
              className={`p-8 hover:shadow-2xl transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold">Cybersecurity</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Comprehensive security practices including NIDS development, SIEM implementation, and threat assessment
                with hands-on training experience.
              </p>
              <div className="flex flex-wrap gap-2">
                {securitySkills.map((skill, index) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className={`hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
