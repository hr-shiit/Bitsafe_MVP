"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, ArrowUpRight, ArrowDownRight, Bitcoin, DollarSign, Percent, Calendar, LogOut } from "lucide-react"
import Link from "next/link"

const portfolioData = {
  totalInvestment: 2.45,
  currentValue: 3.12,
  totalGrowth: 27.3,
  totalGrowthAmount: 0.67,
}

const investments = [
  {
    id: 1,
    fundName: "Bitcoin Alpha Fund",
    manager: "Goldman Crypto",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    invested: 0.8,
    currentValue: 1.05,
    growth: 31.25,
    growthAmount: 0.25,
    allocation: 33.7,
    investedDate: "2024-01-15",
    category: "Conservative",
  },
  {
    id: 2,
    fundName: "DeFi Yield Maximizer",
    manager: "Crypto Ventures LLC",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    invested: 1.2,
    currentValue: 1.48,
    growth: 23.33,
    growthAmount: 0.28,
    allocation: 47.4,
    investedDate: "2024-02-03",
    category: "Aggressive",
  },
  {
    id: 3,
    fundName: "Stable Growth Fund",
    manager: "Fidelity Crypto",
    managerAvatar: "/placeholder.svg?height=32&width=32",
    invested: 0.45,
    currentValue: 0.59,
    growth: 31.11,
    growthAmount: 0.14,
    allocation: 18.9,
    investedDate: "2024-03-10",
    category: "Conservative",
  },
]

const recentTransactions = [
  {
    id: 1,
    type: "deposit",
    fund: "DeFi Yield Maximizer",
    amount: 0.3,
    date: "2024-03-15",
    status: "completed",
    txHash: "0x1234...5678",
  },
  {
    id: 2,
    type: "withdrawal",
    fund: "Bitcoin Alpha Fund",
    amount: 0.15,
    date: "2024-03-12",
    status: "pending",
    txHash: "0x9876...4321",
  },
  {
    id: 3,
    type: "deposit",
    fund: "Stable Growth Fund",
    amount: 0.45,
    date: "2024-03-10",
    status: "completed",
    txHash: "0x5555...7777",
  },
]

export default function Portfolio() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-gray-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              BitSafe
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-purple-300">Connected Wallet</p>
                <p className="text-sm font-mono text-white">0x742d...C4C4</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Portfolio Overview */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-white">My Portfolio</h2>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-300">Total Invested</p>
                    <p className="text-2xl font-bold text-white">{portfolioData.totalInvestment} BTC</p>
                  </div>
                  <Bitcoin className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-300">Current Value</p>
                    <p className="text-2xl font-bold text-white">{portfolioData.currentValue} BTC</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-300">Total Growth</p>
                    <p className="text-2xl font-bold text-green-500">+{portfolioData.totalGrowth}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-300">Profit/Loss</p>
                    <p className="text-2xl font-bold text-green-500">+{portfolioData.totalGrowthAmount} BTC</p>
                  </div>
                  <Percent className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Investment Holdings */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-white">Investment Holdings</h3>
            <div className="space-y-4">
              {investments.map((investment) => (
                <Card key={investment.id} className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={investment.managerAvatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {investment.manager.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-white">{investment.fundName}</h4>
                          <p className="text-sm text-purple-300">{investment.manager}</p>
                        </div>
                      </div>
                      <Badge variant={investment.category === "Conservative" ? "secondary" : "destructive"}>
                        {investment.category}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-purple-300">Invested</p>
                        <p className="font-semibold text-white">{investment.invested} BTC</p>
                      </div>
                      <div>
                        <p className="text-xs text-purple-300">Current Value</p>
                        <p className="font-semibold text-white">{investment.currentValue} BTC</p>
                      </div>
                      <div>
                        <p className="text-xs text-purple-300">Growth</p>
                        <p className="font-semibold text-green-500 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />+{investment.growth}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-purple-300">P&L</p>
                        <p className="font-semibold text-green-500">+{investment.growthAmount} BTC</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-purple-300">Portfolio Allocation</span>
                        <span className="text-white">{investment.allocation}%</span>
                      </div>
                      <Progress value={investment.allocation} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                      <div className="flex items-center text-sm text-purple-300">
                        <Calendar className="w-4 h-4 mr-1" />
                        Invested on {new Date(investment.investedDate).toLocaleDateString()}
                      </div>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-700/50 text-purple-300 hover:text-white"
                        >
                          Add More
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => setShowWithdrawModal(true)}>
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Recent Transactions</h3>
            <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${tx.type === "deposit" ? "bg-green-500/20" : "bg-red-500/20"}`}
                        >
                          {tx.type === "deposit" ? (
                            <ArrowDownRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-white">
                            {tx.type === "deposit" ? "Deposit" : "Withdrawal"}
                          </p>
                          <p className="text-xs text-purple-300">{tx.fund}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold text-sm ${tx.type === "deposit" ? "text-green-500" : "text-red-500"}`}
                        >
                          {tx.type === "deposit" ? "+" : "-"}
                          {tx.amount} BTC
                        </p>
                        <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 border-purple-700/50 text-purple-300 hover:text-white">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-purple-800/30 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <ArrowDownRight className="w-4 h-4 mr-2" />
                  Deposit Funds
                </Button>
                <Button variant="outline" className="w-full border-purple-700/50 text-purple-300 hover:text-white">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Withdraw All
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full border-purple-700/50 text-purple-300 hover:text-white">
                    Explore More Funds
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Withdrawal Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-gray-900 border-purple-700/50 w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-white">Withdraw Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-purple-300">
                  Your withdrawal request will be sent to the fund manager for approval. You will receive the funds in
                  your connected wallet once approved.
                </p>
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ Withdrawal requests typically take 24-48 hours for approval.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-purple-700/50 text-purple-300"
                    onClick={() => setShowWithdrawModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      setShowWithdrawModal(false)
                      // Handle withdrawal logic here
                    }}
                  >
                    Confirm Withdrawal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
