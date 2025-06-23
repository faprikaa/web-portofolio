import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Chatbot } from "@/components/chatbot"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { InfiniteProjects } from "@/components/infinite-projects"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <InfiniteProjects />
        <Experience />
        <Chatbot />
        <Contact />
      </main>
    </div>
  )
}
