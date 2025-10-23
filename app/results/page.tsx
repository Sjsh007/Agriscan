"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, RefreshCw, AlertTriangle, Leaf, Droplet, Sun, TrendingUp, Clock, Info, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AgriBot from "@/components/agri-bot"
import ReportGeneratorComponent from "@/components/report-generator"
import type { ScanResult } from "@/lib/report-generator"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { useAchievements } from "@/contexts/AchievementContext"

// Mock disease data (in a real app, this would come from AI model)
const mockDiseaseData = {
  name: "Early Blight",
  confidence: 91,
  severity: "Moderate",
  crop: "Tomato",
  scientificName: "Alternaria solani",
  treatments: {
    organic: [
      "Remove and destroy infected leaves",
      "Apply neem oil spray every 7-10 days",
      "Use copper-based fungicide for organic gardens",
    ],
    chemical: [
      "Apply chlorothalonil-based fungicide",
      "Alternate with mancozeb for resistance management",
      "Treat every 7-14 days depending on severity",
    ],
  },
  prevention: [
    "Rotate crops every 2-3 years",
    "Ensure proper plant spacing for air circulation",
    "Water at the base of plants, avoid wetting leaves",
    "Remove plant debris at the end of the season",
  ],
  timeline: [
    { day: 1, action: "Remove infected leaves", status: "immediate" },
    { day: 3, action: "Apply first neem oil treatment", status: "immediate" },
    { day: 7, action: "Monitor plant progress", status: "pending" },
    { day: 10, action: "Second neem oil application", status: "pending" },
    { day: 14, action: "Assess recovery status", status: "pending" },
  ],
  similarDiseases: [
    { name: "Late Blight", confidence: 78, similarity: 85 },
    { name: "Septoria Leaf Spot", confidence: 65, similarity: 72 },
    { name: "Bacterial Spot", confidence: 58, similarity: 68 },
  ],
  affectedArea: 35, // percentage of plant affected
  spreadRisk: "Medium",
}

