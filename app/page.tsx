"use client"

import React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Star,
  Users,
  Globe,
  Award,
  BookOpen,
  Quote,
  ArrowRight,
  CheckCircle,
  Sparkles,
  MessageCircle,
  Calendar,
  Twitter,
  ExternalLink,
  User,
  Briefcase,
  GraduationCap,
  Target,
  Heart,
  Lightbulb,
  Crown,
  Instagram,
  Linkedin,
  MessageSquare,
  Mail,
  Send,
  FileText,
  TrendingUp,
  Building,
  Users2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Toaster, toast } from "sonner"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  // Newsletter subscription state
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Testimonial carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail("")
    toast.success("Newsletter subscription successful!", {
      description: "Thank you for subscribing. Your first insight will arrive this Monday.",
      duration: 5000,
    })
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setContactForm({ name: "", email: "", message: "" })
    toast.success("Message sent successfully!", {
      description: "Thank you for reaching out. Eno will personally review your message and respond within 24 hours.",
      duration: 5000,
    })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Business Analyst, Microsoft",
      quote:
        "The transformation was profound—not just in my career trajectory, but in my understanding of what true professional excellence means.",
      location: "Seattle, WA",
      icon: User,
    },
    {
      name: "Ahmed Al-Rashid",
      role: "Lead Analyst, Amazon",
      quote:
        "Eno's guidance helped me navigate the complexities of a new culture while building a career that honors my authentic self.",
      location: "Dubai, UAE",
      icon: User,
    },
    {
      name: "Maria Santos",
      role: "Principal Analyst, Google",
      quote:
        "The methodology is timeless yet perfectly adapted to today's challenges. My career has been transformed beyond recognition.",
      location: "São Paulo, Brazil",
      icon: User,
    },
    {
      name: "David Kim",
      role: "VP of Analytics, Tesla",
      quote:
        "Eno's approach to business analysis is revolutionary. She doesn't just teach techniques; she transforms mindsets.",
      location: "Austin, TX",
      icon: User,
    },
    {
      name: "Priya Patel",
      role: "Chief Data Officer, Spotify",
      quote:
        "The investment in Eno's program was the best decision I made for my career. The ROI was immediate and lasting.",
      location: "Stockholm, Sweden",
      icon: User,
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #E7E5E4',
            borderRadius: '0.5rem',
          },
          className: 'font-light',
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-stone-50/90 backdrop-blur-sm border-b border-champagne-200/50"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-serif text-stone-800 tracking-wide"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Crown className="w-6 h-6 text-champagne-600 inline mr-2" />
              Eno Eka
            </motion.div>
            <div className="hidden md:flex items-center space-x-12">
              {["About", "Portfolio", "Programs", "Testimonials", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-stone-600 hover:text-champagne-700 transition-colors duration-300 relative font-light tracking-wide"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-champagne-500 to-champagne-700"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-champagne-300 text-champagne-700 hover:bg-champagne-50 hover:border-champagne-400 transition-all duration-300 font-light tracking-wide"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Us
              </Button>
              <Button className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white font-light tracking-wide">
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y, opacity }} 
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-champagne-50" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />
        </motion.div>

        {/* Champagne floating elements - Reduce number and optimize animations */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * 2 * Math.PI;
            const radius = 30;
            const left = 50 + radius * Math.cos(angle);
            const top = 50 + radius * Math.sin(angle);
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-champagne-400 rounded-full opacity-40"
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content - Optimize animations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <Badge className="mb-8 bg-champagne-100 text-champagne-800 border-champagne-200 font-light tracking-wider">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Forbes Featured • LinkedIn Top Voice • Award-Winning Coach
                </Badge>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight tracking-wide">
                Transform Your Career
                <br />
                <span className="bg-gradient-to-r from-champagne-600 to-champagne-700 bg-clip-text text-transparent">
                  Into Excellence
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent mb-8"
              />

              <p className="text-xl md:text-2xl text-stone-600 mb-12 leading-relaxed font-light">
                Join 100,000+ professionals across 90+ countries who have transformed their careers through proven
                business analysis strategies and personalized mentorship.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white px-10 py-4 text-lg font-light tracking-wide group"
                >
                  <Calendar className="mr-3 w-5 h-5" />
                  Book Free Consultation
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-champagne-300 text-champagne-700 hover:bg-champagne-50 hover:border-champagne-400 px-10 py-4 text-lg font-light tracking-wide"
                >
                  <MessageCircle className="mr-3 w-5 h-5" />
                  Message Eno
                </Button>
              </motion.div>

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex items-center space-x-6"
              >
                <span className="text-stone-600 font-light text-sm">Connect with Eno:</span>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://linkedin.com/in/enoeka"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => toast.info("Opening LinkedIn profile...")}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-full flex items-center justify-center hover:from-champagne-200 hover:to-champagne-300 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-champagne-700" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/enoeka"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-full flex items-center justify-center hover:from-champagne-200 hover:to-champagne-300 transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5 text-champagne-700" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com/enoeka"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-full flex items-center justify-center hover:from-champagne-200 hover:to-champagne-300 transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5 text-champagne-700" />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-full flex items-center justify-center hover:from-champagne-200 hover:to-champagne-300 transition-all duration-300"
                  >
                    <MessageSquare className="w-5 h-5 text-champagne-700" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-champagne-200 to-champagne-400 rounded-2xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-champagne-100">
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <User className="w-16 h-16 text-champagne-600" />
                      </div>
                      <h3 className="text-2xl font-serif text-stone-800 mb-2">Eno Eka</h3>
                      <p className="text-champagne-700 font-light">Business Analysis Expert</p>
                      <div className="flex justify-center space-x-4 mt-4">
                        <div className="flex items-center text-champagne-600">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="text-sm">Forbes Featured</span>
                        </div>
                        <div className="flex items-center text-champagne-600">
                          <Award className="w-4 h-4 mr-1" />
                          <span className="text-sm">Top Voice</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { number: "100,000+", label: "Professionals Guided", icon: Users },
              { number: "90+", label: "Countries Reached", icon: Globe },
              { number: "30+", label: "Industry Recognitions", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-center group"
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-champagne-200/50 shadow-sm group-hover:shadow-md group-hover:border-champagne-300 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-champagne-600 mx-auto mb-4" />
                  <div className="text-3xl font-serif text-stone-800 mb-2">{stat.number}</div>
                  <div className="text-stone-600 font-light tracking-wide">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Eno Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8 tracking-wide">
              Meet <span className="text-champagne-600">Eno Eka</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
              From immigrant to Forbes-featured business analyst, Eno's journey embodies the transformation possible
              through dedication, strategic thinking, and unwavering commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-br from-champagne-100/30 to-transparent rounded-full" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-tl from-champagne-200/30 to-transparent rounded-full" />
                
                {/* Main image container */}
                <div className="relative">
                  {/* Decorative border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-champagne-200 to-champagne-400 rounded-2xl transform rotate-2 opacity-20" />
                  
                  {/* Image wrapper */}
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-champagne-100">
                    <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
                      <img
                        src="/eno-eka.jpg"
                        alt="Eno Eka - Business Analysis Expert"
                        className="object-cover w-full h-full"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                    </div>
                  </div>

                  {/* Floating achievement badges */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute -left-4 top-1/4 bg-white rounded-lg p-3 shadow-lg border border-champagne-100"
                  >
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-champagne-600" />
                      <span className="text-sm font-light text-stone-600">Forbes Featured</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute -right-4 top-2/4 bg-white rounded-lg p-3 shadow-lg border border-champagne-100"
                  >
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-champagne-600" />
                      <span className="text-sm font-light text-stone-600">Top Voice</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-4 left-1/4 bg-white rounded-lg p-3 shadow-lg border border-champagne-100"
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-champagne-600" />
                      <span className="text-sm font-light text-stone-600">100K+ Mentored</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-serif text-stone-800 mb-4">The Journey</h3>
                <p className="text-stone-600 font-light leading-relaxed mb-6">
                  Eno Eka's story is one of transformation and triumph. As an immigrant who understood the challenges of
                  breaking into competitive industries, she developed a unique approach that combines technical
                  expertise with cultural intelligence and emotional resilience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: GraduationCap,
                    title: "Education Excellence",
                    description: "Advanced degrees in Business Analysis and Strategic Management",
                  },
                  {
                    icon: Briefcase,
                    title: "Corporate Success",
                    description: "Senior roles at Fortune 500 companies across multiple industries",
                  },
                  {
                    icon: Target,
                    title: "Proven Results",
                    description: "100,000+ professionals coached with 95% success rate",
                  },
                  {
                    icon: Lightbulb,
                    title: "Innovation Leader",
                    description: "Pioneered new methodologies in business analysis training",
                  },
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-champagne-50 rounded-lg p-6 border border-champagne-100"
                  >
                    <achievement.icon className="w-8 h-8 text-champagne-600 mb-3" />
                    <h4 className="font-serif text-stone-800 mb-2">{achievement.title}</h4>
                    <p className="text-stone-600 font-light text-sm">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={() => toast.success("Consultation scheduled!", {
                    description: "We'll send you a confirmation email with the details.",
                  })}
                  className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule 1:1 Session
                </Button>
                <Button
                  onClick={() => toast.success("Message sent!", {
                    description: "We'll get back to you shortly.",
                  })}
                  variant="outline"
                  className="border-champagne-300 text-champagne-700 hover:bg-champagne-50 hover:border-champagne-400"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Connect with Eno
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gradient-to-br from-stone-50 to-champagne-50">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <Badge className="mb-8 bg-champagne-100 text-champagne-800 border-champagne-200 font-light tracking-wider">
              <FileText className="w-3 h-3 mr-2" />
              Professional Portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8 tracking-wide">
              Proven <span className="text-champagne-600">Excellence</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
              A showcase of transformative projects, strategic initiatives, and the measurable impact created across
              industries and organizations worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Fortune 500 Transformation",
                category: "Corporate Strategy",
                description:
                  "Led digital transformation initiative for multinational corporation, resulting in 40% efficiency improvement and $50M cost savings.",
                metrics: ["40% Efficiency Gain", "$50M Saved", "6 Months Timeline"],
                featured: true,
              },
              {
                icon: TrendingUp,
                title: "Analytics Framework Design",
                category: "Process Innovation",
                description:
                  "Developed proprietary business analysis framework adopted by 200+ companies across 15 industries.",
                metrics: ["200+ Companies", "15 Industries", "95% Success Rate"],
                featured: false,
              },
              {
                icon: Users2,
                title: "Global Training Program",
                category: "Education & Development",
                description:
                  "Created comprehensive training curriculum that has certified over 10,000 business analysts worldwide.",
                metrics: ["10,000+ Certified", "90+ Countries", "4.9/5 Rating"],
                featured: false,
              },
              {
                icon: Award,
                title: "Industry Recognition",
                category: "Thought Leadership",
                description:
                  "Featured in Forbes, Harvard Business Review, and LinkedIn as a top voice in business analysis and career development.",
                metrics: ["Forbes Featured", "HBR Published", "LinkedIn Top Voice"],
                featured: false,
              },
              {
                icon: Target,
                title: "Startup Success Stories",
                category: "Entrepreneurship",
                description:
                  "Advised 50+ startups on business analysis best practices, with 80% achieving Series A funding within 18 months.",
                metrics: ["50+ Startups", "80% Success Rate", "18 Month Average"],
                featured: false,
              },
              {
                icon: Globe,
                title: "International Consulting",
                category: "Global Impact",
                description:
                  "Provided strategic consulting to government agencies and NGOs across 25 countries, impacting millions of lives.",
                metrics: ["25 Countries", "Government Level", "Millions Impacted"],
                featured: false,
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {project.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-champagne-500 to-champagne-600 text-white font-light tracking-wide">
                      Featured Project
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    project.featured ? "ring-2 ring-champagne-300 shadow-lg" : "shadow-sm"
                  } hover:shadow-xl transition-all duration-500 bg-white border-champagne-200/50 group-hover:border-champagne-300`}
                >
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-lg flex items-center justify-center mb-4">
                        <project.icon className="w-6 h-6 text-champagne-600" />
                      </div>
                      <div className="text-champagne-600 text-sm font-light tracking-wide mb-2">{project.category}</div>
                      <h3 className="text-xl font-serif text-stone-800 mb-3">{project.title}</h3>
                    </div>

                    <p className="text-stone-600 font-light leading-relaxed mb-6">{project.description}</p>

                    <div className="space-y-2 mb-6">
                      {project.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-champagne-600" />
                          <span className="text-stone-600 font-light text-sm">{metric}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-champagne-200 text-champagne-700 hover:bg-champagne-50 hover:border-champagne-300 font-light tracking-wide"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Case Study
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <Badge className="mb-8 bg-champagne-100 text-champagne-800 border-champagne-200 font-light tracking-wider">
              <BookOpen className="w-3 h-3 mr-2" />
              Curated Learning Experiences
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8 tracking-wide">
              Masterfully Crafted <span className="text-champagne-600">Programs</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
              Each program is thoughtfully designed to honor your unique journey while providing the structure and
              guidance necessary for profound transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "The Analyst's Journey",
                subtitle: "Six-Figure Mastery Program",
                description:
                  "A comprehensive 12-week immersion in the art and science of business analysis, designed for those who seek excellence.",
                features: [
                  "Intensive mentorship",
                  "Real-world applications",
                  "Career placement guidance",
                  "Lifetime community access",
                ],
                investment: "Investment: $2,997",
                featured: true,
              },
              {
                icon: Crown,
                title: "Executive Presence",
                subtitle: "Leadership Acceleration",
                description:
                  "For seasoned professionals ready to step into positions of greater influence and responsibility.",
                features: ["Executive coaching", "Leadership frameworks", "Strategic thinking", "Network cultivation"],
                investment: "Investment: $1,997",
                featured: false,
              },
              {
                icon: Briefcase,
                title: "Organizational Excellence",
                subtitle: "Corporate Transformation",
                description:
                  "Bespoke solutions for organizations committed to elevating their analytical capabilities.",
                features: ["Custom curriculum", "On-site delivery", "Team assessments", "Ongoing partnership"],
                investment: "Investment: Bespoke",
                featured: false,
              },
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {program.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-champagne-500 to-champagne-600 text-white font-light tracking-wide">
                      Most Sought After
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    program.featured ? "ring-2 ring-champagne-300 shadow-lg" : "shadow-sm"
                  } hover:shadow-xl transition-all duration-500 bg-white border-champagne-200/50 group-hover:border-champagne-300`}
                >
                  <CardContent className="p-10">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <program.icon className="w-8 h-8 text-champagne-600" />
                      </div>
                      <h3 className="text-2xl font-serif text-stone-800 mb-2">{program.title}</h3>
                      <p className="text-champagne-700 font-light tracking-wide">{program.subtitle}</p>
                    </div>

                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent mx-auto mb-8" />

                    <p className="text-stone-600 mb-8 font-light leading-relaxed text-center">{program.description}</p>

                    <div className="space-y-4 mb-8">
                      {program.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-champagne-600" />
                          <span className="text-stone-600 font-light">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mb-8">
                      <div className="text-lg font-serif text-stone-800">{program.investment}</div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => toast.success("Consultation request received!", {
                          description: "We'll reach out to schedule your session within 24 hours.",
                        })}
                        className={`w-full ${
                          program.featured
                            ? "bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white"
                            : "bg-champagne-100 hover:bg-champagne-200 text-champagne-800"
                        } font-light tracking-wide transition-all duration-300`}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Consultation
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-champagne-200 text-champagne-700 hover:bg-champagne-50 hover:border-champagne-300 font-light tracking-wide"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask Questions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-stone-50 via-champagne-50/20 to-stone-50">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <Badge className="mb-8 bg-champagne-100 text-champagne-800 border-champagne-200 font-light tracking-wider">
              <Quote className="w-3 h-3 mr-2" />
              Client Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8 tracking-wide">
              Voices of <span className="text-champagne-600">Transformation</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
              The true measure of our work lies in the profound changes experienced by those we have the privilege to
              guide and mentor.
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-champagne-200/50 overflow-hidden">
                <CardContent className="p-12 relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-champagne-100/20 to-transparent rounded-full -translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-champagne-100/20 to-transparent rounded-full translate-x-16 translate-y-16" />
                  
                  <div className="relative">
                    <Quote className="w-12 h-12 text-champagne-400/30 mx-auto mb-8" />

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-2xl text-stone-700 mb-12 font-light leading-relaxed italic"
                    >
                      "{testimonials[currentTestimonial].quote}"
                    </motion.p>

                    <div className="w-24 h-px bg-gradient-to-r from-champagne-400 via-champagne-500 to-champagne-400 mx-auto mb-8 opacity-50" />

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="flex items-center justify-center space-x-6"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-champagne-100 to-champagne-200 rounded-full flex items-center justify-center ring-4 ring-champagne-100 ring-offset-4 ring-offset-white/80">
                        {React.createElement(testimonials[currentTestimonial].icon, {
                          className: "w-10 h-10 text-champagne-600",
                        })}
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-serif text-stone-800 mb-1">{testimonials[currentTestimonial].name}</div>
                        <div className="text-champagne-700 font-light mb-1">{testimonials[currentTestimonial].role}</div>
                        <div className="text-stone-500 text-sm font-light flex items-center">
                          <Globe className="w-3 h-3 mr-2 text-champagne-500" />
                          {testimonials[currentTestimonial].location}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-6 mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={prevTestimonial}
                className="border-champagne-200 text-champagne-700 hover:bg-champagne-50 hover:border-champagne-300 rounded-full w-12 h-12 p-0 shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={nextTestimonial}
                className="border-champagne-200 text-champagne-700 hover:bg-champagne-50 hover:border-champagne-300 rounded-full w-12 h-12 p-0 shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-500 ease-out ${
                    index === currentTestimonial 
                      ? "w-8 h-2 bg-gradient-to-r from-champagne-400 to-champagne-600" 
                      : "w-2 h-2 bg-champagne-200 hover:bg-champagne-300"
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-gradient-to-br from-champagne-50 to-stone-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-8 bg-champagne-100 text-champagne-800 border-champagne-200 font-light tracking-wider">
              <Mail className="w-3 h-3 mr-2" />
              Stay Connected
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8 tracking-wide">
              Weekly <span className="text-champagne-600">Insights</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-stone-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Receive exclusive insights, career tips, and industry trends directly in your inbox. Join thousands of
              professionals who start their week with Eno's wisdom.
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-lg p-8 border border-champagne-200 shadow-sm"
              >
                <CheckCircle className="w-12 h-12 text-champagne-600 mx-auto mb-4" />
                <h3 className="text-xl font-serif text-stone-800 mb-2">Welcome to the Community!</h3>
                <p className="text-stone-600 font-light">
                  Thank you for subscribing. Your first insight will arrive this Monday.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white px-8"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
                <p className="text-stone-500 text-sm mt-4 font-light">No spam, ever. Unsubscribe at any time.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8 tracking-wide">
              Let's <span className="text-champagne-600">Connect</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mb-8" />
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              Ready to begin your transformation? Share your story and let's explore how we can work together to achieve
              your professional goals.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-champagne-50 rounded-lg p-12 border border-champagne-200 text-center"
            >
              <CheckCircle className="w-16 h-16 text-champagne-600 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-stone-800 mb-4">Message Received!</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Thank you for reaching out. Eno will personally review your message and respond within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg border-champagne-200/50">
                <CardContent className="p-12">
                  <form onSubmit={handleContactSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-stone-700 font-light">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                          className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-stone-700 font-light">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                          className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-stone-700 font-light">
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell Eno about your career goals, challenges, or questions. The more details you share, the better she can assist you."
                        rows={6}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400 resize-none"
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        onClick={() => {
                          toast.promise(
                            new Promise((resolve) => setTimeout(resolve, 2000)),
                            {
                              loading: 'Sending your message...',
                              success: 'Message sent successfully!',
                              error: 'Failed to send message.',
                            }
                          )
                        }}
                        className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white px-12 py-4 text-lg font-light tracking-wide"
                      >
                        <Send className="w-5 h-5 mr-3" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-stone-800 to-champagne-900">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-stone-50 mb-8 tracking-wide">
              Ready to Transform Your Career?
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-400 to-transparent mx-auto mb-8" />
            <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Every extraordinary career begins with a single, deliberate step. Allow us to guide you toward the
              excellence you seek.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white px-10 py-4 text-lg font-light tracking-wide"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Schedule Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-champagne-400 text-champagne-300 hover:bg-champagne-700 hover:border-champagne-300 px-10 py-4 text-lg font-light tracking-wide"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Message Eno Directly
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <Crown className="w-6 h-6 text-champagne-500 mr-2" />
                <h3 className="text-2xl font-serif text-stone-100">Eno Eka</h3>
              </div>
              <p className="text-stone-400 font-light leading-relaxed max-w-md mb-6">
                Dedicated to the art of professional transformation through timeless wisdom, proven methodologies, and
                unwavering commitment to excellence.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-champagne-400 text-champagne-400 hover:bg-champagne-400 hover:text-stone-900"
                  onClick={() => window.open("https://linkedin.com/in/enoeka", "_blank")}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-champagne-400 text-champagne-400 hover:bg-champagne-400 hover:text-stone-900"
                  onClick={() => window.open("https://instagram.com/enoeka", "_blank")}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-champagne-400 text-champagne-400 hover:bg-champagne-400 hover:text-stone-900"
                  onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-stone-100 mb-6">Programs</h4>
              <ul className="space-y-3 text-stone-400 font-light">
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer">
                  The Analyst's Journey
                </li>
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer">
                  Executive Presence
                </li>
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer">
                  Organizational Excellence
                </li>
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer">
                  Private Mentorship
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-stone-100 mb-6">Connect</h4>
              <ul className="space-y-3 text-stone-400 font-light">
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </li>
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </li>
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Newsletter
                </li>
                <li className="hover:text-champagne-400 transition-colors duration-300 cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-stone-500 font-light">&copy; 2024 Eno Eka. All rights reserved.</p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-stone-500 hover:text-champagne-400 transition-colors duration-300 font-light"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-stone-500 hover:text-champagne-400 transition-colors duration-300 font-light"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
