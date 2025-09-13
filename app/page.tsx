import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Chatbot } from "@/components/chatbot"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Muammar Mufid Darmindra',
            url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
            image: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/placeholder-user.jpg`,
            jobTitle: 'Fullstack Developer & Cloud Engineer',
            sameAs: [
              'https://github.com/',
              'https://www.linkedin.com/',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'Independent',
            },
          }),
        }}
      />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Chatbot />
        <Contact />
      </main>
    </div>
  )
}
