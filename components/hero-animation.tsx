"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Scan, Brain, Zap, Shield, TrendingUp } from "lucide-react"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `hsla(${Math.random() * 60 + 140}, 70%, 60%, ${Math.random() * 0.5 + 0.3})`
        this.life = 0
        this.maxLife = Math.random() * 200 + 100
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Reset if life exceeded
        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = 1 - this.life / this.maxLife
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${opacity * 0.6})`)
        ctx.fill()
      }
    }

    // Connection lines
    class ConnectionLine {
      x1: number
      y1: number
      x2: number
      y2: number
      opacity: number
      speed: number

      constructor() {
        this.x1 = Math.random() * canvas.width
        this.y1 = Math.random() * canvas.height
        this.x2 = Math.random() * canvas.width
        this.y2 = Math.random() * canvas.height
        this.opacity = 0
        this.speed = Math.random() * 0.02 + 0.01
      }

      update() {
        this.opacity += this.speed
        if (this.opacity > 0.5 || this.opacity < 0) {
          this.speed *= -1
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createLinearGradient(this.x1, this.y1, this.x2, this.y2)
        gradient.addColorStop(0, `rgba(34, 197, 94, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(16, 185, 129, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(20, 184, 166, ${this.opacity})`)

        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // Energy waves
    class EnergyWave {
      x: number
      y: number
      radius: number
      maxRadius: number
      speed: number
      color: string

      constructor() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.radius = 0
        this.maxRadius = Math.max(canvas.width, canvas.height) * 0.7
        this.speed = 2
        this.color = `hsla(${Math.random() * 60 + 140}, 70%, 60%, 0.1)`
      }

      update() {
        this.radius += this.speed
        if (this.radius > this.maxRadius) {
          this.radius = 0
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    // Initialize particles and effects
    const particles: Particle[] = []
    const connectionLines: ConnectionLine[] = []
    const energyWaves: EnergyWave[] = []

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle())
    }

    for (let i = 0; i < 5; i++) {
      connectionLines.push(new ConnectionLine())
    }

    for (let i = 0; i < 3; i++) {
      energyWaves.push(new EnergyWave())
    }

    let animationFrameId: number

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw energy waves
      energyWaves.forEach((wave) => {
        wave.update()
        wave.draw(ctx)
      })

      // Update and draw connection lines
      connectionLines.forEach((line) => {
        line.update()
        line.draw(ctx)
      })

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black dark:from-gray-900 dark:via-slate-900 dark:to-black light:from-green-50 light:via-emerald-50 light:to-teal-50">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full dark:opacity-100 light:opacity-30"
        style={{ mixBlendMode: "screen" }}
      />

      {/* 3D Logo Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`relative transition-all duration-2000 ${
            isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          {/* Main Logo */}
          <div className="relative w-40 h-40 animate-float-slow">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 blur-3xl opacity-50 animate-pulse-slow" />
            
            {/* Middle ring */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 blur-xl opacity-70 animate-spin-slow" />
            
            {/* Logo container */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl animate-3d-rotate">
              <Leaf className="w-16 h-16 text-white animate-pulse-slow" />
              
              {/* Orbiting particles */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-300 rounded-full animate-orbit" />
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-300 rounded-full animate-orbit-reverse" style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-teal-300 rounded-full animate-orbit" style={{ animationDelay: "1s" }} />
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-green-400 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-teal-400 animate-pulse" style={{ animationDelay: "0.6s" }} />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-green-400 animate-pulse" style={{ animationDelay: "0.9s" }} />
          </div>

          {/* Title */}
          <div className="mt-16 text-center">
            <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4 animate-glow-text dark:from-green-400 dark:via-emerald-400 dark:to-teal-400">
              AgriScan
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              AI-Powered Crop Intelligence Platform
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 dark:text-green-300 text-sm animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: "0.7s" }}>
                Real-Time Analysis
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 dark:text-emerald-300 text-sm animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: "0.9s" }}>
                98.5% Accuracy
              </div>
              <div className="px-4 py-2 bg-teal-500/20 border border-teal-500/50 rounded-full text-teal-300 dark:text-teal-300 text-sm animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: "1.1s" }}>
                Offline Mode
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-scroll-indicator" />
        </div>
      </div>
    </div>
  )
}
