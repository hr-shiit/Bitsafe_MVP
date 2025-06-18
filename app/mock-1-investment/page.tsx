"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Star,
  Users,
  Shield,
  Target,
  DollarSign,
  Loader2,
  Copy,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

const FUND_ADDRESS = "0x96ec7434c7b3d237fda43c8420fe3122350d5ab6"

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function Mock1Investment() {
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [isInvesting, setIsInvesting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [gasPrice, setGasPrice] = useState("")
  const [gasLimit, setGasLimit] = useState("")
  const [transactionHash, setTransactionHash] = useState("")
  const [transactionStatus, setTransactionStatus] = useState("")
  const [ethPrice, setEthPrice] = useState("")
  const [fundBalance, setFundBalance] = useState("0")
  const [transactionCount, setTransactionCount] = useState("0")

  useEffect(() => {
    const address = localStorage.getItem("walletAddress")
    if (address) {
      setWalletAddress(address)
    }
    fetchLiveData()
    fetchGasData()

    // Fetch data every 30 seconds
    const interval = setInterval(() => {
      fetchLiveData()
      fetchGasData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchLiveData = async () => {
    try {
      // Fetch ETH price
      const priceResponse = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      const priceData = await priceResponse.json()
      setEthPrice(priceData.ethereum.usd.toFixed(2))

      // Fetch fund balance and transaction count using Etherscan API
      const etherscanApiKey = "YourEtherscanAPIKey" // You'll need to get this from etherscan.io

      // Get balance
      const balanceResponse = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${FUND_ADDRESS}&tag=latest&apikey=${etherscanApiKey}`,
      )
      const balanceData = await balanceResponse.json()
      if (balanceData.status === "1") {
        const balanceInEth = (Number.parseInt(balanceData.result) / 1e18).toFixed(4)
        setFundBalance(balanceInEth)
      }

      // Get transaction count
      const txCountResponse = await fetch(
        `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${FUND_ADDRESS}&tag=latest&apikey=${etherscanApiKey}`,
      )
      const txCountData = await txCountResponse.json()
      if (txCountData.result) {
        setTransactionCount(Number.parseInt(txCountData.result, 16).toString())
      }
    } catch (error) {
      console.error("Error fetching live data:", error)
    }
  }

  const fetchGasData = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        // Get current gas price
        const gasPrice = await window.ethereum.request({
          method: "eth_gasPrice",
        })
        const gasPriceInGwei = Number.parseInt(gasPrice, 16) / 1e9
        setGasPrice(gasPriceInGwei.toFixed(2))

        // Estimate gas limit for a simple transfer
        try {
          const gasEstimate = await window.ethereum.request({
            method: "eth_estimateGas",
            params: [
              {
                to: FUND_ADDRESS,
                value: "0x1",
                from: walletAddress,
              },
            ],
          })
          const gasLimitEstimate = Number.parseInt(gasEstimate, 16)
          setGasLimit(gasLimitEstimate.toString())
        } catch (error) {
          setGasLimit("21000") // Default gas limit for simple transfer
        }
      }
    } catch (error) {
      console.error("Error fetching gas data:", error)
    }
  }

  const handleInvest = async () => {
    if (!investmentAmount || Number.parseFloat(investmentAmount) < 0.01) {
      alert("Minimum investment is 0.01 ETH")
      return
    }

    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install MetaMask to make investments.")
      return
    }

    setIsInvesting(true)
    setTransactionStatus("Preparing transaction...")

    try {
      // Convert ETH amount to Wei
      const amountInWei = (Number.parseFloat(investmentAmount) * 1e18).toString(16)

      setTransactionStatus("Waiting for user confirmation...")

      // Send transaction
      const transactionParameters = {
        to: FUND_ADDRESS,
        from: walletAddress,
        value: "0x" + amountInWei,
        gas: "0x" + Number.parseInt(gasLimit).toString(16),
        gasPrice: "0x" + (Number.parseFloat(gasPrice) * 1e9).toString(16),
      }

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })

      setTransactionHash(txHash)
      setTransactionStatus("Transaction submitted. Waiting for confirmation...")

      // Wait for transaction confirmation
      let receipt = null
      let attempts = 0
      const maxAttempts = 60 // Wait up to 5 minutes

      while (!receipt && attempts < maxAttempts) {
        try {
          receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          })

          if (!receipt) {
            await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait 5 seconds
            attempts++
          }
        } catch (error) {
          await new Promise((resolve) => setTimeout(resolve, 5000))
          attempts++
        }
      }

      if (receipt) {
        if (receipt.status === "0x1") {
          setTransactionStatus("Transaction confirmed successfully!")
          alert(`Investment successful! Transaction hash: ${txHash}`)

          // Refresh live data
          fetchLiveData()
        } else {
          setTransactionStatus("Transaction failed.")
          alert("Transaction failed. Please try again.")
        }
      } else {
        setTransactionStatus("Transaction timeout. Please check manually.")
        alert(`Transaction submitted but confirmation timeout. Hash: ${txHash}`)
      }
    } catch (error: any) {
      console.error("Transaction error:", error)

      if (error.code === 4001) {
        setTransactionStatus("Transaction rejected by user.")
        alert("Transaction was rejected.")
      } else if (error.code === -32603) {
        setTransactionStatus("Insufficient funds for gas.")
        alert("Insufficient funds for gas fees.")
      } else {
        setTransactionStatus("Transaction failed.")
        alert(`Transaction failed: ${error.message}`)
      }
    } finally {
      setIsInvesting(false)
      setInvestmentAmount("")
    }
  }

  const formatAddress = (address: string) => {
    if (!address) return "Not Connected"
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(FUND_ADDRESS)
    alert("Address copied to clipboard!")
  }

  const openEtherscan = () => {
    window.open(`https://etherscan.io/address/${FUND_ADDRESS}`, "_blank")
  }

  const openTransactionOnEtherscan = () => {
    if (transactionHash) {
      window.open(`https://etherscan.io/tx/${transactionHash}`, "_blank")
    }
  }

  const calculateTransactionCost = () => {
    if (gasPrice && gasLimit) {
      const costInEth = (Number.parseFloat(gasPrice) * Number.parseFloat(gasLimit)) / 1e9
      return costInEth.toFixed(6)
    }
    return "0"
  }

  const calculateTotalCost = () => {
    const investAmount = Number.parseFloat(investmentAmount) || 0
    const gasCost = Number.parseFloat(calculateTransactionCost())
    return (investAmount + gasCost).toFixed(6)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-gray-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-800/30">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                BitSafe
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-300">Connected Wallet</p>
              <p className="text-sm font-mono text-white">{formatAddress(walletAddress)}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fund Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fund Header */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-purple-600 text-white text-2xl">M1</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Mock 1 Investment</h1>
                        <p className="text-purple-300">Managed by BitSafe Capital</p>
                      </div>
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">Conservative</Badge>
                    </div>
                    <p className="text-purple-200 mb-4">
                      A conservative investment strategy focused on stable returns with minimal risk exposure. Our
                      experienced team uses proven strategies to deliver consistent performance while protecting your
                      capital.
                    </p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-gray-500" />
                        <span className="text-white font-semibold">0</span>
                        <span className="text-purple-300">(0 reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-white">{transactionCount} transactions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Data */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Live Market Data</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-purple-300">ETH Price</p>
                  <p className="text-xl font-bold text-green-500">${ethPrice}</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-purple-300">Gas Price</p>
                  <p className="text-xl font-bold text-orange-500">{gasPrice} Gwei</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-purple-300">Fund Balance</p>
                  <p className="text-xl font-bold text-white">{fundBalance} ETH</p>
                </div>
              </CardContent>
            </Card>

            {/* Fund Address */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Fund Contract Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-purple-300 mb-1">Ethereum Address</p>
                    <p className="font-mono text-white text-sm break-all">{FUND_ADDRESS}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyAddress}
                      className="border-purple-700/50 text-purple-300 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={openEtherscan}
                      className="border-purple-700/50 text-purple-300 hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-gray-900/50 border-purple-800/30">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-600 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-400">%</span>
                    </div>
                    <p className="text-sm text-purple-300">YTD Return</p>
                    <p className="text-xl font-bold text-white">0%</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-800/30">
                <CardContent className="p-4">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-purple-300">Total Volume</p>
                    <p className="text-xl font-bold text-white">{fundBalance} ETH</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-800/30">
                <CardContent className="p-4">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm text-purple-300">Min. Investment</p>
                    <p className="text-xl font-bold text-white">0.01 ETH</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-purple-800/30">
                <CardContent className="p-4">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-purple-300">Risk Level</p>
                    <p className="text-xl font-bold text-white">Low</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Status */}
            {(isInvesting || transactionHash) && (
              <Card className="bg-gray-900/50 border-purple-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Transaction Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {isInvesting && <Loader2 className="w-4 h-4 animate-spin text-purple-500" />}
                    <p className="text-purple-300">{transactionStatus}</p>
                  </div>
                  {transactionHash && (
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-purple-300 mb-2">Transaction Hash:</p>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-white text-sm break-all">{transactionHash}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openTransactionOnEtherscan}
                          className="border-purple-700/50 text-purple-300 hover:text-white ml-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Investment Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Make Investment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-purple-300">
                    Investment Amount (ETH)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.001"
                    min="0.01"
                    placeholder="0.01"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white"
                  />
                  <p className="text-xs text-purple-300">Minimum investment: 0.01 ETH</p>
                </div>

                {/* Gas Information */}
                <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Investment Amount:</span>
                    <span className="text-white">{investmentAmount || "0"} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Gas Price:</span>
                    <span className="text-white">{gasPrice} Gwei</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Gas Limit:</span>
                    <span className="text-white">{gasLimit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Gas Fee:</span>
                    <span className="text-white">{calculateTransactionCost()} ETH</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-purple-300">Total Cost:</span>
                      <span className="text-white">{calculateTotalCost()} ETH</span>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <p className="text-yellow-400 text-xs">
                      This will initiate a real Ethereum transaction. Make sure you have sufficient ETH for gas fees.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleInvest}
                  disabled={isInvesting || !investmentAmount || Number.parseFloat(investmentAmount) < 0.01}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  {isInvesting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Transaction...
                    </>
                  ) : (
                    "Invest Now (Real Transaction)"
                  )}
                </Button>

                <div className="text-xs text-purple-300 text-center">
                  By investing, you agree to our terms and conditions
                </div>
              </CardContent>
            </Card>

            {/* Fund Information */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-white">Fund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-300">Launch Date:</span>
                  <span className="text-white">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Fund Balance:</span>
                  <span className="text-white">{fundBalance} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Transactions:</span>
                  <span className="text-white">{transactionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Network:</span>
                  <span className="text-white">Ethereum Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Gas Price:</span>
                  <span className="text-white">{gasPrice} Gwei</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
