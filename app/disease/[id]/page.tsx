"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, Leaf, AlertTriangle, Microscope, Droplet, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AgriBot from "@/components/agri-bot"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock disease database (in a real app, this would come from a database)
const diseasesDatabase = [
  {
    id: "1",
    name: "Early Blight",
    crop: "Tomato",
    scientificName: "Alternaria solani",
    severity: "Moderate",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Early blight is a common fungal disease that affects tomato plants. It typically appears as dark brown spots with concentric rings on lower leaves first, then progresses upward. The disease can cause significant defoliation and reduce fruit yield.",
    symptoms: [
      "Dark brown spots with concentric rings (target-like appearance)",
      "Yellow areas surrounding the spots",
      "Spots appear on lower/older leaves first",
      "Affected leaves may turn yellow and fall off",
      "Stem lesions may occur",
    ],
    treatments: {
      organic: [
        "Remove and destroy infected leaves",
        "Apply neem oil spray every 7-10 days",
        "Use copper-based fungicide for organic gardens",
        "Apply compost tea as a preventative measure",
      ],
      chemical: [
        "Apply chlorothalonil-based fungicide",
        "Alternate with mancozeb for resistance management",
        "Treat every 7-14 days depending on severity",
        "Consider systemic fungicides for severe infections",
      ],
    },
    prevention: [
      "Rotate crops every 2-3 years",
      "Ensure proper plant spacing for air circulation",
      "Water at the base of plants, avoid wetting leaves",
      "Remove plant debris at the end of the season",
      "Use disease-resistant varieties when available",
    ],
  },
]

export default function DiseasePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [disease, setDisease] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundDisease = diseasesDatabase.find((d) => d.id === params.id)

    if (foundDisease) {
      setDisease(foundDisease)
    } else {
      // Handle disease not found
      router.push("/database")
    }

    setLoading(false)
  }, [params.id, router])

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
          title: `AgriScan: ${disease.name} on ${disease.crop}`,
          text: `Learn about ${disease.name} (${disease.scientificName}) that affects ${disease.crop} plants.`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Sharing is not supported on this browser. Try copying the URL manually.")
    }
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate a PDF with the disease information
    alert("In a real app, this would download a PDF guide about this disease in your selected language.")
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-green-800">Loading disease information...</p>
      </main>
    )
  }

  if (!disease) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
        <p className="text-red-600">Disease not found</p>
        <Button onClick={() => router.push("/database")} className="mt-4 bg-green-600 hover:bg-green-700">
          Return to Database
        </Button>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/database")} className="text-green-700">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-green-700">Disease Information</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      <Card className="w-full max-w-md overflow-hidden shadow-lg border-green-100 mb-6">
        <div className="relative aspect-video w-full">
          <Image src={disease.image || "/placeholder.svg"} alt={disease.name} fill className="object-cover" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1 mr-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <h2 className="text-white font-bold">{disease.name}</h2>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Leaf className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs text-gray-600">Crop</span>
              </div>
              <p className="font-medium">{disease.crop}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <AlertTriangle className="h-4 w-4 text-orange-600 mr-1" />
                <span className="text-xs text-gray-600">Severity</span>
              </div>
              <p
                className={`font-medium ${getSeverityColor(disease.severity)} inline-block px-2 py-1 rounded-full text-sm`}
              >
                {disease.severity}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-1">
              <Microscope className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-xs text-gray-600">Scientific Name</span>
            </div>
            <p className="text-sm italic">{disease.scientificName}</p>
          </div>

          <p className="text-sm text-gray-700 mb-4">{disease.description}</p>

          <div className="flex justify-between">
            <Button variant="outline" size="sm" className="flex-1 mr-2" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-1" />
              Download Guide
            </Button>

            <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </Card>

      <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
        <Tabs defaultValue="symptoms">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms" className="p-4">
            <h3 className="font-medium text-green-800 mb-2">Common Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1">
              {disease.symptoms.map((symptom: string, index: number) => (
                <li key={index} className="text-sm text-gray-700">
                  {symptom}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="treatment" className="p-4">
            <h3 className="font-medium text-green-700 mb-2 flex items-center">
              <Leaf className="h-4 w-4 mr-1" />
              Organic Solutions
            </h3>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              {disease.treatments.organic.map((treatment: string, index: number) => (
                <li key={index} className="text-sm text-gray-700">
                  {treatment}
                </li>
              ))}
            </ul>

            <h3 className="font-medium text-blue-700 mb-2 flex items-center">
              <Droplet className="h-4 w-4 mr-1" />
              Chemical Options
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {disease.treatments.chemical.map((treatment: string, index: number) => (
                <li key={index} className="text-sm text-gray-700">
                  {treatment}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="prevention" className="p-4">
            <h3 className="font-medium text-orange-700 mb-2 flex items-center">
              <Sun className="h-4 w-4 mr-1" />
              Prevention Tips
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {disease.prevention.map((tip: string, index: number) => (
                <li key={index} className="text-sm text-gray-700">
                  {tip}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </Card>

      <AgriBot />
    </main>
  )
}

