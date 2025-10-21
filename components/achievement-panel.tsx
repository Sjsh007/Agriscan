"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAchievements } from "@/contexts/AchievementContext"
import { Trophy, Star, Flame, Target, BookOpen, Lock } from "lucide-react"

export default function AchievementPanel() {
  const { achievements, userStats, currentLevel, totalPoints } = useAchievements()
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all")

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === "unlocked") return achievement.unlocked
    if (filter === "locked") return !achievement.unlocked
    return true
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)

  const categoryIcons = {
    scans: <Target className="w-4 h-4" />,
    accuracy: <Star className="w-4 h-4" />,
    streak: <Flame className="w-4 h-4" />,
    social: <Trophy className="w-4 h-4" />,
    learning: <BookOpen className="w-4 h-4" />
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      scans: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      accuracy: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      streak: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      social: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      learning: "bg-green-500/10 text-green-500 border-green-500/20"
    }
    return colors[category as keyof typeof colors] || colors.scans
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{currentLevel}</div>
              <div className="text-sm text-muted-foreground mt-1">Level</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{totalPoints}</div>
              <div className="text-sm text-muted-foreground mt-1">Points</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{userStats.currentStreak}</div>
              <div className="text-sm text-muted-foreground mt-1">Day Streak</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">{unlockedCount}/{totalCount}</div>
              <div className="text-sm text-muted-foreground mt-1">Achievements</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Overall Progress
          </CardTitle>
          <CardDescription>
            You've unlocked {unlockedCount} out of {totalCount} achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={completionPercentage} className="h-3" />
            <div className="text-right text-sm font-medium">{completionPercentage}% Complete</div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Achievements</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "unlocked" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unlocked")}
              >
                Unlocked
              </Button>
              <Button
                variant={filter === "locked" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("locked")}
              >
                Locked
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredAchievements.map(achievement => (
              <Card
                key={achievement.id}
                className={`transition-all ${
                  achievement.unlocked
                    ? "border-green-500/50 bg-green-500/5"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-4xl">{achievement.icon}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {achievement.title}
                            {achievement.unlocked && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Unlocked
                              </Badge>
                            )}
                            {!achievement.unlocked && (
                              <Lock className="w-3 h-3 text-muted-foreground" />
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={getCategoryColor(achievement.category)}
                        >
                          <span className="mr-1">{categoryIcons[achievement.category]}</span>
                          {achievement.category}
                        </Badge>
                      </div>

                      {/* Progress */}
                      {!achievement.unlocked && (
                        <div className="space-y-1">
                          <Progress
                            value={(achievement.progress / achievement.target) * 100}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              {achievement.progress} / {achievement.target}
                            </span>
                            <span className="font-medium text-yellow-500">+{achievement.points} points</span>
                          </div>
                        </div>
                      )}

                      {achievement.unlocked && achievement.unlockedAt && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                          <span className="ml-2 font-medium text-yellow-500">+{achievement.points} points</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Scans</div>
              <div className="text-2xl font-bold">{userStats.totalScans}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Accurate Diagnoses</div>
              <div className="text-2xl font-bold">{userStats.accurateScans}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
              <div className="text-2xl font-bold">{userStats.longestStreak} days</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Diseases Found</div>
              <div className="text-2xl font-bold">{userStats.diseasesIdentified.size}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
