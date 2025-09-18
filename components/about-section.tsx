"use client"

import { Card } from "@/components/ui/card"
import { Shield, Code, Users, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey began in software development, where I discovered my passion for creating secure, scalable
              applications. Over the years, I've evolved into a dual-role professional, combining hands-on development
              with cybersecurity training.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              As a certified cybersecurity enthusiast, I’ve been trained in secure development practices and have had the privilege of delivering sessions on secure coding, threat modeling, and defensive programming. My approach bridges the gap between theoretical security concepts and their real-world application.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, I specialize in building applications with security-first principles while training development
              teams to think like attackers and code like defenders.
            </p>

           
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Code className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Development</h3>
              <p className="text-sm text-muted-foreground">Full-stack applications with modern frameworks</p>
            </Card>

            <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">Penetration testing and vulnerability assessment</p>
            </Card>

            <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Training</h3>
              <p className="text-sm text-muted-foreground">Corporate workshops and certification programs</p>
            </Card>

            <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Consulting</h3>
              <p className="text-sm text-muted-foreground">Security architecture and code reviews</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
