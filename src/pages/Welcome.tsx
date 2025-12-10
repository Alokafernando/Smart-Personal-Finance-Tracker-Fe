"use client"

import {
  Wallet,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  PieChart,
  Receipt,
  Sparkles,
  Menu,
  FileText,
  Brain,
  Camera,
  CheckCircle2,
  X,
  Star,
  Users,
  BarChart3,
  Download,
  Lock,
  ChevronRight,
  Play,
  Clock,
  Smartphone,
  Globe,
  HeartHandshake,
  ArrowDown,
  Check,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function Welcome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Camera,
      title: "Receipt OCR Scanning",
      description: "Simply snap a photo of your receipt and our OCR technology extracts all the details instantly.",
      highlight: "Save 2+ hours weekly",
    },
    {
      icon: Brain,
      title: "AI Category Suggestions",
      description: "Smart AI automatically categorizes your expenses, saving you time and ensuring accuracy.",
      highlight: "98% accuracy rate",
    },
    {
      icon: PieChart,
      title: "Visual Dashboard",
      description: "Beautiful charts and graphs help you understand your spending patterns at a glance.",
      highlight: "Real-time insights",
    },
    {
      icon: FileText,
      title: "PDF Report Export",
      description: "Generate professional monthly reports with detailed breakdowns for your records.",
      highlight: "One-click export",
    },
  ]

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "$2M+", label: "Tracked Monthly", icon: TrendingUp },
    { value: "99.9%", label: "Uptime", icon: Clock },
    { value: "4.9/5", label: "User Rating", icon: Star },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content: "Finally, an expense tracker that actually understands my receipts. The OCR feature is a game-changer!",
      rating: 5,
      image: "/professional-woman-headshot.png",
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content: "The AI categorization saves me hours every month. Highly recommend for anyone serious about finances.",
      rating: 5,
      image: "/professional-man-headshot.png",
    },
    {
      name: "Emily Davis",
      role: "Marketing Manager",
      content: "Beautiful dashboard and easy PDF exports. My accountant loves the detailed reports.",
      rating: 5,
      image: "/business-woman-headshot.png",
    },
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Sign Up Free",
      description: "Create your account in seconds with just your email",
      icon: Users,
    },
    {
      step: "02",
      title: "Add Expenses",
      description: "Manually enter or scan receipts with OCR technology",
      icon: Camera,
    },
    {
      step: "03",
      title: "AI Categorizes",
      description: "Our AI automatically suggests the right category",
      icon: Brain,
    },
    {
      step: "04",
      title: "Track & Export",
      description: "View insights on dashboard and export PDF reports",
      icon: BarChart3,
    },
  ]

  const benefits = [
    { icon: Clock, title: "Save Time", desc: "Automate expense tracking" },
    { icon: Shield, title: "Secure", desc: "Bank-level encryption" },
    { icon: Smartphone, title: "Mobile Ready", desc: "Track on any device" },
    { icon: Globe, title: "Always Available", desc: "24/7 cloud access" },
  ]

  const pricing = [
    { plan: "Free", price: "$0", features: ["50 receipts/month", "Basic dashboard", "Email support"], popular: false },
    {
      plan: "Pro",
      price: "$9",
      features: ["Unlimited receipts", "AI categorization", "PDF exports", "Priority support"],
      popular: true,
    },
    {
      plan: "Business",
      price: "$29",
      features: ["Everything in Pro", "Team accounts", "API access", "Custom reports"],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#faf9f7]">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#1a1a1a]/98 backdrop-blur-xl shadow-lg" : "bg-[#1a1a1a]/95 backdrop-blur-xl"
        } border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SmartFinance</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition text-sm font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition text-sm font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition text-sm font-medium">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition text-sm font-medium">
              Testimonials
            </a>
            <a href="/login" className="text-gray-300 hover:text-white transition text-sm font-medium">
              Login
            </a>
            <a
              href="/register"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-semibold text-white text-sm hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 transition-all"
            >
              Get Started Free
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 border-t border-white/10 bg-[#1a1a1a]">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a href="/login" className="text-gray-300 hover:text-white transition py-2">
                Login
              </a>
              <a
                href="/register"
                className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-semibold text-white text-center mt-2"
              >
                Get Started Free
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-6 animate-bounce"
                style={{ animationDuration: "2s" }}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-600">AI-Powered Finance Tracking</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">NEW</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-6 text-balance">
                Track Your Finances{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  Effortlessly
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Scan receipts with OCR, get AI-powered category suggestions, visualize spending patterns, and export
                professional PDF reports — all in one smart dashboard.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {["No credit card required", "Free forever plan", "Setup in 2 minutes"].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <a
                  href="/register"
                  className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-transform duration-500 group-hover:scale-105" />
                  <span className="relative flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="#how-it-works"
                  className="group px-8 py-4 rounded-2xl font-semibold text-[#1a1a1a] bg-white border-2 border-gray-200 hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>JWT Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>50K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="flex-1 relative">
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-6 border border-gray-100 hover:shadow-3xl transition-shadow duration-500">
                {/* Mini Dashboard */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Balance</p>
                      <p className="text-3xl font-bold text-[#1a1a1a]">$12,450.00</p>
                      <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" /> +12.5% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-50 rounded-xl p-3 text-center hover:bg-green-100 transition-colors cursor-pointer">
                      <p className="text-xs text-gray-500">Income</p>
                      <p className="text-lg font-bold text-green-600">+$5,200</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 text-center hover:bg-red-100 transition-colors cursor-pointer">
                      <p className="text-xs text-gray-500">Expenses</p>
                      <p className="text-lg font-bold text-red-600">-$2,100</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3 text-center hover:bg-amber-100 transition-colors cursor-pointer">
                      <p className="text-xs text-gray-500">Savings</p>
                      <p className="text-lg font-bold text-amber-600">$3,100</p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
                    <div className="flex items-end justify-between h-24 gap-2">
                      {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-amber-500 to-orange-400 rounded-t-lg transition-all hover:from-amber-600 hover:to-orange-500 hover:scale-105 cursor-pointer"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Recent Transactions</p>
                    {[
                      { name: "Grocery Store", amount: "-$45.20", icon: Receipt, color: "bg-green-100 text-green-600" },
                      {
                        name: "AI Categorized",
                        amount: "-$120.00",
                        icon: Brain,
                        color: "bg-purple-100 text-purple-600",
                      },
                      { name: "OCR Scanned", amount: "-$89.99", icon: Camera, color: "bg-blue-100 text-blue-600" },
                    ].map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${tx.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <tx.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{tx.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">Receipt Scanned!</p>
                    <p className="text-xs text-gray-400">AI categorized</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100 animate-bounce"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Download className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">PDF Report Ready</p>
                    <p className="text-xs text-gray-400">June 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <a
              href="#stats"
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
            >
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      <section id="stats" className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm">{benefit.title}</p>
                  <p className="text-xs text-gray-500">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                Track Finances
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools makes personal finance management simple, automated, and insightful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`group p-6 bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  activeFeature === i
                    ? "border-amber-400 shadow-xl shadow-amber-500/10"
                    : "border-gray-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg transition-all duration-300 ${
                    activeFeature === i
                      ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30 scale-110"
                      : "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20 group-hover:scale-110"
                  }`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="inline-block px-2 py-1 bg-amber-100 rounded-full text-xs font-medium text-amber-700 mb-3">
                  {feature.highlight}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Started in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                4 Easy Steps
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and transform how you manage your personal finances.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-6xl font-bold text-white/5 absolute -top-4 left-0">{item.step}</div>
                <div className="relative z-10 pt-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-16 right-0 translate-x-1/2">
                    <ChevronRight className="w-8 h-8 text-amber-500/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl font-semibold text-white hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 transition-all"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Simple Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                Perfect Plan
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 bg-white rounded-2xl border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-amber-400 shadow-xl shadow-amber-500/10 scale-105"
                    : "border-gray-200 hover:border-amber-300 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{plan.plan}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#1a1a1a]">{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/register"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/25"
                      : "bg-gray-100 text-[#1a1a1a] hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-sm font-medium text-amber-700">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Loved by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                Thousands
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our users have to say about their experience with SmartFinance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                  />
                  <div>
                    <p className="font-semibold text-[#1a1a1a]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-10 md:p-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Take Control of Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Finances?
                </span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Join 50,000+ users who have transformed their financial habits with SmartFinance. Start your free trial
                today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/register"
                  className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-transform duration-500 group-hover:scale-105" />
                  <span className="relative flex items-center justify-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="/login"
                  className="px-8 py-4 rounded-2xl font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Login to Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1a1a1a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SmartFinance</span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-gray-400">
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition">
                How It Works
              </a>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
              <a href="#testimonials" className="hover:text-white transition">
                Testimonials
              </a>
              <a href="/login" className="hover:text-white transition">
                Login
              </a>
            </nav>

            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="text-xs">JWT Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Bank-level Security</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            © 2025 SmartFinance. All rights reserved. Built with MERN Stack.
          </div>
        </div>
      </footer>
    </div>
  )
}
