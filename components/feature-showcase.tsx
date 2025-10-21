"use client"

import { useEffect, useRef, useState } from "react"
import { Scan, Brain, Database, MapPin, Award, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  gradient: string
}

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const features: Feature[] = [
    {
      icon: <Scan className="w-12 h-12" />,
      title: "AI Disease Detection",
      description: "Advanced machine learning algorithms detect crop diseases with 98.5% accuracy in real-time",
      color: "from-green-500 to-emerald-600",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-600/20"
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Multi-Disease Analysis",
      description: "Detect multiple diseases in a single scan with comprehensive treatment recommendations",
      color: "from-purple-500 to-pink-600",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-600/20"
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Disease Heatmap",
      description: "Track disease outbreaks across regions with interactive real-time visualization",
      color: "from-red-500 to-orange-600",
      gradient: "bg-gradient-to-br from-red-500/20 to-orange-600/20"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Predictive Analytics",
      description: "ML-powered forecasting predicts crop health and disease risks 14 days ahead",
      color: "from-cyan-500 to-blue-600",
      gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "Advanced Offline Mode",
      description: "Store 10,000+ scans locally with intelligent background sync when connected",
      color: "from-indigo-500 to-violet-600",
      gradient: "bg-gradient-to-br from-indigo-500/20 to-violet-600/20"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Achievement System",
      description: "Gamified experience with badges, levels, and rewards to encourage engagement",
      color: "from-yellow-500 to-amber-600",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-amber-600/20"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setActiveFeature(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    const elements = containerRef.current?.querySelectorAll("[data-index]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-slate-900 to-gray-900 dark:from-black dark:via-slate-900 dark:to-gray-900 light:from-white light:via-green-50 light:to-emerald-50 py-20">
      {/* Section Header */}
      <div className="text-center mb-20 px-4">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6 animate-fade-in">
          Revolutionary Features
        </h2>
        <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-700 max-w-3xl mx-auto animate-fade-in-up">
          Cutting-edge technology powered by artificial intelligence to revolutionize agriculture
        </p>
      </div>

      {/* Features Grid */}
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 space-y-32">
        {features.map((feature, index) => (
          <div
            key={index}
            data-index={index}
            className="relative"
          >
            {/* Feature Card */}
            <Card className={`relative overflow-hidden border-none backdrop-blur-xl transition-all duration-1000 ${
              activeFeature === index
                ? "scale-100 opacity-100"
                : "scale-95 opacity-50"
            } ${feature.gradient}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${Math.random() * 10 + 10}s`
                    }}
                  />
                ))}
              </div>

              <div className="relative p-12 grid md:grid-cols-2 gap-12 items-center">
                {/* Icon Side */}
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-3xl opacity-50 animate-pulse-slow`} />
                    
                    {/* Icon container */}
                    <div className={`relative w-40 h-40 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-110 hover:rotate-6`}>
                      <div className="text-white animate-float-slow">
                        {feature.icon}
                      </div>
                      
                      {/* Corner accents */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-white/50 rounded-tl-xl" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-white/50 rounded-tr-xl" />
                      <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-white/50 rounded-bl-xl" />
                      <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-white/50 rounded-br-xl" />
                    </div>

                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className={`absolute -top-4 left-1/2 w-3 h-3 bg-gradient-to-br ${feature.color} rounded-full shadow-lg`} />
                    </div>
                    <div className="absolute inset-0 animate-spin-reverse">
                      <div className={`absolute -bottom-4 left-1/2 w-3 h-3 bg-gradient-to-br ${feature.color} rounded-full shadow-lg`} />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-sm font-semibold">
                    Feature {index + 1}
                  </div>
                  
                  <h3 className={`text-4xl font-black bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature stats */}
                  <div className="flex gap-6 pt-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {index === 0 ? "98.5%" : index === 1 ? "5+" : index === 2 ? "Real-time" : index === 3 ? "14 Days" : index === 4 ? "10K+" : "11+"}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {index === 0 ? "Accuracy" : index === 1 ? "Diseases" : index === 2 ? "Updates" : index === 3 ? "Forecast" : index === 4 ? "Scans" : "Badges"}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {index === 0 ? "< 1s" : index === 1 ? "100%" : index === 2 ? "5" : index === 3 ? "94%" : index === 4 ? "Auto" : "5"}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {index === 0 ? "Speed" : index === 1 ? "Coverage" : index === 2 ? "States" : index === 3 ? "Confidence" : index === 4 ? "Sync" : "Levels"}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {index === 0 ? "24/7" : index === 1 ? "Smart" : index === 2 ? "Live" : index === 3 ? "ML" : index === 4 ? "Offline" : "XP"}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {index === 0 ? "Available" : index === 1 ? "AI" : index === 2 ? "Tracking" : index === 3 ? "Powered" : index === 4 ? "First" : "Points"}
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  <button 
                    onClick={() => {
                      if (index === 0) router.push("/scan")
                      else if (index === 1) router.push("/multi-disease-demo")
                      else if (index === 2) router.push("/heatmap")
                      else if (index === 3) router.push("/analytics")
                      else if (index === 4) router.push("/home")
                      else if (index === 5) router.push("/achievements")
                    }}
                    className={`group relative px-8 py-4 bg-gradient-to-r ${feature.color} text-white font-bold rounded-xl overflow-hidden transition-transform hover:scale-105 shadow-xl cursor-pointer`}
                  >
                    <span className="relative z-10">Explore Feature</span>
                    <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Connection line to next feature */}
            {index < features.length - 1 && (
              <div className="absolute left-1/2 -bottom-16 w-0.5 h-16 bg-gradient-to-b from-white/30 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-32 px-4">
        <h3 className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
          Ready to Transform Your Agriculture?
        </h3>
        <button 
          onClick={() => router.push("/home")}
          className="px-12 py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-105 relative overflow-hidden group"
        >
          <span className="relative z-10">Get Started Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  )
}
