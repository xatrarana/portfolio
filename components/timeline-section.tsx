"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export function TimelineSection() {
  const experiences = [
    {
      year: "Aug 2025 - Present",
      title: "Software Engineer",
      company: "Astoria Company Texas, USA",
      description:
        "Working with lead management software optimization and refactoring. Implementing AWS services and Kubernetes pod management for scalable lead processing systems with database optimization.",
      technologies: ["AWS", "Kubernetes", "Database Optimization", "Lead Management", "Code Refactoring"],
      achievements: [
        "Optimized lead processing performance",
        "Implemented scalable AWS architecture",
        "Enhanced database query efficiency",
      ],
    },
    {
      year: "Aug 2025 - Nov 2025",
      title: "Cybersecurity Analyst Intern",
      company: "Security Training Program",
      description:
        "Intensive cybersecurity internship focused on Network Intrusion Detection Systems (NIDS) development using Snort and open-source Wazuh SIEM implementation. Gained hands-on experience in threat detection and security monitoring.",
      technologies: ["Snort", "Wazuh SIEM", "NIDS", "Network Security", "Threat Detection", "Security Monitoring"],
      achievements: [
        "Developed 2 NIDS projects using Snort",
        "Implemented Wazuh SIEM solution",
        "Enhanced threat detection capabilities",
      ],
    },
    {
      year: "Apr 2024 - Jul 2024",
      title: ".NET Developer",
      company: "Aarshia Infotech, Kathmandu",
      description:
        "Contributed to large-scale software projects including management and data management systems using .NET technologies. Gained experience in implementing scalable, maintainable, and secure code while learning various design patterns and best practices.",
      technologies: [".NET", "C#", "SQL Server", "Design Patterns", "Secure Coding", "Data Management"],
      achievements: [
        "Contributed to enterprise-scale projects",
        "Implemented secure coding practices",
        "Applied design patterns and best practices",
      ],
    },
    {
      year: "Jul 2023 - Aug 2023",
      title: "Full-Stack Developer (Contract)",
      company: "NexSewa Pvt. Ltd, Kathmandu",
      description:
        "Worked as a full-stack developer on contract basis. Developed and managed backend services for tourism promotion application using Node.js, ensuring scalable and efficient RESTful APIs.",
      technologies: ["Node.js", "RESTful APIs", "Tourism App", "Backend Development", "API Design"],
      achievements: [
        "Built scalable tourism promotion platform",
        "Designed efficient RESTful APIs",
        "Delivered project within contract timeline",
      ],
    },
    {
      year: "May 2022 - May 2023",
      title: "Full-Stack Developer",
      company: "CastellTech Pvt. Ltd, Sinamangal, Kathmandu",
      description:
        "Developed and maintained backend systems using JavaScript and Node.js, ensuring scalable and efficient code. Implemented robust authentication mechanisms with JWT and applied various security measures.",
      technologies: ["JavaScript", "Node.js", "JWT Authentication", "Security Implementation", "Backend Systems"],
      achievements: [
        "Built secure authentication systems",
        "Implemented JWT-based security",
        "Maintained scalable backend infrastructure",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Professional <span className="text-primary">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A timeline of projects where secure development practices and innovative solutions were at the forefront
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:transform md:-translate-x-2 z-10"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} ml-12 md:ml-0`}>
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center mb-3">
                      <Calendar className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm font-medium text-primary">{exp.year}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Achievements:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
