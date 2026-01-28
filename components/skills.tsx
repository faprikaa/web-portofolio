"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Server, Database, Cloud, Smartphone, Wrench } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 className="h-5 w-5" />,
      skills: ["React", "Vue", "Next.js", "Tailwind", "TypeScript", "HTML/CSS", "jQuery", "Material UI"],
    },
    {
      title: "Backend",
      icon: <Server className="h-5 w-5" />,
      skills: ["Laravel", "Node.js", "Express", "Python", "Django"],
    },
    {
      title: "Database",
      icon: <Database className="h-5 w-5" />,
      skills: ["PostgreSQL", "MySQL", "Redis", "Supabase", "Firebase", "Prisma", "Mongoose"],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="h-5 w-5" />,
      skills: ["GCP", "AWS", "Docker", "Cloudflare", "CI/CD", "GitHub Actions", "Nginx", "Linux"],
    },
    {
      title: "Native",
      icon: <Smartphone className="h-5 w-5" />,
      skills: ["Kotlin", "Tauri", "C++", "C#", "Java"],
    },
    {
      title: "Tools & Others",
      icon: <Wrench className="h-5 w-5" />,
      skills: ["Git", "Figma", "Postman", "REST APIs", "Swagger"],
    },
  ]

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-2">My Skills</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background border"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      {category.icon}
                    </span>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
