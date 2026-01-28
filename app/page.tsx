import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Chatbot } from "@/components/chatbot"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://muammar.pages.dev'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/#person`,
  name: 'Muammar Mufid Darmindra',
  givenName: 'Muammar',
  familyName: 'Darmindra',
  url: baseUrl,
  image: {
    '@type': 'ImageObject',
    url: `${baseUrl}/og-image.png`,
    width: 1200,
    height: 630,
  },
  jobTitle: 'Fullstack Developer & Cloud Engineer',
  description: 'Professional Fullstack Developer & Cloud Engineer specializing in Next.js, TypeScript, React, and cloud infrastructure.',
  knowsAbout: [
    'Fullstack Development',
    'Cloud Engineering',
    'Next.js',
    'TypeScript',
    'React',
    'Node.js',
    'Cloud Computing',
    'Web Development'
  ],
  sameAs: [
    'https://github.com/muammarmufid',
    'https://www.linkedin.com/in/muammarmufid',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Independent',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  url: baseUrl,
  name: 'Muammar Mufid Darmindra Portfolio',
  description: 'Professional portfolio of Muammar Mufid Darmindra - Fullstack Developer & Cloud Engineer',
  publisher: {
    '@id': `${baseUrl}/#person`,
  },
  inLanguage: ['en-US', 'id-ID'],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/#webpage`,
  url: baseUrl,
  name: 'Muammar Mufid Darmindra — Fullstack Developer & Cloud Engineer',
  description: 'Professional Fullstack Developer & Cloud Engineer specializing in Next.js, TypeScript, React, and cloud infrastructure.',
  isPartOf: {
    '@id': `${baseUrl}/#website`,
  },
  about: {
    '@id': `${baseUrl}/#person`,
  },
  mainEntity: {
    '@id': `${baseUrl}/#person`,
  },
  inLanguage: 'en-US',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ],
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema, webPageSchema, breadcrumbSchema]),
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
