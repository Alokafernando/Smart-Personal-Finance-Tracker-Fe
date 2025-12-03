import React, { useState } from "react";
import { Mail, MessageCircle, HelpCircle, Info, Bot } from "lucide-react";

export default function HelpPage() {
  const [openChat, setOpenChat] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setChatLog((prev) => [...prev, `You: ${message}`]);

    // Fake AI reply
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        `AI: I'm here to help you with anything related to finance tracking!`,
      ]);
    }, 800);

    setMessage("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full overflow-y-auto">

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <HelpCircle className="text-blue-600" size={28} />
          Help & Support
        </h1>
        <p className="text-gray-500 text-sm">
          Need help? We’re here to assist you with your Smart Personal Finance Tracker.
        </p>
      </header>

      {/* Main Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="text-blue-600" size={20} /> Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-700">💰 How do I add income or expense?</h3>
              <p className="text-gray-500 mt-1">
                Go to the “Transactions” page or use the quick add buttons on the Dashboard.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">📈 Can I see spending analytics?</h3>
              <p className="text-gray-500 mt-1">
                Yes! The “Analytics” page shows category-wise and monthly insights.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">🗂 Can I export my data?</h3>
              <p className="text-gray-500 mt-1">
                Yes, from the Settings → Export section.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">🔒 Is my data secure?</h3>
              <p className="text-gray-500 mt-1">
                Absolutely. Your financial data is encrypted and never shared.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="text-blue-600" size={20} /> Contact Support
          </h2>

          <p className="text-gray-600 text-sm mb-4">
            Fill out the form below and our support team will respond shortly.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Describe your issue..."
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Submit Request
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600 border-t pt-4">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              support@smartfinance.com
            </p>
            <p className="mt-1 text-gray-500 text-xs">
              Support hours: Mon–Fri, 9 AM – 5 PM
            </p>
          </div>
        </div>
      </section>

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setOpenChat(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition hover:scale-105"
      >
        <Bot size={22} />
      </button>

      {/* AI Chat Popup */}
      {openChat && (
        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-lg rounded-xl border p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Bot className="text-blue-600" size={20} /> AI Assistant
            </h3>
            <button
              onClick={() => setOpenChat(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="h-48 overflow-y-auto border rounded-md p-2 mb-3 text-sm bg-gray-50">
            {chatLog.map((msg, index) => (
              <p key={index} className="mb-1">{msg}</p>
            ))}
          </div>

          <form onSubmit={handleChatSend} className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-200"
              placeholder="Ask something..."
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-md text-sm">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
