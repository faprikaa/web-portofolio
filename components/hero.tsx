"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Briefcase } from "lucide-react"

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-background"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Status */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-primary">Available for opportunities</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground animate-fade-in-delay-1">
            Fullstack Developer
          </h1>
          <p className="text-xl md:text-2xl text-primary mb-6 animate-fade-in-delay-2">
            & Cloud Engineer
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-delay-3">
            Crafting digital experiences with modern technologies. Passionate about clean code, user experience, and innovative solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-delay-4">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => scrollToProjects()}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => window.open("/documents/english/Eng-Muammar_Mufid_Darmindra-resume1108.pdf", "_blank")}
            >
              Download CV (EN)
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => window.open("/documents/indonesia/Muammar_Mufid_Darmindra-resume1108.pdf", "_blank")}
            >
              Download CV (ID)
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-lg hover:bg-primary/10 hover:scale-105 transition-all"
              onClick={() => window.open("https://career.toyota.co.id/profile/muammar-mufid-darmindra-tyruccd62nm0qu1s", "_blank")}
            >
              <Briefcase className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-lg hover:bg-primary/10 hover:scale-105 transition-all"
              onClick={() => window.open("https://github.com/faprikaa", "_blank")}
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-lg hover:bg-primary/10 hover:scale-105 transition-all"
              onClick={() => window.open("https://www.linkedin.com/in/muammar-mufid/", "_blank")}
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-lg hover:bg-primary/10 hover:scale-105 transition-all"
              onClick={() => window.open("mailto:muammarm28@gmail.com", "_blank")}
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
