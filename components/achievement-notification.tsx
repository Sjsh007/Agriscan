"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAchievements, type Achievement } from "@/contexts/AchievementContext"
import { toast } from "@/hooks/use-toast"
import { Trophy, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function AchievementNotification({ achievement }: { achievement: Achievement }) {
  const router = useRouter()

  return (
    <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-4xl animate-bounce">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <h3 className="font-bold">Achievement Unlocked!</h3>
            </div>
            <p className="font-semibold">{achievement.title}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            <Badge variant="outline" className="mt-2 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              +{achievement.points} Points
            </Badge>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-3"
          onClick={() => router.push("/achievements")}
        >
          View All Achievements
        </Button>
      </CardContent>
    </Card>
  )
}

export function useAchievementNotifications() {
  const { checkAchievements } = useAchievements()

  useEffect(() => {
    const interval = setInterval(() => {
      const newAchievements = checkAchievements()
      
      newAchievements.forEach(achievement => {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Achievement Unlocked!
            </div>
          ),
          description: <AchievementNotification achievement={achievement} />,
          duration: 8000
        })
      })
    }, 3000) // Check every 3 seconds

    return () => clearInterval(interval)
  }, [checkAchievements])
}
