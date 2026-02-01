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
    <section id="about" className="min-h-screen flex items-center py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-2">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who I Am</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A fullstack developer from Yogyakarta with over 3 years of experience in building scalable and user-friendly web applications.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                My journey began with curiosity about how apps work. Over time, that curiosity turned into a strong passion for software development — from backend systems to sleek frontends.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My expertise spans across modern web technologies, cloud platforms, and mobile development. I&apos;m always eager to learn new technologies and best practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you can find me contributing to open source projects, writing technical blogs, or exploring the latest in tech.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 rounded-lg bg-background border">
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Exp</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-background border">
                  <div className="text-2xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-background border">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="text-7xl lg:text-8xl">👨‍💻</span>
              </div>
            </div>
          </div>

          {/* Highlight Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background border"
              >
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
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
