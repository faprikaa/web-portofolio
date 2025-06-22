import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

export function Experience() {
  const experiences = [
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
