import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Sass",
        "Vue.js",
        "Angular",
      ],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "Python", "Django", "FastAPI", "PHP", "Laravel", "Ruby on Rails"],
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Firebase", "Prisma", "Mongoose"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Nginx", "Linux"],
    },
    {
      title: "Mobile",
      skills: ["React Native", "Expo", "Flutter", "PWA", "Ionic", "Cordova"],
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Webpack", "Vite", "Jest", "Cypress", "Figma", "Postman", "GraphQL", "REST APIs"],
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
