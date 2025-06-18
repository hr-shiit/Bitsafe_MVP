"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Loader2, Wallet } from "lucide-react"
import Link from "next/link"

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function ConnectWallet() {
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [error, setError] = useState("")

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install MetaMask to continue.")
      return
    }

    setConnecting(true)
    setError("")

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        setConnected(true)

        // Store wallet connection in localStorage
        localStorage.setItem("walletConnected", "true")
        localStorage.setItem("walletAddress", accounts[0])

        // Redirect to KYC after 2 seconds
        setTimeout(() => {
          window.location.href = "/verify-kyc"
        }, 2000)
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      if (error.code === 4001) {
        setError("Connection rejected. Please try again.")
      } else {
        setError("Failed to connect wallet. Please try again.")
      }
    } finally {
      setConnecting(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-800/30 absolute left-4 top-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent text-center">
            BitSafe
          </h1>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-center text-white">Connect Wallet</h2>
            <p className="text-purple-300 text-center">Connect your MetaMask wallet to access BitSafe</p>
          </div>

          {connected ? (
            <Card className="bg-gray-900/50 border-green-500/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-500 mb-2">Wallet Connected!</h3>
                <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-purple-300 mb-1">Connected Address:</p>
                  <p className="text-sm font-mono text-green-400">{formatAddress(walletAddress)}</p>
                </div>
                <p className="text-purple-300 mb-4">Redirecting to verification...</p>
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center space-y-6">
              {error && (
                <Card className="bg-red-900/20 border-red-500/50">
                  <CardContent className="p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </CardContent>
                </Card>
              )}

              <Button
                onClick={connectWallet}
                disabled={connecting}
                className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-white px-16 py-8 text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                {connecting ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-6 h-6 mr-3" />
                    Connect MetaMask
                  </>
                )}
              </Button>

              <div className="mt-8 p-4 bg-gray-900/30 rounded-lg border border-purple-700/30">
                <p className="text-sm text-purple-300 text-center mb-2">Don't have MetaMask?</p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline text-sm"
                >
                  Download MetaMask →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
