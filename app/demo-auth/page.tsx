"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Lock, Shield } from "lucide-react"

export default function DemoAuthPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Set your demo access password here
  const DEMO_PASSWORD = "agriscan2025"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate checking
    setTimeout(() => {
      if (password === DEMO_PASSWORD) {
        // Set access cookie
        document.cookie = "demo-access=granted; path=/; max-age=86400" // 24 hours
        router.push("/login")
      } else {
        setError("Invalid access code. Please try again.")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-black p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            AgriScan Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter access code to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter access code"
                className="pl-10"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Access Demo"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This is a private demo. Contact the administrator for access.
          </p>
        </div>
      </Card>
    </div>
  )
}
