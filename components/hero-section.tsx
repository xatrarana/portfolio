"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin, Shield, Code } from "lucide-react"
import { ParticleBackground } from "./particle-background"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <Image
                src="/me.webp"
                alt="Chhatra Rana"
                width={128}
                height={128}
                className="rounded-full border-4 border-primary animate-pulse-glow"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full">
                <Shield className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-accent text-accent-foreground p-2 rounded-full">
                <Code className="w-4 h-4" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Chhatra <span className="text-primary">Rana</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            Software Developer & Cybersecurity Enthusiast
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Bridging the gap between secure development practices and innovative software solutions. I build robust
            applications while training the next generation of cybersecurity professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="group">
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button variant="outline" size="lg" className="group bg-transparent cursor-pointer"
             onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
            >
              <Mail className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Contact Me
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/xatrarana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://np.linkedin.com/in/chhatra-rana-73b5991b1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
