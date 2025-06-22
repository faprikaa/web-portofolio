import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "HTML",
        "CSS",
        "Tailwind",
        "React",
        "Vue",
        "jQuery",
        "Bootstrap",
        "Material UI",
      ],
    },
    {
      title: "Backend",
      skills: [
        "Laravel",
        "Node.js",
        "Express",
        "Python",
        "Django",
      ],
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "Eloquent", "MySQL", "Redis", "Supabase", "Firebase", "Prisma", "Mongoose"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["GCP", "DO", "AWS", "Vercel", "Docker", "Cloud Run", "Cloudflare", "CI/CD", "GitHub Actions", "Nginx", "Linux"],
    },
    {
      title: "Native",
      skills: ["Kotlin", "Tauri", "GDevelop", "C++", "C#", "Java"],
    },
    {
      title: "Tools & Others",
      skills: ["Git","Figma", "Postman", "REST APIs", "Swagger"],
    },
  ]

  return (
    <section id="skills" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50 border-primary/10"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-primary">{category.title}</CardTitle>
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
