"use client"

import type React from "react"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles, RefreshCw, Trash2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import Cookies from 'js-cookie'

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date | string
}

const COOKIE_NAME = 'muammar_chat_history';
const COOKIE_EXPIRY = 7; // days

// Hardcoded responses for when quota is exceeded
const HARDCODED_RESPONSES = [
  "Halo! Saya MuammarBot. Saat ini kuota API telah habis, tetapi saya masih bisa memberikan informasi umum tentang Muammar. Muammar adalah seorang fullstack developer dan cloud engineer dengan keahlian di Vue.js, Next.js, Laravel, dan deployment di cloud.",
  
  "Muammar memiliki pengalaman magang di Horus Technology dan PT Medika Digital Nusantara, mengembangkan berbagai aplikasi web dan sistem.",
  
  "Muammar saat ini sedang menempuh pendidikan S1 Informatika di UIN Sunan Kalijaga Yogyakarta dan akan lulus pada Agustus 2025.",
  
  "Anda dapat menghubungi Muammar melalui email di muamamrm28@gmail.com atau melihat portofolionya di https://muammar.pages.dev.",
  
  "Muammar pernah mengikuti program Bangkit Academy (Top 50 Capstone Nasional) dan Samsung Innovation Campus (Top 20 Nasional).",
  
  "Maaf, saya hanya dapat memberikan informasi terbatas karena kuota API telah habis. Silakan kembali besok untuk menggunakan chatbot dengan fitur lengkap."
];

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isError, setIsError] = useState(false)
  const [remainingMessages, setRemainingMessages] = useState<number>(15);
  const [isLoading, setIsLoading] = useState(true);
  const boxMessageRef = useRef<HTMLDivElement>(null)
  const outerBoxMessageRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load messages from cookies and fetch remaining message count on initial render
  useEffect(() => {
    const loadChatData = async () => {
      setIsLoading(true);
      
      // Load messages from cookies
      const savedMessages = Cookies.get(COOKIE_NAME);
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          // Convert string timestamps back to Date objects
          const messagesWithDates = parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        } catch (error) {
          console.error('Error parsing saved messages:', error);
          setDefaultWelcomeMessage();
        }
      } else {
        setDefaultWelcomeMessage();
      }
      
      // Fetch remaining message count from API
      try {
        const response = await fetch('/api/chat');
        if (response.ok) {
          const data = await response.json();
          setRemainingMessages(data.remaining);
        }
      } catch (error) {
        console.error('Error fetching remaining messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChatData();
  }, []);

  // Set default welcome message
  const setDefaultWelcomeMessage = () => {
    setMessages([
      {
        id: "1",
        content:
          "Halo! Saya MuammarBot, asisten AI yang dapat membantu Anda mengenal lebih jauh tentang Muammar Mufid Darmindra. Silakan tanyakan apa saja tentang pengalaman, keterampilan, atau proyek-proyeknya!",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Save messages to cookies whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      // Stringify dates before saving
      const messagesToSave = messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
      }));
      Cookies.set(COOKIE_NAME, JSON.stringify(messagesToSave), { expires: COOKIE_EXPIRY });
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (boxMessageRef.current) {
      boxMessageRef.current.scrollTop = boxMessageRef.current.scrollHeight;
    }
  }

  const scrollToBottomAlign = () => {
    const element = outerBoxMessageRef.current;
    if (element) {
      const elementBottom = element.getBoundingClientRect().bottom;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
  
      const scrollTarget = elementBottom + scrollY - windowHeight;
  
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim() && !isTyping && remainingMessages > 0 && !isLoading) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

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
    
    // Scroll to bottom when user sends a message
    scrollToBottomAlign();
    scrollToBottom();
    
    // Check if user has reached the rate limit
    if (remainingMessages <= 0) {
      // Use hardcoded response instead of showing error
      const randomIndex = Math.floor(Math.random() * HARDCODED_RESPONSES.length);
      const hardcodedResponse = HARDCODED_RESPONSES[randomIndex];
      
      setIsTyping(true);
      
      // Simulate typing delay for more natural feel
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: hardcodedResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        
        // Scroll after bot responds
        scrollToBottomAlign();
        scrollToBottom();
      }, 1500);
      
      return;
    }

    setIsTyping(true)
    setIsError(false)

    try {
      // Send the message to our API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        // Check if it's a rate limit error
        if (response.status === 429) {
          throw new Error('Rate limit exceeded');
        }
        throw new Error('Failed to get response from chatbot API');
      }

      const data = await response.json();
      
      // Update remaining messages count from API response
      setRemainingMessages(data.remaining);
      
      setMessages((prev) => [...prev, data.message]);
      
      // Scroll after bot responds
      scrollToBottomAlign();
      scrollToBottom();
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setIsError(true);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi nanti.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      // Scroll after error message
      scrollToBottomAlign();
      scrollToBottom();
    } finally {
      setIsTyping(false);
    }
  }

  const handleRetry = async () => {
    if (messages.length < 2) return;
    
    // Get the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(msg => msg.sender === "user");
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = [...messages].reverse()[lastUserMessageIndex];
    
    // Remove the error message if it exists
    const newMessages = isError 
      ? messages.slice(0, -1) 
      : messages;
    
    setIsTyping(true);
    setIsError(false);
    
    // Scroll when retrying
    scrollToBottomAlign();
    scrollToBottom();
    
    try {
      // Send the message to our API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot API');
      }

      const data = await response.json();
      
      // Update remaining messages count from API response
      setRemainingMessages(data.remaining);
      
      if (isError) {
        // Replace the error message
        setMessages([...newMessages, data.message]);
      } else {
        // Replace the last bot message
        const messagesWithoutLastBot = newMessages.slice(0, -1);
        setMessages([...messagesWithoutLastBot, data.message]);
      }
      
      // Scroll after bot responds
      scrollToBottomAlign();
      scrollToBottom();
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setIsError(true);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi nanti.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      // Scroll after error message
      scrollToBottomAlign();
      scrollToBottom();
    } finally {
      setIsTyping(false);
    }
  }

  const clearChat = () => {
    // Show confirmation before clearing
    if (window.confirm('Apakah Anda yakin ingin menghapus semua pesan?')) {
      Cookies.remove(COOKIE_NAME);
      setDefaultWelcomeMessage();
    }
  };

  const quickQuestions = [
    "Apa keahlian utama Muammar?",
    "Ceritakan tentang pengalaman kerjanya",
    "Proyek apa yang pernah dibangun?",
    "Bagaimana cara menghubungi Muammar?",
  ]

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Focus the input field after selecting a quick question
    inputRef.current?.focus();
  }

  const formatTime = (timestamp: Date | string) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section
      id="chatbot"
      className="py-16 min-h-screen flex items-center bg-gradient-to-br from-primary/10 via-primary/5 to-background"
    >
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-12xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">AI Assistant</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chat dengan MuammarBot untuk mengetahui lebih banyak tentang keterampilan, pengalaman, dan proyek-proyek Muammar. Tanyakan apa saja yang ingin Anda ketahui!
            </p>
          </div>

          <Card className="w-full mx-auto shadow-2xl bg-background/95 backdrop-blur-sm border-primary/20" ref={outerBoxMessageRef}>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  MuammarBot
                </CardTitle>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">
                    Sisa pesan: {isLoading ? '...' : `${remainingMessages}/15`}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearChat}
                    className="text-muted-foreground hover:text-destructive"
                    title="Hapus Riwayat Chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Powered by Gemini AI • Tanyakan tentang keterampilan, proyek, atau pengalaman</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Quick Questions */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Pertanyaan cepat:</p>
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
              <div className="h-[500px] overflow-y-auto p-6 border rounded-lg bg-gradient-to-b from-muted/20 to-muted/10 border-primary/20"
              ref={boxMessageRef}>
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Memuat percakapan...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "user" ? (
                          <>
                            <div
                              className="max-w-[75%] p-4 rounded-lg shadow-md bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              <p className="text-xs opacity-70 mt-2">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-muted to-muted/80 rounded-full flex items-center justify-center shadow-lg">
                                <User className="h-5 w-5" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                                <Bot className="h-5 w-5 text-primary-foreground" />
                              </div>
                            </div>
                            <div
                              className="max-w-[75%] p-4 rounded-lg shadow-md bg-background/90 backdrop-blur-sm border border-primary/20"
                            >
                              <div className="text-sm leading-relaxed markdown-content">
                                <ReactMarkdown
                                  components={{
                                    a: (props) => (
                                      <a
                                        {...props}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                      />
                                    ),
                                    strong: (props) => (
                                      <strong {...props} className="font-bold" />
                                    ),
                                    em: (props) => (
                                      <em {...props} className="italic" />
                                    ),
                                    ul: (props) => (
                                      <ul {...props} className="list-disc pl-5 my-2" />
                                    ),
                                    ol: (props) => (
                                      <ol {...props} className="list-decimal pl-5 my-2" />
                                    ),
                                    li: (props) => (
                                      <li {...props} className="my-1" />
                                    ),
                                    h1: (props) => (
                                      <h1 {...props} className="text-lg font-bold my-2" />
                                    ),
                                    h2: (props) => (
                                      <h2 {...props} className="text-base font-bold my-2" />
                                    ),
                                    h3: (props) => (
                                      <h3 {...props} className="text-sm font-bold my-1" />
                                    ),
                                    p: (props) => (
                                      <p {...props} className="my-2" />
                                    ),
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              </div>
                              <p className="text-xs opacity-70 mt-2">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </>
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
                )}
              </div>

              {/* Input Form */}
              <div className="space-y-3">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Tanyakan tentang Muammar..."
                    className="flex-1 h-12 text-base bg-background/80 border-primary/30 focus:border-primary"
                    disabled={isTyping || isLoading}
                  />
                  {isError ? (
                    <Button 
                      type="button" 
                      size="lg" 
                      onClick={handleRetry}
                      disabled={isTyping || isLoading} 
                      className="shadow-lg bg-amber-500 hover:bg-amber-600"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isTyping || !input.trim() || isLoading} 
                      className="shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </form>

                <p className="text-xs text-muted-foreground text-center">
                  Chatbot ini didukung oleh Google Gemini AI. Batas 15 pesan per hari per IP address.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
