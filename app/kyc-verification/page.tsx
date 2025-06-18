"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Shield, ArrowLeft, CheckCircle, Upload, Loader2 } from "lucide-react"
import Link from "next/link"

export default function KYCVerification() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setLoading(false)
    setVerified(true)

    // Redirect to dashboard after verification
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/connect-wallet">
            <Button variant="ghost" className="text-purple-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            BitSafe
          </h1>
          <div></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-white">KYC Verification</h2>
            <p className="text-purple-300">Complete your identity verification to access investment opportunities</p>
          </div>

          {verified ? (
            <Card className="bg-gray-900/50 border-green-500 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-500 mb-2">KYC Verification Complete!</h3>
                <p className="text-purple-300 mb-4">
                  Your wallet address has been verified and linked to your identity.
                </p>
                <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-300 mb-1">Verified Wallet Address:</p>
                  <p className="text-sm font-mono text-green-400">0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4</p>
                </div>
                <p className="text-purple-300 mb-4">Redirecting to dashboard...</p>
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Personal Information</CardTitle>
                <div className="flex space-x-2">
                  <div className={`h-2 w-full rounded ${step >= 1 ? "bg-purple-500" : "bg-gray-600"}`}></div>
                  <div className={`h-2 w-full rounded ${step >= 2 ? "bg-purple-500" : "bg-gray-600"}`}></div>
                  <div className={`h-2 w-full rounded ${step >= 3 ? "bg-purple-500" : "bg-gray-600"}`}></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-purple-300">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-purple-300">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-purple-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-purple-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-purple-300">
                        Country
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-purple-600/50">
                          <SelectItem value="us" className="text-white">
                            United States
                          </SelectItem>
                          <SelectItem value="uk" className="text-white">
                            United Kingdom
                          </SelectItem>
                          <SelectItem value="ca" className="text-white">
                            Canada
                          </SelectItem>
                          <SelectItem value="au" className="text-white">
                            Australia
                          </SelectItem>
                          <SelectItem value="de" className="text-white">
                            Germany
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => setStep(2)} className="w-full bg-purple-600 hover:bg-purple-700">
                      Continue
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-purple-300">Government ID</Label>
                      <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <p className="text-purple-300 mb-2">Upload your government-issued ID</p>
                        <p className="text-sm text-gray-400">Passport, Driver's License, or National ID</p>
                        <Button variant="outline" className="mt-4 border-purple-600/50 text-purple-300">
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-purple-300">Proof of Address</Label>
                      <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <p className="text-purple-300 mb-2">Upload proof of address</p>
                        <p className="text-sm text-gray-400">Utility bill or bank statement (last 3 months)</p>
                        <Button variant="outline" className="mt-4 border-purple-600/50 text-purple-300">
                          Choose File
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1 border-purple-600/50 text-purple-300"
                      >
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="occupation" className="text-purple-300">
                        Occupation
                      </Label>
                      <Input
                        id="occupation"
                        placeholder="Software Engineer"
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income" className="text-purple-300">
                        Annual Income Range
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white">
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-purple-600/50">
                          <SelectItem value="0-50k" className="text-white">
                            $0 - $50,000
                          </SelectItem>
                          <SelectItem value="50k-100k" className="text-white">
                            $50,000 - $100,000
                          </SelectItem>
                          <SelectItem value="100k-250k" className="text-white">
                            $100,000 - $250,000
                          </SelectItem>
                          <SelectItem value="250k+" className="text-white">
                            $250,000+
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-purple-300">
                        Investment Experience
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-purple-600/50">
                          <SelectItem value="beginner" className="text-white">
                            Beginner (0-2 years)
                          </SelectItem>
                          <SelectItem value="intermediate" className="text-white">
                            Intermediate (2-5 years)
                          </SelectItem>
                          <SelectItem value="advanced" className="text-white">
                            Advanced (5+ years)
                          </SelectItem>
                          <SelectItem value="professional" className="text-white">
                            Professional Investor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purpose" className="text-purple-300">
                        Investment Purpose
                      </Label>
                      <Textarea
                        id="purpose"
                        placeholder="Describe your investment goals and risk tolerance..."
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1 border-purple-600/50 text-purple-300"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Complete Verification"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-gray-900/30 rounded-lg border border-purple-700/30">
            <p className="text-sm text-purple-300 text-center">
              🔒 Your personal information is encrypted and stored securely. We comply with international data
              protection standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
