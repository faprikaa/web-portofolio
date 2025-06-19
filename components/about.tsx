import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Smartphone } from "lucide-react"

export function About() {
  const highlights = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Backend Development",
      description: "Node.js, Python, PostgreSQL, MongoDB",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Full Stack Solutions",
      description: "End-to-end application development",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Development",
      description: "React Native, Progressive Web Apps",
    },
  ]

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-muted/30 to-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm a passionate fullstack developer with 5+ years of experience building scalable web applications and
              mobile solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-4">
                Started as a frontend developer and evolved into a fullstack engineer. I love solving complex problems
                and turning ideas into reality through code.
              </p>
              <p className="text-muted-foreground mb-4">
                My expertise spans across modern web technologies, cloud platforms, and mobile development. I'm always
                eager to learn new technologies and best practices.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me contributing to open source projects, writing technical blogs, or
                exploring the latest in tech.
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
