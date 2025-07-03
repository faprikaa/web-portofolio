"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import AnimatedList from "./animated-list"

interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
}

export function Experience() {
  const experiences = [
    {
      title: "Intern Fullstack Programmer",
      company: "PT Medika Digital Nusantara",
      location: "Yogyakarta, Indonesia",
      period: "Jun 2025 – Aug 2025",
      description:
      "Contributed to the development of a human resource web application as a fullstack developer. Collaborated in a 5-person team and focused on adding new features, fixing bugs, and managing Git workflows with proper branching. Built a complex custom document template generation feature. Participated in CI/CD-based deployments and coordinated with QA for testing assignments.",
      technologies: ["Laravel", "Bootstrap 5", "MySQL", "Git", "CI/CD", "HR System"],
    },
    {
      title: "Intern Fullstack Programmer",
      company: "Horus Technology",
      location: "Yogyakarta, Indonesia",
      period: "Nov 2024 – May 2025",
      description:
        "Built backend services using Flask and SQLAlchemy with PostgreSQL. Converted UI designs from Figma to Vue.js. Deployed applications to Google Cloud Run and set up environment configurations. Integrated CI/CD pipelines for automatic deployment. Maintained legacy apps built in CakePHP and documented APIs using Apidog.",
      technologies: ["Flask", "Vue.js", "SQLAlchemy", "PostgreSQL", "Google Cloud Run", "CI/CD", "CakePHP", "Apidog"],
    },
    {
      title: "Project-Based Programmer & Cloud Engineer",
      company: "Muslimat NU Yogyakarta",
      location: "Yogyakarta, Indonesia",
      period: "Jan 2024 – Feb 2025",
      description:
        "Developed an admin dashboard in Laravel for organizational database management. Built and customized a WordPress-based website to showcase activities and structure. Trained 15+ non-technical users and deployed the project on VPS using aaPanel and Nginx.",
      technologies: ["Laravel", "WordPress", "Elementor", "ACF", "Code Snippets", "aaPanel", "Nginx", "VPS"],
    },
    {
      title: "Mobile Programmer & Cloud Engineer Student",
      company: "Bangkit Academy",
      location: "Remote, Indonesia",
      period: "Aug 2023 – Jan 2024",
      description:
        "Created CropOptima, a Kotlin-based mobile app that recommends crops based on location and weather data. Hosted the backend API on VPS Ubuntu with Nginx. Integrated a custom Machine Learning model. Worked in a 6-person Agile team. Selected as Top 50 National Capstone Project.",
      technologies: ["Kotlin", "Machine Learning", "Nginx", "VPS", "Ubuntu", "Agile", "SDLC"],
    },
    {
      title: "Freelance Developer & Cloud Engineer",
      company: "Metakarya",
      location: "Malang, Indonesia",
      period: "Aug 2023 – Aug 2024",
      description:
        "Built a web-based Point of Sales system using Laravel and Bootstrap 5. Features include inventory, customer, supplier, and financial management. Led a 3-person team, handled deployment to VPS with subdomain, SSL, and manual backup configuration.",
      technologies: ["Laravel", "Bootstrap 5", "MySQL", "VPS", "SSL", "System Admin"],
    },
    {
      title: "IoT Engineer Student",
      company: "Samsung Innovation Campus",
      location: "Remote, Indonesia",
      period: "Dec 2024 – May 2025",
      description:
        "Developed IoT devices using ESP32, solar panels, and speaker systems. Programmed microcontrollers in C++ using MQTT and HTTP protocols. Integrated real-time bird detection using AI. Managed data streams for monitoring and alerts. Selected as Top 20 National Project.",
      technologies: ["ESP32", "MQTT", "C++", "HTTP", "AI Integration", "Real-time Systems"],
    },
  ];

  // Convert experiences to formatted strings for AnimatedList
  const experienceItems = experiences.map((exp) => {
    return `${exp.title} • ${exp.company} • ${exp.period}`
  })

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(experiences[0])

  const handleItemSelect = (item: string, index: number) => {
    setSelectedExperience(experiences[index])
  }

  return (
    <section id="experience" className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and key achievements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Animated List */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Experience Timeline </h3>
              <AnimatedList
                items={experienceItems}
                onItemSelect={handleItemSelect}
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={false}
                initialSelectedIndex={0}
                className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-primary/10 rounded-lg p-2"
                itemClassName="transition-all duration-300"
              />
            </div>

            {/* Right Side - Experience Details */}
            <div className="space-y-6">
            <p className="text-sm text-muted-foreground mb-6">Scroll to see more details or click on the timeline</p>
              {selectedExperience && (
                <div className="bg-gradient-to-r from-card to-card/80 border border-primary/10 rounded-lg p-6 shadow-lg">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-primary mb-2">{selectedExperience.title}</h3>
                    <h4 className="text-xl font-semibold mb-3">{selectedExperience.company}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {selectedExperience.period}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedExperience.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{selectedExperience.description}</p>

                  <div>
                    <h5 className="font-semibold mb-3">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
