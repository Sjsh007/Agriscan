"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, ArrowLeft } from "lucide-react"
import AchievementPanel from "@/components/achievement-panel"

export default function AchievementsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
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
            <Award className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Achievements</h1>
          </div>

          <div className="w-20"></div>
        </div>

        {/* Achievement Panel */}
        <AchievementPanel />
      </div>
    </div>
  )
}
