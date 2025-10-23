"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Map } from "lucide-react"
import DiseaseHeatmap from "@/components/disease-heatmap"

export default function HeatmapPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
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
            <Map className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold">Disease Heatmap</h1>
          </div>

          <div className="w-20"></div>
        </div>

        {/* Heatmap Component */}
        <DiseaseHeatmap />
      </div>
    </div>
  )
}
