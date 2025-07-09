"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

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
      className="h-screen flex items-center justify-center relative bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Fullstack Developer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crafting digital experiences with modern technologies. Passionate about clean code, user experience, and
            innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 shadow-lg" onClick={() => scrollToProjects()}>
              View My Work
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 shadow-lg" onClick={() => window.open("/documents/Muammar_Mufid_Darmindra-resume0807.pdf", "_blank")}>
              Download CV
            </Button>
          </div>
          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 hover:bg-primary/10 hover:scale-110 transition-all"
              onClick={() => window.open("https://career.toyota.co.id/profile/muammar-mufid-darmindra-tyruccd62nm0qu1s", "_blank")}
            >
              TMMIN<br/>Profile
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 hover:bg-primary/10 hover:scale-110 transition-all"
              onClick={() => window.open("https://github.com/faprikaa", "_blank")}
            >
              <Github className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 hover:bg-primary/10 hover:scale-110 transition-all"
              onClick={() => window.open("https://www.linkedin.com/in/muammar-mufid/", "_blank")}
            >
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 hover:bg-primary/10 hover:scale-110 transition-all"
              onClick={() => window.open("mailto:muammarm28@gmail.com", "_blank")}
            >
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
