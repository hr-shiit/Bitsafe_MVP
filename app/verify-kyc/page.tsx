"use client"

import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyKYC() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Link href="/connect-wallet">
            <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-800/30 absolute left-4 top-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent text-center">
            BitSafe
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-center text-white">Identity Verification Required</h2>
            <p className="text-xl text-purple-300 text-center">
              Complete verification to access investment opportunities
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={() => (window.location.href = "/kyc-verification")}
              className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Start Verification
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
