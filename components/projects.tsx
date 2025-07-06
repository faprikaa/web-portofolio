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
  image_cover?: string | null | undefined
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
    // muslimat nu
    {
      title: "Muslimat NU DIY Website",
      description:
        "Muslimat NU DIY Website is a website built for a non-profit Islamic women's organization to publish activities, programs, and bulletins.",
      image: "/image-projects/muslimatnu-potrait.png",
      image_cover: "/image-projects/muslimatnu-landscape.png",
      technologies: ["WordPress", "Elementor", "ACF", "UpdraftPlus", "Flipbook Plugin"],
      github: "#",
      live: "https://muslimatnu-diy.or.id/",
      detailedDescription:
        "A dynamic and responsive WordPress website developed for Muslimat Nahdlatul Ulama DIY, aimed at publishing organizational activities, digital documentation, and public outreach. Built using Elementor and ACF, the site features structured content like news, leadership hierarchy, and work programs. It also includes an interactive 3D flipbook for digital bulletins, with backend access for admins. In addition to development, I also trained website administrators — members of NU DIY — on how to write, upload, and manage content, ensuring long-term usability by non-technical users.",
      features: [
        "Built with Elementor for flexible page design",
        "Dynamic post types: news, organizational structure, and work programs",
        "Interactive digital bulletin using 3D flipbook plugin",
        "Admin dashboard with secure login for content management",
        "ACF integration to connect posts with organizational divisions",
        "Responsive design optimized for mobile and desktop",
        "Optimized performance with caching and image compression"
      ],
      challenges: [
        "Learning Elementor to build custom layouts",
        "Configuring ACF to relate content with divisions",
        "Optimizing website speed and load time",
        "Automating backups with UpdraftPlus plugin",
        "Training non-technical users to manage content independently"
      ],
      duration: "3 months",
      teamSize: "3 developer",
      role: "Full-Stack WordPress Developer & Trainer"
    },    
    // tumbas pos
    {
      title: "Tumbas Point of Sale",
      description: "Point of Sale system with multiple features. Like inventory management, sales, and more.",
      image: "/image-projects/Tumbas APP.png",
      image_cover: "/image-projects/Tumbas-APP-Landcape-fix.png",
      technologies: ["Laravel", "MySQL", "Bootstrap", "JQuery", "AdminLTE"],
      github: "#",
      live: "https://nani.eu.org",
      detailedDescription:
        "A powerful task management application designed for teams to collaborate effectively. Built with real-time synchronization, the app allows team members to create, assign, and track tasks with live updates. Features include project boards, time tracking, team chat, and comprehensive analytics to monitor project progress and team productivity.",
        features: [
          "Product and stock management",
          "Daily sales with barcode scanning",
          "Multi-user access with roles",
          "Sales and debt reports",
          "Customer and supplier tracking",
          "Return & discount handling",
          "Multi-outlet and offline support",
          "Real-time sales dashboard"
        ],
        challenges: [
          "Real-time stock updates during transactions",
          "Optimizing performance for large data",
          "Designing fast and intuitive cashier UI",
          "Secure role-based access control",
          "Integrating POS hardware (scanner, printer)"
        ],
      duration: "6 months",
      teamSize: "3 developers",
      role: "Lead Full-Stack Developer & Cloud Engineer",
    },
    // admin muslimat nu
    {
      title: "Admin Muslimat NU DIY",
      description: "Internal dashboard for managing members, assets, and organizational data across regions.",
      image: "/image-projects/admin-muslimat-nu-potrait.png",
      image_cover: "/image-projects/admin-muslimat-nu-landscape.png",
      technologies: ["Laravel", "MySQL", "Bootstrap", "JQuery", "AdminLTE"],
      github: "#",
      live: "https://admin.muslimatnu-diy.or.id/",
      detailedDescription:
        "A centralized administrative dashboard developed for Muslimat NU DIY to manage internal data, including member registration, organizational hierarchy (province, branch, sub-branch), work groups, and asset tracking. Built with Laravel and AdminLTE, this platform enables real-time data visualization and user-friendly management tools. It supports role-based access for different levels of admins and streamlines internal data reporting and member verification.",
      features: [
        "Member registration with photo and document upload",
        "Dynamic dashboard with charts and statistics",
        "Multi-level organization structure: province, branch, sub-branch",
        "Data management for assets, work groups, and expertise",
        "Member confirmation and admin role approval system",
        "Responsive layout with sidebar navigation",
        "Search, sort, and paginate across data tables"
      ],
      challenges: [
        "Designing multi-level data hierarchy (cabang, anak cabang, ranting)",
        "Ensuring data validation across complex forms",
        "Integrating dynamic visualizations for organizational insights",
        "Managing user access roles securely",
        "Balancing functionality with ease of use for non-technical users"
      ],
      duration: "3 months",
      teamSize: "3 developer",
      role: "Full-Stack Developer & Cloud Engineer"
    },    
    // Tembak Target Game
    {
      title: "Tembak Target Game",
      description: "A fast-paced shooting game where players hit moving targets to score points and master accuracy.",
      image: "/image-projects/tembak-target-potrait.png",
      image_cover: "/image-projects/tembak-target-landscape.png",
      technologies: ["GDevelop", "Game Design", "GDScript"],
      github: "https://github.com/MaulanaYusufAhmadi/tembak_target",
      live: "https://faprika.itch.io/tembak-target",
      detailedDescription:
        "Tembak Target (Target Mastery) is a 2D browser-based shooting game built with GDevelop. Players aim to hit as many moving targets as possible within a time limit, with increasing difficulty at each level. The game is optimized for both desktop and mobile browsers, with virtual joystick controls on touch devices. Designed with arcade aesthetics, the game provides a smooth and engaging experience while showcasing shooting accuracy and reaction speed.",
      features: [
        "Interactive shooting gameplay with increasing difficulty",
        "Target variety including decoys and explosive traps",
        "Timer-based levels with score tracking",
        "Mobile and desktop support with adaptive controls",
        "Custom level design using GDevelop event system",
        "Arcade-style UI with animated feedback"
      ],
      challenges: [
        "Implementing smooth shooting mechanics across devices",
        "Handling multi-platform input (keyboard, mouse, touch)",
        "Balancing game difficulty and pacing",
        "Creating intuitive game UI and feedback animations"
      ],
      duration: "2 months",
      teamSize: "4 developer",
      role: "Game Designer & Developer"
    },
    // AI-Powered Bird Detector and Repellent System    
    {
      title: "AI-Powered Bird Detector & Repellent System",
      description: "An IoT-based system that detects birds and repels them using AI-powered object detection and automated speaker activation.",
      image: "/image-projects/bird-repellent-potrait.png",
      image_cover: "/image-projects/bird-repellent-landscape.png",
      technologies: ["ESP32-CAM", "Streamlit", "YOLOv5", "Flask", "Solar Panel", "Python"],
      github: "http://github.com/SIC-CodeGenesis/",
      live: "https://www.youtube.com/watch?v=dJZAMjJg0kg",
      detailedDescription:
        "A smart agricultural IoT system designed to automatically detect birds in rice fields and trigger a speaker to scare them away. Using ESP32-CAM, the system streams real-time video to a dashboard where a custom-trained YOLOv5 model performs object detection. If birds are detected, a speaker module is activated. Additionally, the system can analyze uploaded plant images for rice disease detection using a separate AI model. Powered by solar energy and managed through a web-based dashboard built with Streamlit.",
      features: [
        "Real-time bird detection with YOLOv5",
        "Speaker activation on detection",
        "Solar-powered ESP32-CAM device",
        "Web-based dashboard to monitor live camera feed",
        "Configurable speaker and camera settings",
        "Rice disease analysis from uploaded images",
        "Automatic image capture and logging"
      ],
      challenges: [
        "Deploying custom AI models on limited IoT hardware",
        "Maintaining stable ESP32-CAM live stream to dashboard",
        "Synchronizing detection events with hardware output (speaker)",
        "Designing a power-efficient system with solar charging",
        "Building responsive dashboard UI using Streamlit"
      ],
      duration: "6 months",
      teamSize: "4 developers",
      role: "AI & Embedded System Engineer"
    },
    {
      title: "CropOptima - Smart Farming Recommendation App",
      description: "Mobile app that recommends the best crops to plant based on location, soil, and weather conditions.",
      image: "/image-projects/crop-optima-potrait.png",
      image_cover: "/image-projects/crop-optima-landscape.png",
      technologies: ["Kotlin", "Google Cloud", "Firebase", "App Engine", "Cloud SQL", "ML Model API"],
      github: "https://github.com/panduwjaya/CropOptima-Fullteam",
      live: "https://youtube.com/shorts/77T8sIFI7qM?si=o_kUA98uIG9dMeBC",
      detailedDescription:
        "CropOptima is a smart agriculture application that uses AI and cloud infrastructure to recommend the most optimal crops to plant based on user-input soil nutrients (NPK), pH level, and geolocation. The app integrates machine learning models deployed on GCP to analyze environmental data and provide accurate crop suggestions. Built with a mobile-first approach, it includes features like authentication, input forms, detection results, and cloud-based architecture.",
      features: [
        "AI-based crop recommendation system",
        "Soil nutrient input (NPK, pH)",
        "Geolocation-based suggestions",
        "Cloud-based ML inference via App Engine",
        "User authentication (register, login, reset)",
        "Result visualization with crop images and details",
        "Responsive and intuitive UI"
      ],
      challenges: [
        "Deploying ML models on Google Cloud Platform",
        "Handling real-time data input and cloud communication",
        "Ensuring accurate recommendations from noisy soil data",
        "Designing user-friendly mobile interface for farmers"
      ],
      duration: "6 months",
      teamSize: "7 developers",
      role: "Android Developer & Cloud Engineer"
    }    
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
                        src={project.image_cover || "/placeholder.svg"}
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
                </div>

                {/* Right Side - Project Screenshot */}
                <div className="lg:sticky lg:top-6">
                  <div className="rounded-lg overflow-hidden border border-border shadow-lg">
                    <img
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={`${selectedProject.title} screenshot`}
                      className="w-full object-contain"
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
