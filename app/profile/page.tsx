"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, Shield, Wallet, Edit3, Save, X, LogOut, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const userProfile = {
  firstName: "Alexander",
  lastName: "Sterling",
  email: "alexander.sterling@email.com",
  phone: "+1 (555) 123-4567",
  country: "United States",
  occupation: "Investment Manager",
  annualIncome: "$250,000+",
  investmentExperience: "Professional Investor",
  walletAddress: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
  kycStatus: "Verified",
  memberSince: "January 2024",
  totalInvestments: "2.45 BTC",
  portfolioValue: "3.12 BTC",
  riskTolerance: "Moderate to High",
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/30 border-b border-purple-800/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                BitSafe
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-purple-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/portfolio" className="text-purple-300 hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link href="/profile" className="text-white">
                Profile
              </Link>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-purple-300">Connected Wallet</p>
                  <p className="text-sm font-mono text-white">0x742d...C4C4</p>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-purple-800/30">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-purple-500/50">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-2xl font-bold">
                  {userProfile.firstName.charAt(0)}
                  {userProfile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold mb-2 text-white">
                  {userProfile.firstName} {userProfile.lastName}
                </h2>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    KYC Verified
                  </Badge>
                  <p className="text-purple-300">Member since {userProfile.memberSince}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "bg-gray-600 hover:bg-gray-700" : "bg-purple-600 hover:bg-purple-700"}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-white">Personal Information</CardTitle>
                {isEditing && (
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-purple-300">
                      First Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={editedProfile.firstName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-purple-400" />
                        <span className="text-white">{userProfile.firstName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-purple-300">
                      Last Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={editedProfile.lastName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-purple-400" />
                        <span className="text-white">{userProfile.lastName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-300">
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-purple-400" />
                        <span className="text-white">{userProfile.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-purple-300">
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className="bg-gray-800/80 border-purple-600/50 focus:border-purple-500 text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-purple-400" />
                        <span className="text-white">{userProfile.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-300">Country</Label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-white">{userProfile.country}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-300">Occupation</Label>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-purple-400" />
                      <span className="text-white">{userProfile.occupation}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Profile */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">Investment Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-purple-300">Annual Income</Label>
                    <div className="text-white">{userProfile.annualIncome}</div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-300">Investment Experience</Label>
                    <div className="text-white">{userProfile.investmentExperience}</div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-300">Risk Tolerance</Label>
                    <div className="text-white">{userProfile.riskTolerance}</div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-purple-300">Total Investments</Label>
                    <div className="text-white font-semibold">{userProfile.totalInvestments}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Status & Security */}
          <div className="space-y-6">
            {/* Account Status */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-600/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">KYC Status</span>
                  </div>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50">Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 font-medium">Wallet Status</span>
                  </div>
                  <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/50">Connected</Badge>
                </div>

                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm font-medium">Wallet Address</span>
                  </div>
                  <p className="text-xs font-mono text-white break-all">{userProfile.walletAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Summary */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Total Invested</span>
                    <span className="text-white font-semibold">{userProfile.totalInvestments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Current Value</span>
                    <span className="text-white font-semibold">{userProfile.portfolioValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Total Growth</span>
                    <span className="text-green-400 font-semibold">+27.3%</span>
                  </div>
                </div>

                <Link href="/portfolio">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">View Full Portfolio</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gray-900/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-purple-600/50 text-purple-300 hover:bg-purple-800/30"
                >
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-600/50 text-purple-300 hover:bg-purple-800/30"
                >
                  Two-Factor Authentication
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-600/50 text-purple-300 hover:bg-purple-800/30"
                >
                  Download Account Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
