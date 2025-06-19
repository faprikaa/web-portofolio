import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      title: "Senior Fullstack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description:
        "Lead development of enterprise web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.",
      technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
    },
    {
      title: "Fullstack Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      period: "2020 - 2022",
      description:
        "Built and maintained multiple client projects from concept to deployment. Collaborated with design and product teams to deliver high-quality solutions.",
      technologies: ["Vue.js", "Python", "Django", "MongoDB", "Redis"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "Remote",
      period: "2019 - 2020",
      description:
        "Developed responsive web applications and e-commerce platforms. Optimized performance and implemented modern frontend practices.",
      technologies: ["React", "TypeScript", "Sass", "Webpack", "Jest"],
    },
    {
      title: "Junior Web Developer",
      company: "WebDev Studio",
      location: "Los Angeles, CA",
      period: "2018 - 2019",
      description:
        "Started career building websites and learning full-stack development. Gained experience in both frontend and backend technologies.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
  ]

  return (
    <section id="experience" className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and key achievements
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-card to-card/80 border-primary/10"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">{exp.company}</CardDescription>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tech}
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
