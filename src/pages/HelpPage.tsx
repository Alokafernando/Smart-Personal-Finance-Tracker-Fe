"use client"

import type React from "react"
import { useState } from "react"
import {
  Mail,
  MessageCircle,
  HelpCircle,
  Info,
  Bot,
  ChevronDown,
  ChevronUp,
  Send,
  Book,
  Video,
  FileText,
  ExternalLink,
  Clock,
  CheckCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react"
import { askFAQ } from "../services/faq"

export default function HelpPage() {
  const [openChat, setOpenChat] = useState(false)
  const [message, setMessage] = useState("")
  const [chatLog, setChatLog] = useState<string[]>([])
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I add income or expense?",
      answer:
        "Go to the 'Transactions' page or use the quick add buttons on the Dashboard. You can also scan receipts using our OCR feature for automatic entry.",
      icon: "💰",
    },
    {
      question: "Can I see spending analytics?",
      answer:
        "Yes! The 'Analytics' page shows category-wise and monthly insights with interactive charts and detailed breakdowns.",
      icon: "📈",
    },
    {
      question: "Can I export my data?",
      answer: "Yes, from the Settings → Export section. You can export as PDF or CSV format for your records.",
      icon: "🗂",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. Your financial data is encrypted with JWT authentication and never shared with third parties.",
      icon: "🔒",
    },
    {
      question: "How does AI categorization work?",
      answer:
        "Our AI analyzes your transaction descriptions and automatically suggests the most appropriate category based on patterns.",
      icon: "🤖",
    },
  ]

  const resources = [
    { title: "Getting Started Guide", icon: Book, type: "Article", time: "5 min read" },
    { title: "Video Tutorials", icon: Video, type: "Video", time: "10 videos" },
    { title: "API Documentation", icon: FileText, type: "Docs", time: "Reference" },
  ]

  const handleChatSend = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!message.trim()) return

  // Show user message
  setChatLog((prev) => [...prev, `You: ${message}`])

  const userMsg = message
  setMessage("")

  try {
    // Call backend FAQ service
    const response = await askFAQ(userMsg)

    // Show AI response
    setChatLog((prev) => [...prev, `AI: ${response.answer}`])
  } catch (error) {
    console.error(error)
    setChatLog((prev) => [
      ...prev,
      `AI: Sorry, something went wrong with the server.`,
    ])
  }
}


  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
              <HelpCircle className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
              <p className="text-gray-500">
                Need help? We're here to assist you with your Smart Personal Finance Tracker.
              </p>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-amber-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-gray-700"
            />
          </div>
        </div>

        {/* Quick Resources */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-xl border border-amber-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl group-hover:from-amber-200 group-hover:to-orange-200 transition-all">
                    <resource.icon className="text-amber-600" size={24} />
                  </div>
                  <ExternalLink className="text-gray-300 group-hover:text-amber-500 transition-colors" size={18} />
                </div>
                <h3 className="font-semibold text-gray-800 mt-4">{resource.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">{resource.type}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {resource.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                <Info className="text-amber-600" size={20} />
              </div>
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    expandedFaq === index
                      ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50"
                      : "border-gray-100 bg-white hover:border-amber-200"
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{faq.icon}</span>
                      <span className="font-medium text-gray-700">{faq.question}</span>
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="text-amber-500" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-gray-600 text-sm pl-9 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <HelpCircle className="mx-auto mb-2 text-gray-300" size={32} />
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                <MessageCircle className="text-amber-600" size={20} />
              </div>
              Contact Support
            </h2>

            <p className="text-gray-600 text-sm mb-6">
              Fill out the form below and our support team will respond within 24 hours.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all bg-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all bg-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all bg-white/50 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Request
              </button>
            </form>

            <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <p className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail size={18} className="text-amber-600" />
                </div>
                <span className="font-medium">support@smartfinance.com</span>
              </p>
              <p className="mt-2 text-gray-500 text-sm flex items-center gap-2 ml-11">
                <Clock size={14} />
                Support hours: Mon-Fri, 9 AM - 5 PM
              </p>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            System Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["API Services", "Database", "Authentication", "File Storage"].map((service, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setOpenChat(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-amber-500/40 z-50"
      >
        <Sparkles size={24} />
      </button>

      {/* AI Chat Popup */}
      {openChat && (
        <div className="fixed bottom-24 right-6 w-96 bg-white shadow-2xl rounded-2xl border border-amber-100 overflow-hidden z-50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bot size={22} /> AI Assistant
            </h3>
            <button
              onClick={() => setOpenChat(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 bg-gradient-to-b from-amber-50/50 to-white">
            {chatLog.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Bot className="mx-auto mb-2 text-amber-300" size={40} />
                <p className="text-sm">Hi! How can I help you today?</p>
              </div>
            )}
            {chatLog.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.startsWith("You:") ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                    msg.startsWith("You:")
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-br-md"
                      : "bg-white border border-gray-100 text-gray-700 rounded-bl-md shadow-sm"
                  }`}
                >
                  {msg.replace("You: ", "").replace("AI: ", "")}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSend} className="p-4 border-t border-amber-100 bg-white">
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                placeholder="Ask me anything..."
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-4 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
