"use client"

import { useState, useEffect } from "react"
import { Linkedin, Github } from "lucide-react"

const prompts = [
  {
    id: 1,
    title: "Festival Stories",
    description: "Explain a local festival from my region to a friend from a different part of the country",
    url: "https://aiskillshouse.com/student/qr-mediator.html?uid=10470&promptId=22",
    color: "from-blue-500 to-blue-600",
    icon: "🎉",
  },
  {
    id: 2,
    title: "Money Adventure",
    description: "Suggest a fun way to track my spending that feels more like a story or game than a spreadsheet",
    url: "https://aiskillshouse.com/student/qr-mediator.html?uid=10470&promptId=21",
    color: "from-red-500 to-red-600",
    icon: "✨",
  },
  {
    id: 3,
    title: "College Fest Ideas",
    description: "My college fest is coming up. Help me brainstorm 5 unique ideas for a stall or event that are low-cost but can attract a lot of footfall",
    url: "https://aiskillshouse.com/student/qr-mediator.html?uid=10470&promptId=20",
    color: "from-yellow-500 to-yellow-600",
    icon: "🎪",
  },
  {
    id: 4,
    title: "Podcast Planning",
    description: "I want to start a podcast for college students. Brainstorm 5 unique podcast concepts and suggest a name and a target audience for each",
    url: "https://aiskillshouse.com/student/qr-mediator.html?uid=10470&promptId=19",
    color: "from-green-500 to-green-600",
    icon: "🎙️",
  },
  {
    id: 5,
    title: "Study Schedule",
    description: "Create a 7-day study plan for my upcoming final exams, including short breaks",
    url: "https://aiskillshouse.com/student/qr-mediator.html?uid=10470&promptId=18",
    color: "from-purple-500 to-purple-600",
    icon: "📚",
  },
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const runPromptInPopup = (url: string) => {
    try {
      // Open in a new tab/window. Browser popup blockers may block multiple opens unless allowed.
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (err) {
      // Fallback to setting location (will navigate current tab) if popups are blocked
      window.location.href = url
    }
  }

  // Referral code for Bitcoin Conference — display and copy-to-clipboard helper
  const referralCode = "Y7G2MUM1"
  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setToastMessage("Referral code copied to clipboard")
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 3500)
    } catch (err) {
      setToastMessage("Could not copy referral code")
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 3500)
    }
  }

  // Sequentially open prompts with a small delay to reduce popup blocking.
  const [isLaunchingAll, setIsLaunchingAll] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [blockedPrompts, setBlockedPrompts] = useState<string[]>([])

  const launchAllPrompts = async (delay = 350) => {
    if (isLaunchingAll) return
    setIsLaunchingAll(true)
    setBlockedPrompts([])

    const blocked: string[] = []
    let openedCount = 0

    for (const p of prompts) {
      try {
        // Attempt to open — window.open returns null if blocked.
        const w = window.open(p.url, "_blank", "noopener,noreferrer")
        if (!w) {
          blocked.push(p.title)
        } else {
          openedCount += 1
        }
      } catch (err) {
        blocked.push(p.title)
      }

      // Wait between opens to reduce chance of popup-block.
      // Small delay improves browser acceptance of multiple user-initiated opens.
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, delay))
    }

    setBlockedPrompts(blocked)
    const msg = blocked.length === 0
      ? `Opened ${openedCount} prompts.`
      : `Opened ${openedCount} prompts; ${blocked.length} blocked.`

    setToastMessage(msg)
    setToastVisible(true)
    // Auto hide toast after a short time
    setTimeout(() => setToastVisible(false), 6000)
    setIsLaunchingAll(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 transition-colors duration-300">
      {/* Header Section */}
      <header className="px-4 py-12 sm:py-20 md:py-28 bg-gradient-to-b from-transparent to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 text-center ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 text-balance leading-tight mx-auto">
              Student Challenges
            </h1>
          </div>
        </div>
      </header>

            {/* Section grouping note */}
            <div className="mt-10">
              <h2 className="text-xl text-white font-semibold text-center mb-2">Student Challenges</h2>
                <p className="text-center text-gray-400 mb-6">Interactive student prompts and initiatives to boost your skills.</p>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => launchAllPrompts()}
                    disabled={isLaunchingAll}
                    aria-busy={isLaunchingAll}
                    className={`group relative inline-block bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 cursor-pointer hover:-translate-y-1 active:scale-95 backdrop-blur-sm text-base ${isLaunchingAll ? "opacity-70 cursor-wait" : ""}`}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-full blur-xl opacity-60"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLaunchingAll ? "Launching..." : "Launch All Prompts 🚀"}
                    </span>
                  </button>
                </div>
              </div>

      {/* Prompt Cards Section */}
      <section className="px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {prompts.map((item, index) => (
              <div
                key={item.id}
                className={`group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="h-full bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6 lg:p-8 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-gray-700 transition-all duration-300 flex flex-col hover:-translate-y-2">
                  {/* Icon and Title */}
                  <div className="mb-4">
                    <div className="text-4xl mb-3 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">{item.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base mb-6 flex-grow">{item.description}</p>

                  {/* Button */}
                  <button
                    onClick={() => runPromptInPopup(item.url)}
                    className={`inline-block bg-gradient-to-r ${item.color} text-white font-semibold py-3 px-6 rounded-full hover:shadow-xl hover:shadow-current/25 hover:scale-110 transition-all duration-300 text-center cursor-pointer hover:-translate-y-1 active:scale-95 backdrop-blur-sm`}
                  >
                    Run Prompt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comet Promotion Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Side */}
            <div className="lg:w-1/2">
              <div className="relative group">
                <img
                  src="https://res.cloudinary.com/dswc5otiq/image/upload/v1761476137/Comet.._eivlgg.jpg"
                  alt="Comet Browser"
                  className="rounded-2xl shadow-2xl shadow-blue-500/10 group-hover:shadow-blue-500/20 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-balance leading-tight">
                🚀 Introducing Comet – The Future of Browsing for Students!
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Elevate your browsing experience with Comet! Get ready to explore the web at the speed of thought. ✨🎓
                </p>
                
                <div className="bg-blue-950/50 p-6 rounded-xl border border-blue-500/20">
                  <h3 className="text-xl font-semibold text-white mb-4">🎁 Special Offer for Students!</h3>
                  <p>Get 1 month of Comet and Perplexity Pro absolutely FREE after verification! 🎉</p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-white">📑 Installation Steps (Desktop/Laptop only):</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Sign up using your college email 📧</li>
                    <li>Download Comet and login with the same email</li>
                    <li>Complete at least 2 prompts or tasks</li>
                  </ol>
                </div>

                <div className="pt-4">
                  <a
                    href="https://pplx.ai/gopichand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-full hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 text-center"
                  >
                    Get Started with Comet 🚀
                  </a>
                </div>

                <p className="text-gray-400 mt-6">
                  Questions? Contact via WhatsApp:{" "}
                  <a 
                    href="https://wa.me/919381422750"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    +91 9381422750
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bitcoin Conference Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            {/* Image Side */}
            <div className="lg:w-1/2">
              <div className="relative group">
                <img
                  src="https://res.cloudinary.com/dswc5otiq/image/upload/v1761476795/Bit_Coin_Conference_garsed.jpg"
                  alt="Bitcoin Conference"
                  className="rounded-2xl shadow-2xl shadow-yellow-500/10 group-hover:shadow-yellow-500/20 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-balance leading-tight">
                India's Biggest Bitcoin & Web3 Conference is HERE! 💥
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  🎯 Want to learn how crypto, blockchain & Web3 are shaping the future?
                </p>
                
                <div className="bg-yellow-950/30 p-6 rounded-xl border border-yellow-500/20">
                  <h3 className="text-xl font-semibold text-white mb-4">What you'll get:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      Free access to talks by top global crypto experts 🙌
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      Chance to win exclusive Bitcoin Merchandise (T-Shirts, Stickers & more!) 🏆
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-4 rounded-lg">
                  <p className="text-yellow-400 font-semibold">⚡ Limited Seats Available!</p>
                  <p className="text-sm text-gray-300 mt-1">Sign up now to secure your spot and grab exclusive swags</p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-300">Referral code:</span>
                    <span className="font-mono font-semibold text-white bg-yellow-900/10 px-3 py-1 rounded">{referralCode}</span>
                    <button
                      type="button"
                      onClick={copyReferralCode}
                      className="ml-2 inline-flex items-center gap-2 text-sm bg-yellow-600 hover:bg-yellow-500 text-white rounded px-3 py-1 transition"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://rewards.bitcoinconferenceindia.com/?referralCode=Y7G2MUM1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold py-4 px-8 rounded-full hover:shadow-xl hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300 text-center"
                    >
                      Register Now for Free 🎟️
                    </a>
                  </div>

                </div>

                <p className="text-sm text-gray-400 italic">
                  🌟 Register ASAP to get your entry pass for the BITCOIN Conference and win exciting swags!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Toast / confirmation */}
      {toastVisible && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-indigo-500/20 backdrop-blur-sm max-w-lg text-center animate-in fade-in slide-in-from-bottom-4 border border-gray-800 dark:border-gray-700">
            <div className="font-medium">{toastMessage}</div>
            {blockedPrompts.length > 0 && (
              <div className="text-sm mt-2 text-gray-300">Blocked: {blockedPrompts.join(", ")}</div>
            )}
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="border-t border-gray-800 px-4 py-12 sm:py-16 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
              <span className="font-semibold text-white">Gopi Chand</span> |{" "}
              <span className="text-gray-300">Google Student Ambassador</span>
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
                           <a
                  href="https://mvp.microsoft.com/en-US/studentambassadors/profile/f9530070-7b3e-4730-a06f-d6d5fac208e2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="Microsoft Ambassador"
                  title="Microsoft Learn Student Ambassador"
                >
                  {/* Microsoft logo (small) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
                  </svg>
                </a>
              <a
                href="https://www.linkedin.com/in/gopichand-chowdary-kollu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
                <a
                  href="https://github.com/GopichandKollu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
