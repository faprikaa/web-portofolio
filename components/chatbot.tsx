"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm an AI assistant that can help you learn more about this developer's skills and experience. Ask me anything!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Skills related questions
    if (message.includes("skill") || message.includes("technology") || message.includes("tech stack")) {
      return "This developer has expertise in modern web technologies including React, Next.js, TypeScript, Node.js, Python, and various databases like PostgreSQL and MongoDB. They're also experienced with cloud platforms like AWS and Vercel, plus mobile development with React Native."
    }

    // Experience questions
    if (message.includes("experience") || message.includes("work") || message.includes("job")) {
      return "They have 5+ years of professional experience as a fullstack developer, having worked at companies like TechCorp Solutions as a Senior Developer, and previously at startups and agencies. They've built applications serving 100k+ users and have experience with enterprise-scale projects."
    }

    // Project questions
    if (message.includes("project") || message.includes("portfolio") || message.includes("work")) {
      return "Some notable projects include an E-Commerce Platform with payment integration, a Task Management App with real-time collaboration, a Social Media Dashboard with analytics, and a Mobile Banking App with biometric authentication. Each project showcases different aspects of fullstack development."
    }

    // Contact/hiring questions
    if (message.includes("hire") || message.includes("contact") || message.includes("available")) {
      return "Yes, they're open to new opportunities! You can reach out through the contact form below, or connect via email at hello@developer.com. They're particularly interested in challenging fullstack projects and innovative startups."
    }

    // Education/learning questions
    if (message.includes("learn") || message.includes("education") || message.includes("study")) {
      return "They're a continuous learner who stays updated with the latest technologies. Besides formal education, they contribute to open source projects, write technical blogs, and are always exploring new frameworks and best practices in web development."
    }

    // AI/Chatbot questions
    if (message.includes("ai") || message.includes("chatbot") || message.includes("artificial intelligence")) {
      return "Great question! This developer has experience building AI-powered applications, including this very chatbot you're talking to. They've worked with APIs like OpenAI, built content generation platforms, and integrated AI features into web applications."
    }

    // Location questions
    if (message.includes("location") || message.includes("where") || message.includes("based")) {
      return "They're currently based in San Francisco, CA, but are open to remote work opportunities. They have experience working with distributed teams and are comfortable with various collaboration tools."
    }

    // Greeting responses
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Nice to meet you. I'm here to help you learn more about this developer's background and skills. What would you like to know?"
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! This developer has a diverse background in fullstack development. Would you like to know more about their technical skills, project experience, or professional background?",
      "I'd be happy to help you learn more! You can ask me about their programming languages, frameworks, project experience, or career journey.",
      "Great question! This developer specializes in modern web development with a focus on React, Node.js, and cloud technologies. What specific area interests you most?",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getBotResponse(input),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const quickQuestions = [
    "What are your main skills?",
    "Tell me about your experience",
    "What projects have you built?",
    "Are you available for hire?",
  ]

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <section
      id="chatbot"
      className="py-16 min-h-screen flex items-center bg-gradient-to-br from-primary/10 via-primary/5 to-background"
    >
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">AI Assistant</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chat with my AI assistant to learn more about my skills, experience, and projects. Ask anything you'd like
              to know!
            </p>
          </div>

          <Card className="w-full max-w-5xl mx-auto shadow-2xl bg-background/95 backdrop-blur-sm border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Portfolio Assistant
              </CardTitle>
              <CardDescription>Powered by AI • Ask me about skills, projects, or experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Quick Questions */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm py-1 px-3 border-primary/30"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 border rounded-lg bg-gradient-to-b from-muted/20 to-muted/10 border-primary/20">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                            <Bot className="h-5 w-5 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] p-4 rounded-lg shadow-md ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                            : "bg-background/90 backdrop-blur-sm border border-primary/20"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-muted to-muted/80 rounded-full flex items-center justify-center shadow-lg">
                            <User className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-4 justify-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                          <Bot className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="bg-background/90 backdrop-blur-sm border border-primary/20 p-4 rounded-lg shadow-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="space-y-3">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about this developer..."
                    className="flex-1 h-12 text-base bg-background/80 border-primary/30 focus:border-primary"
                    disabled={isTyping}
                  />
                  <Button type="submit" size="lg" disabled={isTyping || !input.trim()} className="shadow-lg">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center">
                  This is a demo chatbot. Responses are generated based on portfolio information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
