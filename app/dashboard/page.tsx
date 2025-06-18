"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, User, Building2, Star, Bitcoin, PieChart, LogOut, Settings, UserCircle } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  useEffect(() => {
    // Check wallet connection
    const address = localStorage.getItem("walletAddress")
    if (address) {
      setWalletAddress(address)
    }
  }, [])

  const formatAddress = (address: string) => {
    if (!address) return "Not Connected"
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const disconnectWallet = () => {
    localStorage.removeItem("walletConnected")
    localStorage.removeItem("walletAddress")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-gray-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                BitSafe
              </h1>
              <p className="text-purple-300">Dashboard</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-purple-300">Connected Wallet</p>
                <p className="text-sm font-mono text-white">{formatAddress(walletAddress)}</p>
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 hover:bg-purple-800/30"
                >
                  <UserCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-300">Profile</span>
                </Button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 border border-purple-700/50 rounded-lg shadow-xl z-50">
                    <div className="p-2">
                      <Link href="/portfolio">
                        <Button variant="ghost" className="w-full justify-start text-purple-300 hover:bg-purple-800/30">
                          <PieChart className="w-4 h-4 mr-2" />
                          Portfolio
                        </Button>
                      </Link>
                      <Link href="/profile">
                        <Button variant="ghost" className="w-full justify-start text-purple-300 hover:bg-purple-800/30">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-purple-300 hover:bg-purple-800/30"
                        onClick={disconnectWallet}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome to BitSafe</h2>
          <p className="text-purple-300">Explore our investment opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">Available Funds</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">Total Volume</p>
                  <p className="text-2xl font-bold text-white">0 BTC</p>
                </div>
                <Bitcoin className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">Active Investors</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
                <User className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">Avg. Returns</p>
                  <p className="text-2xl font-bold text-white">0%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Funds Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Investment Opportunities</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mock Investment 1 */}
            <Card className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600 transition-all duration-300 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-purple-600 text-white">M1</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-white">Mock 1 Investment</CardTitle>
                      <p className="text-sm text-purple-300">BitSafe Capital</p>
                      <p className="text-xs text-gray-400 font-mono mt-1">0x96ec...5ab6</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">Conservative</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-purple-200">
                  A conservative investment strategy focused on stable returns with minimal risk exposure.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-purple-300">Total Volume</p>
                    <p className="font-semibold text-white">0 BTC</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Growth (YTD)</p>
                    <p className="font-semibold flex items-center text-gray-500">0%</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Min. Investment</p>
                    <p className="font-semibold text-white">0.1 BTC</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Rating</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gray-500" />
                      <span className="ml-1 font-semibold text-white">0</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                  <p className="text-sm text-purple-300">0 investors</p>
                  <div className="space-x-2">
                    <Link href="/mock-1-investment">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-700/50 text-purple-300 hover:text-white"
                      >
                        Details
                      </Button>
                    </Link>
                    <Link href="/mock-1-investment">
                      <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                        Invest Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mock Investment 2 */}
            <Card className="bg-gray-900/50 border-purple-800/30 hover:border-purple-600 transition-all duration-300 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-purple-600 text-white">M2</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-white">Mock 2 Investment</CardTitle>
                      <p className="text-sm text-purple-300">BitSafe Ventures</p>
                      <p className="text-xs text-gray-400 font-mono mt-1">0xf313...bd89</p>
                    </div>
                  </div>
                  <Badge className="bg-red-600/20 text-red-400 border-red-500/50">Aggressive</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-purple-200">
                  High-growth investment strategy targeting maximum returns through advanced trading algorithms.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-purple-300">Total Volume</p>
                    <p className="font-semibold text-white">0 BTC</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Growth (YTD)</p>
                    <p className="font-semibold flex items-center text-gray-500">0%</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Min. Investment</p>
                    <p className="font-semibold text-white">0.05 BTC</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300">Rating</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gray-500" />
                      <span className="ml-1 font-semibold text-white">0</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                  <p className="text-sm text-purple-300">0 investors</p>
                  <div className="space-x-2">
                    <Link href="/mock-2-investment">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-700/50 text-purple-300 hover:text-white"
                      >
                        Details
                      </Button>
                    </Link>
                    <Link href="/mock-2-investment">
                      <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
                        Invest Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
