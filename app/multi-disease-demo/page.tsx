"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain } from "lucide-react"
import MultiDiseaseResult from "@/components/multi-disease-result"
import type { DetectedDisease } from "@/components/multi-disease-result"

export default function MultiDiseaseDemo() {
  const router = useRouter()

  // Sample multi-disease detection data
  const sampleDiseases: DetectedDisease[] = [
    {
      id: "1",
      name: "Early Blight",
      scientificName: "Alternaria solani",
      confidence: 92,
      severity: "high",
      affectedArea: 35,
      symptoms: [
        "Dark concentric spots on older leaves",
        "Yellowing around the spots",
        "Premature leaf drop"
      ],
      primaryTreatment: "Apply chlorothalonil fungicide every 7-10 days and remove infected leaves"
    },
    {
      id: "2",
      name: "Septoria Leaf Spot",
      scientificName: "Septoria lycopersici",
      confidence: 78,
      severity: "medium",
      affectedArea: 20,
      symptoms: [
        "Small circular spots with gray centers",
        "Dark brown margins on leaves",
        "Spots may have tiny black dots (pycnidia)"
      ],
      primaryTreatment: "Use copper-based fungicides and ensure proper air circulation"
    },
    {
      id: "3",
      name: "Powdery Mildew",
      scientificName: "Erysiphe spp.",
      confidence: 85,
      severity: "medium",
      affectedArea: 15,
      symptoms: [
        "White powdery coating on leaves",
        "Leaf curling and distortion",
        "Stunted plant growth"
      ],
      primaryTreatment: "Apply sulfur-based fungicide or potassium bicarbonate spray weekly"
    },
    {
      id: "4",
      name: "Bacterial Spot",
      scientificName: "Xanthomonas spp.",
      confidence: 68,
      severity: "low",
      affectedArea: 8,
      symptoms: [
        "Small brown spots with yellow halos",
        "Spots appear water-soaked initially",
        "May affect fruit as well"
      ],
      primaryTreatment: "Use copper-based bactericides and practice good sanitation"
    }
  ]

  const overallHealth = 65 // Based on severity and affected areas

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold">Multi-Disease Detection</h1>
          </div>

          <div className="w-20"></div>
        </div>

        {/* Multi-Disease Result Component */}
        <MultiDiseaseResult
          diseases={sampleDiseases}
          cropType="Tomato"
          overallHealth={overallHealth}
        />
      </div>
    </div>
  )
}
