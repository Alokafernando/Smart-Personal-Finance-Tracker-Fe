import image from '../assets/application-welcome.png';

export default function Welcome() {
  return (
    <div className="min-h-screen w-full bg-[#0d0f1a] text-white relative">

      {/* HEADER */}
      <header className="w-full fixed top-0 left-0 z-50 bg-[#0d0f1a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            SmartFinance
          </h1>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-gray-300 font-medium ml-130">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>

          {/* Login button */}
          <a
            href="/login"
            className="px-5 py-2 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="min-h-screen w-full flex items-center justify-center px-6 pt-28">
        <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10">

          {/* LEFT SIDE: Hero Text */}
          <div className="flex-1 flex flex-col justify-center ml-6 md:ml-12">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-left">
              <span className="block">Track Your</span>
              <span className="block bg-gradient-to-r from-blue-700 to-purple-800 text-transparent bg-clip-text">
                Smart Finances
              </span>
              <span className="block">Easily</span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg max-w-md text-left">
              Manage expenses, monitor your budget, and stay in control — all in one beautifully
              designed dashboard powered by smart analytics.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <a
                href="/login"
                className="px-6 py-3 bg-blue-600/80 rounded-xl font-semibold hover:bg-blue-700/90 transition shadow-lg"
              >
                Get Started
              </a>

              <a
                href="/login"
                className="px-6 py-3 bg-[#1a1a1a] rounded-xl font-semibold hover:bg-gray-700 transition shadow"
              >
                Login
              </a>
            </div>
          </div>


          {/* RIGHT SIDE: AI Image */}
          <div className="flex-1 flex justify-end items-start relative">
            <img
              src={image}
              alt="AI Generated Illustration"
              className="w-[300px] md:w-[400px] lg:w-[500px] object-contain rounded-l-3xl shadow-2xl -translate-y-8 translate-x-20 border-t border-l border-b border-gray-500"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
