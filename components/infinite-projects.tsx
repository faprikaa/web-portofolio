"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, X, Calendar, Users, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import InfiniteMenu from "./reactbits/InfiniteMenu/InfiniteMenu"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  live: string
  detailedDescription: string
  features: string[]
  challenges: string[]
  duration: string
  teamSize: string
  role: string
}

export function InfiniteProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { toast } = useToast()

  const handleViewCode = (projectTitle: string) => {
    const messages = [
      {
        title: "🔒 Private Repository",
        description: `The source code for "${projectTitle}" is proprietary and not available for public viewing. This project contains sensitive business logic and client-specific implementations.`,
      },
      {
        title: "🏢 Commercial Project",
        description: `"${projectTitle}" was developed for a commercial client. The codebase is protected under confidentiality agreements and cannot be shared publicly.`,
      },
      {
        title: "🛡️ Confidential Code",
        description: `The source code for "${projectTitle}" is confidential and proprietary. However, I'd be happy to discuss the technical implementation and architecture in detail during an interview.`,
      },
      {
        title: "💼 Enterprise Solution",
        description: `"${projectTitle}" is an enterprise-level solution with proprietary code. While the source isn't public, I can provide detailed technical documentation and discuss the development process.`,
      },
      {
        title: "🔐 Protected IP",
        description: `This project contains intellectual property and trade secrets. The code is not open source, but I'm available to discuss the technical challenges and solutions implemented.`,
      },
    ]

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    toast({
      title: randomMessage.title,
      description: randomMessage.description,
      duration: 8000,
    })
  }

  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
      github: "#",
      live: "#",
      detailedDescription:
        "A comprehensive e-commerce platform built with modern web technologies. This project features a complete shopping experience with user authentication, product catalog, shopping cart, secure payment processing, and an admin dashboard for inventory management. The platform is designed to handle high traffic and provides a seamless user experience across all devices.",
      features: [
        "User authentication and profile management",
        "Product catalog with advanced filtering and search",
        "Shopping cart and wishlist functionality",
        "Secure payment processing with Stripe",
        "Order tracking and history",
        "Admin dashboard for inventory management",
        "Real-time notifications",
        "Responsive design for all devices",
      ],
      challenges: [
        "Implementing secure payment processing",
        "Optimizing database queries for large product catalogs",
        "Building a scalable admin dashboard",
        "Ensuring mobile responsiveness",
      ],
      duration: "4 months",
      teamSize: "3 developers",
      role: "Lead Full-Stack Developer",
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team collaboration, and analytics.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Material-UI"],
      github: "#",
      live: "#",
      detailedDescription:
        "A powerful task management application designed for teams to collaborate effectively. Built with real-time synchronization, the app allows team members to create, assign, and track tasks with live updates. Features include project boards, time tracking, team chat, and comprehensive analytics to monitor project progress and team productivity.",
      features: [
        "Real-time task updates with Socket.io",
        "Drag-and-drop task boards",
        "Team collaboration and chat",
        "Time tracking and reporting",
        "Project analytics and insights",
        "File attachments and comments",
        "Custom project templates",
        "Mobile-responsive interface",
      ],
      challenges: [
        "Implementing real-time synchronization across multiple users",
        "Building an intuitive drag-and-drop interface",
        "Optimizing performance for large datasets",
        "Creating comprehensive analytics dashboard",
      ],
      duration: "3 months",
      teamSize: "2 developers",
      role: "Full-Stack Developer",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization and scheduling features.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Vue.js", "Python", "Django", "Chart.js", "PostgreSQL"],
      github: "#",
      live: "#",
      detailedDescription:
        "A comprehensive social media management dashboard that aggregates data from multiple platforms. The application provides detailed analytics, content scheduling, and performance tracking across various social media channels. Built with Vue.js frontend and Django backend, it offers powerful data visualization and automated reporting features.",
      features: [
        "Multi-platform social media integration",
        "Advanced analytics and reporting",
        "Content scheduling and automation",
        "Interactive data visualizations",
        "Custom dashboard widgets",
        "Team collaboration tools",
        "Automated report generation",
        "API integrations with major platforms",
      ],
      challenges: [
        "Integrating with multiple social media APIs",
        "Building complex data visualizations",
        "Handling large amounts of social media data",
        "Creating an intuitive user interface",
      ],
      duration: "5 months",
      teamSize: "4 developers",
      role: "Frontend Lead",
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and transaction management.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Firebase", "Redux", "Expo", "TypeScript"],
      github: "#",
      live: "#",
      detailedDescription:
        "A secure and user-friendly mobile banking application built with React Native. The app provides comprehensive banking services including account management, money transfers, bill payments, and transaction history. Security is paramount with biometric authentication, encryption, and fraud detection systems integrated throughout the application.",
      features: [
        "Biometric authentication (fingerprint/face ID)",
        "Account balance and transaction history",
        "Money transfers and bill payments",
        "Mobile check deposits",
        "ATM and branch locator",
        "Push notifications for transactions",
        "Budgeting and spending analytics",
        "24/7 customer support chat",
      ],
      challenges: [
        "Implementing robust security measures",
        "Ensuring compliance with banking regulations",
        "Building biometric authentication",
        "Optimizing performance for various devices",
      ],
      duration: "6 months",
      teamSize: "5 developers",
      role: "Mobile Developer",
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content generation platform with multiple templates and export options.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "OpenAI API", "Prisma", "Supabase", "Tailwind CSS"],
      github: "#",
      live: "#",
      detailedDescription:
        "An innovative AI-powered content generation platform that helps users create high-quality content for various purposes. Leveraging OpenAI's GPT models, the platform offers multiple content templates, customization options, and export formats. Users can generate blog posts, social media content, marketing copy, and more with just a few clicks.",
      features: [
        "AI-powered content generation",
        "Multiple content templates",
        "Custom prompt engineering",
        "Content editing and refinement",
        "Export to various formats",
        "Content history and management",
        "Team collaboration features",
        "Usage analytics and insights",
      ],
      challenges: [
        "Integrating with OpenAI API effectively",
        "Building intuitive content templates",
        "Managing API costs and rate limits",
        "Creating a smooth user experience",
      ],
      duration: "3 months",
      teamSize: "2 developers",
      role: "Full-Stack Developer",
    },
    {
      title: "Real Estate Platform",
      description: "Property listing and management platform with advanced search and virtual tours.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Express.js", "MySQL", "AWS S3", "Google Maps API"],
      github: "#",
      live: "#",
      detailedDescription:
        "A comprehensive real estate platform that connects buyers, sellers, and agents. The platform features advanced property search, virtual tours, mortgage calculators, and agent management tools. Built with scalability in mind, it handles thousands of property listings with high-performance search and filtering capabilities.",
      features: [
        "Advanced property search and filtering",
        "Interactive maps with Google Maps API",
        "Virtual property tours",
        "Mortgage calculator and tools",
        "Agent profiles and contact system",
        "Saved searches and favorites",
        "Property comparison tools",
        "Mobile-responsive design",
      ],
      challenges: [
        "Building complex search functionality",
        "Integrating with mapping services",
        "Handling large amounts of property data",
        "Creating virtual tour experiences",
      ],
      duration: "4 months",
      teamSize: "3 developers",
      role: "Backend Developer",
    },
  ]

  const items = projects.map(project => ({
    image: project.image,
    link: '#',
    title: project.title,
    description: project.description
  }));

  const handleProjectSelect = (index: number) => {
    setSelectedProject(projects[index]);
  };

  return (
    <section id="projects" className="py-16 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 relative h-[600px]">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <InfiniteMenu items={items} onItemClick={handleProjectSelect} />
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  {selectedProject.title}
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setSelectedProject(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>

              <div className="grid lg:grid-cols-2 gap-8 mt-6">
                {/* Left Side - Project Details */}
                <div className="space-y-6">
                  {/* Project Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedProject.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{selectedProject.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      <span>{selectedProject.role}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProject.detailedDescription}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technical Challenges</h3>
                    <ul className="space-y-2">
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1" onClick={() => handleViewCode(selectedProject.title)}>
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Right Side - Project Screenshot */}
                <div className="lg:sticky lg:top-6">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border shadow-lg">
                    <img
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={`${selectedProject.title} screenshot`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">Project Screenshot</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
