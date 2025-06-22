import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Smartphone } from "lucide-react"

export function About() {
  const highlights = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Fullstack Development",
      description:
        "Building web apps using Laravel, Node.js, Vue, and React from backend to frontend.",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "DevOps & Deployment",
      description:
        "Setting up servers, CI/CD, and deploying with Docker, Cloud Run, or Cloudflare.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "System Integration",
      description:
        "Designing APIs, connecting services, and optimizing databases.",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Development",
      description:
        "Creating apps with Kotlin, and Tauri for multiple platforms.",
    },
  ];
  

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-muted/30 to-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A fullstack developer from Yogyakarta with over 3 years of experience in building scalable and user-friendly web applications — from internal dashboards to public-facing platforms.            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-4">
              My journey began with curiosity about how apps work. Over time, that curiosity turned into a strong passion for software development — from backend systems to sleek frontends.
              </p>
              <p className="text-muted-foreground mb-4">
              I love building things from scratch, writing clean code, and solving real problems with elegant, maintainable solutions.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me creating new projects, writing blogs, or exploring the latest in tech.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm border-primary/10"
              >
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
