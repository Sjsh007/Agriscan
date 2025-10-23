"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock, LogOut, Users, Database, BarChart, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if admin is logged in
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple admin authentication (in a real app, this would be server-side)
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("adminAuth", "true")
        setIsAuthenticated(true)
      } else {
        alert("Invalid credentials. Try admin/admin123")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="w-full max-w-md flex justify-between items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-green-700">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-green-700">Admin Portal</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Lock className="h-8 w-8 text-green-700" />
              </div>
              <h2 className="text-xl font-bold text-green-800">Admin Access</h2>
              <p className="text-sm text-gray-600">Authorized personnel only</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  "Login to Admin"
                )}
              </Button>
            </form>
          </div>
        </Card>

        <div className="w-full max-w-md">
          <p className="text-sm text-gray-600 text-center">
            This area is restricted to authorized administrators only. For demo purposes, use username: admin, password:
            admin123
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-green-700">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-green-700">Admin Dashboard</h1>
        <Button variant="ghost" size="icon" onClick={handleLogout} className="text-red-600">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="p-4">
            <h3 className="font-medium text-green-800 mb-4 flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              System Overview
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-3">
                <h4 className="text-sm text-gray-600 mb-1">Total Users</h4>
                <p className="text-2xl font-bold text-green-700">1,248</p>
              </Card>

              <Card className="p-3">
                <h4 className="text-sm text-gray-600 mb-1">Scans Today</h4>
                <p className="text-2xl font-bold text-green-700">87</p>
              </Card>

              <Card className="p-3">
                <h4 className="text-sm text-gray-600 mb-1">Database Entries</h4>
                <p className="text-2xl font-bold text-green-700">142</p>
              </Card>

              <Card className="p-3">
                <h4 className="text-sm text-gray-600 mb-1">Success Rate</h4>
                <p className="text-2xl font-bold text-green-700">94%</p>
              </Card>
            </div>

            <h4 className="font-medium text-gray-700 mb-2">Recent Activity</h4>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center p-2 bg-gray-50 rounded-md">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">User ID: {1000 + i}</p>
                    <p className="text-xs text-gray-600">Scanned tomato plant - Early Blight detected</p>
                  </div>
                  <p className="text-xs text-gray-500 ml-auto">{i}h ago</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="p-4">
            <h3 className="font-medium text-green-800 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Management
            </h3>

            <div className="relative mb-4">
              <Input placeholder="Search users..." />
            </div>

            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center p-3 border rounded-md">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3">
                    <Image
                      src={`/placeholder.svg?height=32&width=32`}
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">User {1000 + i}</p>
                    <p className="text-xs text-gray-600">user{i}@example.com</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="database" className="p-4">
            <h3 className="font-medium text-green-800 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Disease Database
            </h3>

            <div className="flex justify-between mb-4">
              <Input placeholder="Search database..." className="w-3/4" />
              <Button className="bg-green-600 hover:bg-green-700">Add New</Button>
            </div>

            <div className="space-y-2">
              {["Early Blight", "Powdery Mildew", "Bacterial Leaf Spot", "Rust", "Downy Mildew"].map((disease, i) => (
                <div key={i} className="flex items-center p-3 border rounded-md">
                  <div className="w-10 h-10 bg-gray-200 rounded-md mr-3 overflow-hidden">
                    <Image src={`/placeholder.svg?height=40&width=40`} alt={disease} width={40} height={40} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{disease}</p>
                    <p className="text-xs text-gray-600">ID: DB-{100 + i}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-4">
            <h3 className="font-medium text-green-800 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              System Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">AI Model API Key</Label>
                <Input id="api-key" type="password" value="••••••••••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model-version">AI Model Version</Label>
                <Input id="model-version" value="v2.3.1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence-threshold">Detection Confidence Threshold</Label>
                <Input id="confidence-threshold" type="number" defaultValue={75} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="offline-mode">Offline Mode Settings</Label>
                <select id="offline-mode" className="w-full p-2 border rounded-md">
                  <option value="aggressive">Aggressive Caching</option>
                  <option value="balanced">Balanced (Default)</option>
                  <option value="minimal">Minimal Caching</option>
                </select>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="w-full max-w-md">
        <p className="text-sm text-gray-600 text-center">Admin Portal v1.0 - Logged in as Administrator</p>
      </div>
    </main>
  )
}

