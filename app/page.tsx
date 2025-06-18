"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* Logo/Brand */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4">
              BitSafe
            </h1>
            <p className="text-lg text-purple-300">Professional Web3 Investment Platform</p>
          </div>

          {/* Main Welcome Message */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              Welcome to the Future of
              <span className="block bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Web3 Investment
              </span>
            </h2>

            {/* CTA Button */}
            <Button
              onClick={() => (window.location.href = "/connect-wallet")}
              className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white px-12 py-8 text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Enter BitSafe
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
