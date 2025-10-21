"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Camera, RefreshCw, Zap, Target, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AgriBot from "@/components/agri-bot"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function ScanPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasCamera, setHasCamera] = useState(true)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const [aiHint, setAiHint] = useState<string>("")
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    // Check if camera is available
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setHasCamera(true)
      })
      .catch(() => {
        setHasCamera(false)
      })

    return () => {
      // Stop camera when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        
        // Simulate AI hints while camera is active
        const hints = [
          "Position leaf in center frame",
          "Ensure good lighting",
          "Hold camera steady",
          "Move closer to the affected area",
          "Focus on visible symptoms"
        ]
        let hintIndex = 0
        const hintInterval = setInterval(() => {
          setAiHint(hints[hintIndex % hints.length])
          hintIndex++
        }, 3000)
        
        // Clean up interval on unmount or capture
        return () => clearInterval(hintInterval)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setHasCamera(false)
      toast({ 
        title: "📷 Camera access failed", 
        description: "Please allow camera permissions or use Upload instead."
      })
    }
  }

  const switchCamera = () => {
    // Stop current stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }

    // Toggle facing mode
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))

    // Restart camera with new facing mode
    setTimeout(startCamera, 300)
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedImage(imageDataUrl)
  toast({ title: "Photo captured", description: "Ready to analyze your crop." })

        // Stop camera stream
        const tracks = (video.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
        setCameraActive(false)

        // Simulate analysis
        analyzeImage(imageDataUrl)
      }
    }
  }

  const analyzeImage = (imageUrl: string) => {
    setAnalyzing(true)
    setConfidence(0)
    toast({ title: "🔬 Analyzing image...", description: "AI detection in progress..." })

    // Simulate confidence building
    const confidenceInterval = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 98) {
          clearInterval(confidenceInterval)
          return 98
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // In a real app, this would send the image to a TensorFlow.js model
    // or an API for analysis. Here we'll simulate a delay and redirect.
    setTimeout(() => {
      // Store the image in localStorage (in a real app, you might use IndexedDB)
      localStorage.setItem("lastScannedImage", imageUrl)

      // Redirect to results page
      toast({ title: "✅ Analysis complete", description: "Opening your results." })
      router.push("/results")
    }, 3000)
  }

  const resetCamera = () => {
    setCapturedImage(null)
    setAnalyzing(false)
    startCamera()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-green-700">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-green-700">Scan My Crop</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      <Card className="w-full max-w-md overflow-hidden shadow-lg border-green-100 mb-6">
        <div className="relative bg-black aspect-[3/4] w-full">
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* AI Hints Overlay */}
              {cameraActive && aiHint && (
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2 animate-fade-in">
                    <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
                    <span className="text-white text-sm font-medium">{aiHint}</span>
                  </div>
                </div>
              )}

              {/* Camera Target Guide */}
              {cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-2 border-green-400 border-dashed rounded-lg animate-pulse"></div>
                </div>
              )}

              {!cameraActive && hasCamera && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Camera className="h-10 w-10 text-white" />
                    </div>
                    <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700" size="lg">
                      <Camera className="mr-2 h-5 w-5" />
                      Start Camera
                    </Button>
                    <p className="text-white text-sm mt-4">Please allow camera access to scan your crop</p>
                  </div>
                </div>
              )}

              {!hasCamera && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center p-4">
                    <p className="text-white mb-4">
                      Camera access is not available. Please try uploading an image instead.
                    </p>
                    <Button onClick={() => router.push("/upload")} className="bg-green-600 hover:bg-green-700">
                      Go to Upload
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full">
              <Image src={capturedImage || "/placeholder.svg"} alt="Captured crop" fill className="object-cover" />

              {analyzing && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center backdrop-blur-sm">
                  <div className="relative w-20 h-20 mb-4">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="AgriBot thinking"
                      width={80}
                      height={80}
                      className="agribot-avatar"
                    />
                  </div>
                  <p className="text-white text-lg mb-4">Analyzing your crop...</p>
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                  
                  {/* Confidence Meter */}
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-white text-sm">
                      <span className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        AI Confidence
                      </span>
                      <span className="font-bold">{confidence}%</span>
                    </div>
                    <Progress value={confidence} className="h-2" />
                    <p className="text-green-400 text-xs text-center">
                      {confidence < 30 && "Initializing AI model..."}
                      {confidence >= 30 && confidence < 60 && "Detecting plant features..."}
                      {confidence >= 60 && confidence < 90 && "Analyzing disease patterns..."}
                      {confidence >= 90 && "Finalizing results..."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {cameraActive && !capturedImage && (
            <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-4">
              <Button
                onClick={switchCamera}
                variant="outline"
                size="icon"
                className="bg-white bg-opacity-70 hover:bg-white"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
              <Button
                onClick={captureImage}
                size="lg"
                className="rounded-full w-16 h-16 bg-white bg-opacity-70 hover:bg-white border-4 border-green-500"
              >
                <span className="sr-only">Capture</span>
              </Button>
              <div className="w-10"></div> {/* Spacer for alignment */}
            </div>
          )}
        </div>

        {capturedImage && !analyzing && (
          <div className="p-4 flex justify-between">
            <Button variant="outline" onClick={resetCamera}>
              Retake Photo
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => analyzeImage(capturedImage)}>
              Analyze Crop
            </Button>
          </div>
        )}
      </Card>

      <div className="w-full max-w-md">
        <p className="text-sm text-gray-600 text-center">
          Position your camera close to the affected plant part for best results. Make sure the area is well-lit.
        </p>
      </div>

      <AgriBot />
    </main>
  )
}

