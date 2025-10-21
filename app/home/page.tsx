"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { 
  Camera, Upload, Globe, User, Leaf, Smartphone, Database, Languages, Shield,
  Zap, TrendingUp, Award, CheckCircle, Brain, Clock, Users, Star,
  Wifi, Settings, Download, Share2, BarChart3, Activity, Sparkles, MapPin, LogOut
} from "lucide-react"
import LanguageSelector from "@/components/language-selector"
import NetworkStatus from "@/components/network-status"
import AgriBot from "@/components/agri-bot"
import { OfflineManager } from "@/components/offline-manager"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAchievementNotifications } from "@/components/achievement-notification"
import { useAchievements } from "@/contexts/AchievementContext"
import AnimatedBackground from "@/components/animated-background"
import FloatingShapes from "@/components/floating-shapes"
import { useAuth } from "@/contexts/AuthContext"

export default function Home() {
  const router = useRouter()
  const { t } = useLanguage()
  const { currentLevel, totalPoints, userStats } = useAchievements()
  const { logout, user } = useAuth()
  useAchievementNotifications() // Enable achievement notifications
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [scanCount, setScanCount] = useState(0)
  const [accuracyRate, setAccuracyRate] = useState(95)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in from localStorage
    const userLocal = localStorage.getItem("user")
    if (userLocal) {
      setIsLoggedIn(true)
    }

    // Animate counters on mount
    const scanTimer = setInterval(() => {
      setScanCount(prev => {
        if (prev < 1247) return prev + 23
        clearInterval(scanTimer)
        return 1247
      })
    }, 50)

    const accuracyTimer = setInterval(() => {
      setAccuracyRate(prev => {
        if (prev < 98.5) return prev + 0.5
        clearInterval(accuracyTimer)
        return 98.5
      })
    }, 100)

    // Show welcome notification
    setTimeout(() => {
      toast({
        title: t("home.welcome"),
        description: t("app.tagline"),
      })
    }, 1000)

    return () => {
      clearInterval(scanTimer)
      clearInterval(accuracyTimer)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 relative overflow-hidden particles-bg">
      {/* Animated Canvas Background */}
      <AnimatedBackground />
      
      {/* Floating Shapes */}
      <FloatingShapes />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 dark:bg-green-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 dark:bg-emerald-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 dark:bg-teal-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="w-full max-w-6xl mb-6 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 rounded-2xl flex items-center justify-center shadow-2xl dark:shadow-green-500/30 group-hover:scale-110 transition-all duration-300 relative glow dark:glow-green holographic animate-pulse-slow">
              <Leaf className="h-8 w-8 text-white animate-pulse-slow float-icon" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 dark:bg-green-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent gradient-text-green neon-text">
                AgriScan
              </h1>
              <p className="text-xs text-green-600 dark:text-green-400 hidden sm:flex items-center gap-1 font-semibold">
                <Zap className="h-3 w-3 animate-pulse" />
                AI-Powered Crop Intelligence Platform
                <Sparkles className="h-3 w-3 animate-pulse ml-1" />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative group hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 hover:scale-110"
              onClick={() => router.push("/achievements")}
              title="Achievements"
            >
              <Award className="h-5 w-5 text-yellow-500 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 breathe" />
              {currentLevel > 1 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-yellow-500/50 animate-pulse holographic">
                  {currentLevel}
                </span>
              )}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
            <div className="hover:scale-110 transition-transform duration-300">
              <ThemeToggle />
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <NetworkStatus />
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <LanguageSelector />
            </div>
            <Button
              onClick={() => {
                logout()
                router.push("/login")
                toast({
                  title: "Logged Out",
                  description: "You have been successfully logged out.",
                })
              }}
              variant="ghost"
              size="icon"
              className="relative group hover:scale-110 transition-transform duration-300"
            >
              <LogOut className="h-5 w-5" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>

      {/* Live Stats Banner */}
      {mounted && (
        <div className="w-full max-w-6xl mb-6 relative z-10 mx-auto space-y-4">
          {/* Main Stats */}
          <Card className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-500 dark:via-emerald-500 dark:to-teal-500 border-none shadow-2xl dark:shadow-green-500/30 overflow-hidden animate-slide-up glow dark:glow-green holographic group cursor-pointer">
            <div className="absolute inset-0 bg-white dark:bg-black opacity-10 group-hover:opacity-5 transition-opacity"></div>
            {/* Animated Scan Line */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute h-full w-1 bg-white/30 animate-scan-line"></div>
            </div>
            <div className="relative p-4 grid grid-cols-1 md:grid-cols-2 items-stretch gap-4 text-white">
              <div className="text-center transform hover:scale-110 transition-transform cursor-pointer animate-fade-in magnetic">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Camera className="h-5 w-5 animate-pulse" />
                  <div className="text-2xl font-bold neon-text">{scanCount.toLocaleString()}</div>
                </div>
                <div className="text-xs opacity-90 flex items-center justify-center gap-1 font-semibold">
                  <TrendingUp className="h-3 w-3 animate-bounce-subtle" />
                  {t("home.scans")}
                </div>
              </div>
              <div className="text-center border-l border-white/20 transform hover:scale-110 transition-transform cursor-pointer animate-fade-in magnetic" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="h-5 w-5 animate-bounce-subtle" />
                  <div className="text-2xl font-bold neon-text">{accuracyRate.toFixed(1)}%</div>
                </div>
                <div className="text-xs opacity-90 flex items-center justify-center gap-1 font-semibold">
                  <CheckCircle className="h-3 w-3 animate-pulse" />
                  {t("home.accuracy")}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-stretch gap-6 relative z-10 auto-rows-[minmax(0,1fr)] mx-auto">
        {/* Action Buttons Card with Enhanced UI */}
        <Card className="p-8 shadow-2xl border-green-100 dark:border-green-900/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg hover:shadow-3xl dark:hover:shadow-green-500/20 transition-all duration-300 h-full md:col-span-2 animate-slide-up card-glass dark:glow-border-animated relative group card-3d">
          {/* Animated Border Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-xl blur opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-lg p-8">
            <div className="flex flex-col gap-4 h-full justify-center">
              <div className="mb-2 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400 animate-bounce-subtle" />
                  {t("home.quickActions")}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t("home.quickActionsDesc")}</p>
              </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white h-16 text-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden group animate-slide-up glow dark:glow-green"
              onClick={() => {
                toast({
                  title: t("toast.cameraReady"),
                  description: t("toast.cameraDesc"),
                })
                router.push("/scan")
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity animate-shimmer"></div>
              <Camera className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform animate-bounce-subtle" />
              <span className="relative font-bold">{t("home.scan")}</span>
              <div className="ml-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs rounded-full font-semibold animate-pulse shadow-lg">
                {t("badge.live")}
              </div>
              <Sparkles className="absolute top-2 right-2 h-4 w-4 text-yellow-300 animate-pulse" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-600 dark:border-green-500 text-green-700 dark:text-green-400 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 h-16 text-lg shadow-lg hover:shadow-2xl dark:shadow-green-500/10 transition-all transform hover:scale-105 relative overflow-hidden group animate-slide-up neon-border"
              style={{ animationDelay: "0.1s" }}
              onClick={() => {
                toast({
                  title: t("toast.uploadReady"),
                  description: t("toast.uploadDesc"),
                })
                router.push("/upload")
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200 dark:via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
              <Upload className="mr-3 h-6 w-6 group-hover:-translate-y-1 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">{t("home.upload")}</span>
              <div className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full font-semibold shadow-md">
                {t("badge.batch")}
              </div>
            </Button>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button
                variant="outline"
                className="border-2 border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-400 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 h-14 shadow-md hover:shadow-xl dark:shadow-amber-500/10 transition-all transform hover:scale-105 group relative overflow-hidden"
                onClick={() => router.push("/database")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200 dark:from-amber-500/20 to-orange-200 dark:to-orange-500/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <Globe className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span className="hidden sm:inline font-semibold">{t("home.database")}</span>
                <span className="sm:hidden">DB</span>
              </Button>

              <Button
                variant="outline"
                className="border-2 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 h-14 shadow-md hover:shadow-xl dark:shadow-blue-500/10 transition-all transform hover:scale-105 group relative overflow-hidden"
                onClick={() => router.push(isLoggedIn ? "/account" : "/login")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 dark:from-blue-500/20 to-cyan-200 dark:to-cyan-500/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <User className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-semibold">{isLoggedIn ? "Account" : "Login"}</span>
                <span className="sm:hidden">{isLoggedIn ? "👤" : "Login"}</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <Button
                variant="outline"
                className="border-2 border-red-500 dark:border-red-400 text-red-700 dark:text-red-400 hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 dark:hover:from-red-900/20 dark:hover:to-orange-900/20 h-14 shadow-md hover:shadow-xl dark:shadow-red-500/10 transition-all transform hover:scale-105 group relative overflow-hidden"
                onClick={() => router.push("/heatmap")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 dark:from-red-500/20 to-orange-200 dark:to-orange-500/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <MapPin className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:animate-bounce transition-transform" />
                <span className="hidden sm:inline font-semibold">Disease Map</span>
                <span className="sm:hidden">Map</span>
              </Button>

              <Button
                variant="outline"
                className="border-2 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-400 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-amber-50 dark:hover:from-yellow-900/20 dark:hover:to-amber-900/20 h-14 shadow-md hover:shadow-xl dark:shadow-yellow-500/10 transition-all transform hover:scale-105 group relative overflow-hidden"
                onClick={() => router.push("/achievements")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 dark:from-yellow-500/20 to-amber-200 dark:to-amber-500/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <Award className="mr-2 h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-semibold">Achievements</span>
                <span className="sm:hidden">Awards</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <Button
                variant="outline"
                className="border-2 border-purple-500 dark:border-purple-400 text-purple-700 dark:text-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 h-14 shadow-md hover:shadow-xl dark:shadow-purple-500/10 transition-all transform hover:scale-105 group relative overflow-hidden glow-purple"
                onClick={() => router.push("/multi-disease-demo")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 dark:from-purple-500/20 to-pink-200 dark:to-pink-500/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <Brain className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-semibold">Multi-Disease AI</span>
                <span className="sm:hidden">Multi-AI</span>
                <div className="ml-2 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs rounded-full font-semibold shadow-md animate-pulse">
                  NEW
                </div>
                <Sparkles className="absolute top-1 right-1 h-3 w-3 text-purple-400 animate-pulse" />
              </Button>

              <Button
                variant="outline"
                className="border-2 border-cyan-500 dark:border-cyan-400 text-cyan-700 dark:text-cyan-400 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 h-14 shadow-md hover:shadow-xl dark:shadow-cyan-500/10 transition-all transform hover:scale-105 group relative overflow-hidden glow-blue"
                onClick={() => router.push("/analytics")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 dark:from-cyan-500/20 to-blue-200 dark:to-blue-500/20 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <TrendingUp className="mr-2 h-5 w-5 group-hover:scale-110 group-hover:translate-y-[-2px] transition-transform" />
                <span className="hidden sm:inline font-semibold">Analytics</span>
                <span className="sm:hidden">📊</span>
                <div className="ml-2 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs rounded-full font-semibold shadow-md">
                  AI
                </div>
                <BarChart3 className="absolute top-1 right-1 h-3 w-3 text-cyan-400 animate-pulse" />
              </Button>
            </div>
            </div>
          </div>
        </Card>
      </div>

      <OfflineManager />
      <AgriBot />
    </main>
  )
}
