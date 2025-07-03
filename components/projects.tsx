"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, X, Calendar, Users, Zap, Turtle, Rabbit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ElasticSlider from "./elastic-slider"

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

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dragStarted, setDragStarted] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(1)
  const { toast } = useToast()
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const scrollPositionRef = useRef(0)
  const [isHovering, setIsHovering] = useState(false)

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

  // Create seamless infinite loop by tripling projects
  const infiniteProjects = [...projects, ...projects, ...projects]

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging || isHovering) return

    const animate = () => {
      if (scrollRef.current) {
        scrollPositionRef.current += scrollSpeed * 0.5

        const container = scrollRef.current
        const cardWidth = 320 + 24 // card width + gap
        const totalWidth = projects.length * cardWidth

        // Reset position when we've scrolled through one complete set
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0
        }

        container.style.transform = `translateX(-${scrollPositionRef.current}px)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAutoPlaying, scrollSpeed, projects.length, isDragging, isHovering])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if the target is a clickable element
    const target = e.target as HTMLElement
    if (
      target.closest("button") ||
      target.closest('[data-clickable="true"]') ||
      target.tagName === "BUTTON" ||
      target.closest(".clickable-area") ||
      target.closest(".speed-control")
    ) {
      return
    }

    if (!scrollRef.current) return

    setIsDragging(true)
    setDragStarted(false)
    setIsAutoPlaying(false) // Pause auto-play when dragging
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollPositionRef.current)

    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grabbing"
      scrollRef.current.style.userSelect = "none"
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return

    e.preventDefault()
    setDragStarted(true)

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Multiply by 2 for faster scrolling
    const newPosition = scrollLeft - walk

    // Handle infinite scroll boundaries
    const cardWidth = 320 + 24
    const totalWidth = projects.length * cardWidth

    if (newPosition < 0) {
      scrollPositionRef.current = totalWidth + newPosition
    } else if (newPosition >= totalWidth) {
      scrollPositionRef.current = newPosition - totalWidth
    } else {
      scrollPositionRef.current = newPosition
    }

    scrollRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab"
      scrollRef.current.style.userSelect = "auto"
    }
    // Resume auto-play after a short delay
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 2000) // Resume after 2 seconds
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging) {
      setIsDragging(false)
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "grab"
        scrollRef.current.style.userSelect = "auto"
      }
      // Resume auto-play after a short delay
      setTimeout(() => {
        setIsAutoPlaying(true)
      }, 2000)
    }
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    // Check if the target is a clickable element
    const target = e.target as HTMLElement
    if (
      target.closest("button") ||
      target.closest('[data-clickable="true"]') ||
      target.tagName === "BUTTON" ||
      target.closest(".clickable-area") ||
      target.closest(".speed-control")
    ) {
      return
    }

    if (!scrollRef.current) return

    setIsDragging(true)
    setDragStarted(false)
    setIsAutoPlaying(false) // Pause auto-play when dragging
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollPositionRef.current)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return

    setDragStarted(true)

    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    const newPosition = scrollLeft - walk

    const cardWidth = 320 + 24
    const totalWidth = projects.length * cardWidth

    if (newPosition < 0) {
      scrollPositionRef.current = totalWidth + newPosition
    } else if (newPosition >= totalWidth) {
      scrollPositionRef.current = newPosition - totalWidth
    } else {
      scrollPositionRef.current = newPosition
    }

    scrollRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    // Resume auto-play after a short delay
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 2000)
  }

  const handleCardClick = (project: Project, e: React.MouseEvent) => {
    // Only open modal if we haven't dragged
    if (!dragStarted) {
      setSelectedProject(project)
    }
  }

  const handleSpeedChange = useCallback((value: number) => {
    setScrollSpeed(value)
  }, [])

  return (
    <section id="projects" className="py-16 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>

            {/* Description and Speed Control Side by Side */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 max-w-4xl mx-auto">
              {/* Description */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-lg text-muted-foreground text-right">A showcase of my recent work and personal projects</p>
              </div>

              {/* Speed Control */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-primary/5 via-primary/8 to-primary/5 backdrop-blur-sm border border-primary/10 rounded-full px-4 py-2 speed-control right-0">
                <Turtle className="h-4 w-4 text-muted-foreground/70" />
                <div className="w-20 sm:w-24">
                  <ElasticSlider
                    defaultValue={scrollSpeed}
                    startingValue={0.1}
                    maxValue={5}
                    stepSize={0.1}
                    isStepped={true}
                    onValueChange={handleSpeedChange}
                    leftIcon={<></>}
                    rightIcon={<></>}
                    className="w-full"
                  />
                </div>
                <Rabbit className="h-4 w-4 text-muted-foreground/70" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden px-8 py-6">
            {/* Drag and scroll container */}
            <div
              className="overflow-hidden px-4"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={(e) => {
                setIsHovering(false)
                handleMouseLeave(e)
              }}
            >
              <div
                ref={scrollRef}
                className="flex gap-6 transition-transform duration-300 ease-linear select-none"
                style={{
                  width: `${infiniteProjects.length * (320 + 24)}px`,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              >
                {infiniteProjects.map((project, index) => (
                  <Card
                    key={`${project.title}-${index}`}
                    className="flex-none w-80 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 bg-background/90 backdrop-blur-sm border-primary/20 mx-2 my-4"
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                  >
                    {/* Non-clickable Image Area - Grabbable */}
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center cursor-grab">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                      />
                    </div>

                    <CardHeader>
                      {/* Clickable Title */}
                      <CardTitle
                        className="text-xl clickable-area cursor-pointer hover:text-primary transition-colors"
                        onClick={(e) => handleCardClick(project, e)}
                        data-clickable="true"
                      >
                        {project.title}
                      </CardTitle>
                      {/* Non-clickable Description */}
                      <CardDescription className="cursor-grab">{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Non-clickable Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4 cursor-grab">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs border-primary/30 cursor-grab">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs border-primary/30 cursor-grab">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Clickable Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 hover:bg-primary hover:text-primary-foreground bg-transparent cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewCode(project.title)
                          }}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 shadow-md cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProject(project)
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Detail
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex justify-center mt-4">
              <p className="text-sm text-muted-foreground/70">
                {isDragging
                  ? "Dragging..."
                  : isHovering
                    ? "Auto-scroll paused (hovering) • Click title to view details"
                    : isAutoPlaying
                      ? `Auto-scrolling at ${scrollSpeed.toFixed(1)}x speed • Hover to pause • Drag to pause • Click title to view details`
                      : "Auto-scroll paused • Will resume in 2 seconds • Click title to view details"}
              </p>
            </div>
          </div>
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
                    <Button variant="outline" className="flex-1 bg-transparent" asChild>
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