export default function ResultsPage() {
  const router = useRouter()
  const { addScan, checkAchievements } = useAchievements()
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [diseaseData, setDiseaseData] = useState(mockDiseaseData)

  useEffect(() => {
    // Get the image from localStorage
    const savedImage = localStorage.getItem("lastScannedImage")
    if (savedImage) {
      setImage(savedImage)
    }

    // Track achievement for scan
    addScan("early-blight", true)
    checkAchievements()

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "text-yellow-600 bg-yellow-100"
      case "moderate":
        return "text-orange-600 bg-orange-100"
      case "severe":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AgriScan: ${diseaseData.name} detected on ${diseaseData.crop}`,
          text: `I detected ${diseaseData.name} (${diseaseData.confidence}% confidence) on my ${diseaseData.crop} using AgriScan.`,
          url: window.location.href,
        })
        toast({ title: "📤 Shared successfully", description: "Results shared with your contacts." })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      toast({ title: "ℹ️ Share unavailable", description: "Try copying the URL manually." })
    }
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate a PDF with the results
    toast({ title: "📄 Generating PDF", description: "Your detailed report is being prepared..." })
    setTimeout(() => {
      toast({ title: "✅ PDF Ready", description: "Report downloaded successfully!" })
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-green-700">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-green-700">Analysis Results</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {loading ? (
        <Card className="w-full max-w-md p-8 shadow-lg border-green-100 mb-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading results...</p>
        </Card>
      ) : (
        <>
          <Card className="w-full max-w-md overflow-hidden shadow-lg border-green-100 mb-6">
            <div className="relative aspect-video w-full">
              {image && <Image src={image || "/placeholder.svg"} alt="Analyzed crop" fill className="object-cover" />}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-1 mr-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                  <h2 className="text-white font-bold">{diseaseData.name}</h2>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Confidence</span>
                  <span className="text-sm font-medium">{diseaseData.confidence}%</span>
                </div>
                <Progress value={diseaseData.confidence} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Leaf className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-gray-600">Crop</span>
                  </div>
                  <p className="font-medium">{diseaseData.crop}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mr-1" />
                    <span className="text-xs text-gray-600">Severity</span>
                  </div>
                  <p
                    className={`font-medium ${getSeverityColor(diseaseData.severity)} inline-block px-2 py-1 rounded-full text-sm`}
                  >
                    {diseaseData.severity}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <Button variant="outline" size="sm" className="flex-1 mr-2" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </Button>

                <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share Results
                </Button>
              </div>
            </div>
          </Card>

          <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-green-800">Treatment Options</h2>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-green-700 mb-2 flex items-center">
                <Leaf className="h-4 w-4 mr-1" />
                Organic Solutions
              </h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                {diseaseData.treatments.organic.map((treatment, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {treatment}
                  </li>
                ))}
              </ul>

              <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                <Droplet className="h-4 w-4 mr-1" />
                Chemical Options
              </h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                {diseaseData.treatments.chemical.map((treatment, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {treatment}
                  </li>
                ))}
              </ul>

              <h3 className="font-medium text-orange-700 mb-2 flex items-center">
                <Sun className="h-4 w-4 mr-1" />
                Prevention Tips
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {diseaseData.prevention.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Analysis Breakdown Chart */}
          <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
            <div className="p-4 border-b flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-bold text-green-800">Detection Analysis</h2>
            </div>

            <div className="p-4 space-y-4">
              {/* Confidence Breakdown */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">AI Confidence</span>
                  <span className="font-bold text-green-700">{diseaseData.confidence}%</span>
                </div>
                <Progress value={diseaseData.confidence} className="h-3 mb-1" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Affected Area</span>
                  <span className="font-bold text-orange-600">{diseaseData.affectedArea}%</span>
                </div>
                <Progress value={diseaseData.affectedArea} className="h-3 mb-1 [&>div]:bg-orange-500" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Spread Risk</span>
                  <span className={`font-bold ${diseaseData.spreadRisk === 'High' ? 'text-red-600' : diseaseData.spreadRisk === 'Medium' ? 'text-orange-600' : 'text-yellow-600'}`}>
                    {diseaseData.spreadRisk}
                  </span>
                </div>
                <Progress 
                  value={diseaseData.spreadRisk === 'High' ? 80 : diseaseData.spreadRisk === 'Medium' ? 50 : 25} 
                  className="h-3 mb-1 [&>div]:bg-red-500" 
                />
              </div>

              {/* Similar Diseases Comparison */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  Similar Diseases Detected
                </h3>
                <div className="space-y-2">
                  {diseaseData.similarDiseases.map((disease, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">{disease.name}</span>
                        <span className="text-xs text-gray-600">{disease.confidence}% match</span>
                      </div>
                      <Progress value={disease.similarity} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Treatment Timeline */}
          <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
            <div className="p-4 border-b flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-700" />
              <h2 className="text-lg font-bold text-green-800">Treatment Timeline</h2>
            </div>

            <div className="p-4">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Timeline Items */}
                <div className="space-y-4">
                  {diseaseData.timeline.map((item, index) => (
                    <div key={index} className="relative flex items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      {/* Timeline Dot */}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        item.status === 'immediate' ? 'bg-green-500' : 'bg-gray-300'
                      } border-4 border-white shadow-md`}>
                        {item.status === 'immediate' ? (
                          <TrendingUp className="w-3 h-3 text-white" />
                        ) : (
                          <Clock className="w-3 h-3 text-gray-600" />
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="ml-4 flex-1 bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-green-700">Day {item.day}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.status === 'immediate' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {item.status === 'immediate' ? 'Start Now' : 'Upcoming'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{item.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800">
                  💡 <strong>Tip:</strong> Follow this timeline consistently for best recovery results. Set reminders for each action.
                </p>
              </div>
            </div>
          </Card>

          <div className="w-full max-w-md flex justify-center mb-6">
            <Button onClick={() => router.push("/scan")} className="bg-green-600 hover:bg-green-700 mr-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Scan Another
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/database")}
              className="border-green-600 text-green-700"
            >
              Browse Disease Database
            </Button>
          </div>

          {/* Report Generator Component */}
          <div className="w-full max-w-md mb-6">
            <ReportGeneratorComponent
              scanResult={{
                id: `scan-${Date.now()}`,
                disease: diseaseData.name,
                confidence: diseaseData.confidence / 100,
                crop: diseaseData.crop,
                scanDate: new Date(),
                severity: diseaseData.severity.toLowerCase() as "low" | "medium" | "high" | "critical",
                symptoms: [
                  "Dark brown to black spots with concentric rings on leaves",
                  "Yellowing of leaves around the spots",
                  "Premature leaf drop starting from lower leaves",
                  "Stem lesions may also develop in severe cases"
                ],
                treatments: [
                  {
                    name: "Neem Oil Spray",
                    dosage: "2 tablespoons per gallon of water",
                    frequency: "Every 7-10 days",
                    duration: "Until symptoms subside"
                  },
                  {
                    name: "Copper-based Fungicide",
                    dosage: "As per manufacturer instructions",
                    frequency: "Weekly applications",
                    duration: "3-4 weeks"
                  },
                  {
                    name: "Chlorothalonil",
                    dosage: "Follow label instructions",
                    frequency: "Every 7-14 days",
                    duration: "Throughout growing season"
                  }
                ],
                preventiveMeasures: diseaseData.prevention,
                imageUrl: image || undefined
              }}
            />
          </div>
        </>
      )}

      <AgriBot />
    </main>
  )
}

