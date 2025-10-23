"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Lock, Mail, Phone, Leaf, Eye, EyeOff, AlertCircle, CheckCircle2, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [signupError, setSignupError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Signup form state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  // Password strength calculator
  useEffect(() => {
    if (signupPassword) {
      let strength = 0
      if (signupPassword.length >= 8) strength++
      if (signupPassword.length >= 12) strength++
      if (/[a-z]/.test(signupPassword) && /[A-Z]/.test(signupPassword)) strength++
      if (/\d/.test(signupPassword)) strength++
      if (/[^a-zA-Z0-9]/.test(signupPassword)) strength++
      setPasswordStrength(strength)
    } else {
      setPasswordStrength(0)
    }
  }, [signupPassword])

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Password validation
  const isValidPassword = (password: string) => {
    return password.length >= 8
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    // Validation
    if (!isValidEmail(loginEmail)) {
      setLoginError("Please enter a valid email address")
      return
    }

    if (!isValidPassword(loginPassword)) {
      setLoginError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    // Simulate login process with validation
    setTimeout(() => {
      // Check if user exists in localStorage (simulated database)
      const storedUsers = localStorage.getItem("registeredUsers")
      
      if (!storedUsers) {
        // No users registered yet
        setLoginError("No account found with this email. Please sign up first.")
        setIsLoading(false)
        return
      }

      const users = JSON.parse(storedUsers)
      
      // Find user by email first
      const user = users.find((u: any) => u.email === loginEmail)

      if (!user) {
        // Email doesn't exist
        setLoginError("No account found with this email. Please sign up first.")
        setIsLoading(false)
        return
      }

      // Email exists, now check password
      if (user.password !== loginPassword) {
        setLoginError("Incorrect password. Please try again.")
        setIsLoading(false)
        return
      }

      // Successful login
      login({ email: user.email, name: user.name, phone: user.phone })
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")

    // Validation
    if (!signupName || signupName.length < 2) {
      setSignupError("Please enter your full name (at least 2 characters)")
      return
    }

    if (!isValidEmail(signupEmail)) {
      setSignupError("Please enter a valid email address")
      return
    }

    if (!isValidPassword(signupPassword)) {
      setSignupError("Password must be at least 8 characters")
      return
    }

    if (signupPassword !== confirmPassword) {
      setSignupError("Passwords do not match")
      return
    }

    if (passwordStrength < 3) {
      setSignupError("Please use a stronger password (mix of uppercase, lowercase, numbers, and symbols)")
      return
    }

    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      // Check if user already exists
      const storedUsers = localStorage.getItem("registeredUsers")
      const users = storedUsers ? JSON.parse(storedUsers) : []
      
      const existingUser = users.find((u: any) => u.email === signupEmail)
      
      if (existingUser) {
        setSignupError("An account with this email already exists. Please login instead.")
        setIsLoading(false)
        return
      }

      // Store new user (in a real app, this would hash the password)
      const newUser = {
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
        password: signupPassword, // In production, this should be hashed
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(users))

      // Login the user
      login({
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
      })
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 dark:bg-green-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyYzU1ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
      </div>

      <div className="w-full max-w-md flex justify-center items-center mb-8 relative z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2 animate-fade-in-up">AgriScan</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Crop Disease Detection</p>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center mb-8 relative z-10">
        <div className="relative group mb-6">
          {/* Outer glow rings */}
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          {/* Main logo container */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 border-4 border-white/20 dark:border-white/10">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 animate-spin-slow"></div>
            
            {/* Orbiting particles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-24 h-24">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/60 rounded-full animate-orbit"></div>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/40 rounded-full animate-orbit-reverse"></div>
              </div>
            </div>
            
            {/* Central icon */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-16 h-16 text-white drop-shadow-2xl animate-float-slow" />
              </div>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-3 animate-fade-in-up">
          Welcome Back
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center text-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          Access your crop health dashboard
        </p>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-green-100 dark:border-green-900/50 dark:bg-slate-900/80 backdrop-blur-xl mb-6 relative z-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        {/* Card glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-lg blur opacity-20 dark:opacity-10"></div>
        
        <div className="relative">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 dark:bg-slate-800/50 backdrop-blur-sm">
              <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                Sign Up
              </TabsTrigger>
            </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {loginError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-shake">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value)
                      setLoginError("")
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button 
                    type="button"
                    variant="link" 
                    className="p-0 h-auto text-xs text-green-600 hover:text-green-700"
                  >
                    Forgot Password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value)
                      setLoginError("")
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Must be at least 8 characters
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Sign In</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Button 
                    type="button"
                    variant="link" 
                    className="p-0 h-auto text-green-600 hover:text-green-700 font-semibold"
                    onClick={() => {
                      // Switch to signup tab
                      const signupTab = document.querySelector('[value="signup"]') as HTMLElement
                      if (signupTab) signupTab.click()
                    }}
                  >
                    Sign up here
                  </Button>
                </p>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="p-6 space-y-4">
              {signupError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-shake">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{signupError}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Your Name"
                    className="pl-10"
                    value={signupName}
                    onChange={(e) => {
                      setSignupName(e.target.value)
                      setSignupError("")
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value)
                      setSignupError("")
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="pl-10"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10"
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value)
                      setSignupError("")
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {signupPassword && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            level <= passwordStrength
                              ? passwordStrength <= 2
                                ? "bg-red-500"
                                : passwordStrength <= 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${
                      passwordStrength <= 2
                        ? "text-red-600 dark:text-red-400"
                        : passwordStrength <= 3
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}>
                      {passwordStrength <= 2 && "Weak password"}
                      {passwordStrength === 3 && "Medium password"}
                      {passwordStrength >= 4 && "Strong password"}
                    </p>
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Use 8+ characters with mix of letters, numbers & symbols
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setSignupError("")
                    }}
                    required
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-3">
                      {confirmPassword === signupPassword ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Create Account</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </Button>

              <div className="text-center pt-2 border-t dark:border-gray-700 mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Button type="button" variant="link" className="p-0 h-auto text-xs text-green-600 hover:text-green-700">
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button type="button" variant="link" className="p-0 h-auto text-xs text-green-600 hover:text-green-700">
                    Privacy Policy
                  </Button>
                </p>
              </div>

              <div className="text-center pt-2 border-t dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Button 
                    type="button"
                    variant="link" 
                    className="p-0 h-auto text-green-600 hover:text-green-700 font-semibold"
                    onClick={() => {
                      // Switch to login tab
                      const loginTab = document.querySelector('[value="login"]') as HTMLElement
                      if (loginTab) loginTab.click()
                    }}
                  >
                    Login here
                  </Button>
                </p>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        </div>
      </Card>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-green-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-emerald-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-teal-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Verified</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Advanced crop disease detection with real-time analytics
        </p>
      </div>
    </main>
  )
}

