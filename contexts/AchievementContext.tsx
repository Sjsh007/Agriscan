"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "scans" | "accuracy" | "streak" | "social" | "learning"
  progress: number
  target: number
  unlocked: boolean
  unlockedAt?: Date
  points: number
}

export interface UserStats {
  totalScans: number
  accurateScans: number
  currentStreak: number
  longestStreak: number
  totalPoints: number
  level: number
  diseasesIdentified: Set<string>
  lastScanDate?: Date
}

interface AchievementContextType {
  achievements: Achievement[]
  userStats: UserStats
  addScan: (diseaseId: string, accurate: boolean) => void
  checkAchievements: () => Achievement[]
  totalPoints: number
  currentLevel: number
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined)

const initialAchievements: Achievement[] = [
  // Scan-based achievements
  {
    id: "first-scan",
    title: "First Steps",
    description: "Complete your first crop scan",
    icon: "🌱",
    category: "scans",
    progress: 0,
    target: 1,
    unlocked: false,
    points: 10
  },
  {
    id: "10-scans",
    title: "Getting Started",
    description: "Complete 10 crop scans",
    icon: "🌾",
    category: "scans",
    progress: 0,
    target: 10,
    unlocked: false,
    points: 50
  },
  {
    id: "50-scans",
    title: "Experienced Farmer",
    description: "Complete 50 crop scans",
    icon: "🚜",
    category: "scans",
    progress: 0,
    target: 50,
    unlocked: false,
    points: 200
  },
  {
    id: "100-scans",
    title: "Master Agriculturist",
    description: "Complete 100 crop scans",
    icon: "🏆",
    category: "scans",
    progress: 0,
    target: 100,
    unlocked: false,
    points: 500
  },
  // Accuracy achievements
  {
    id: "5-accurate",
    title: "Sharp Eye",
    description: "Get 5 accurate diagnoses",
    icon: "👁️",
    category: "accuracy",
    progress: 0,
    target: 5,
    unlocked: false,
    points: 30
  },
  {
    id: "25-accurate",
    title: "Disease Detective",
    description: "Get 25 accurate diagnoses",
    icon: "🔍",
    category: "accuracy",
    progress: 0,
    target: 25,
    unlocked: false,
    points: 150
  },
  // Streak achievements
  {
    id: "3-day-streak",
    title: "Consistent Caretaker",
    description: "Scan crops for 3 days in a row",
    icon: "🔥",
    category: "streak",
    progress: 0,
    target: 3,
    unlocked: false,
    points: 40
  },
  {
    id: "7-day-streak",
    title: "Week Warrior",
    description: "Scan crops for 7 days in a row",
    icon: "⚡",
    category: "streak",
    progress: 0,
    target: 7,
    unlocked: false,
    points: 100
  },
  {
    id: "30-day-streak",
    title: "Monthly Monitor",
    description: "Scan crops for 30 days in a row",
    icon: "💎",
    category: "streak",
    progress: 0,
    target: 30,
    unlocked: false,
    points: 500
  },
  // Learning achievements
  {
    id: "5-diseases",
    title: "Disease Learner",
    description: "Identify 5 different diseases",
    icon: "📚",
    category: "learning",
    progress: 0,
    target: 5,
    unlocked: false,
    points: 60
  },
  {
    id: "15-diseases",
    title: "Disease Expert",
    description: "Identify 15 different diseases",
    icon: "🎓",
    category: "learning",
    progress: 0,
    target: 15,
    unlocked: false,
    points: 250
  }
]

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements)
  const [userStats, setUserStats] = useState<UserStats>({
    totalScans: 0,
    accurateScans: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalPoints: 0,
    level: 1,
    diseasesIdentified: new Set<string>()
  })

  // Load data from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem("achievements")
    const savedStats = localStorage.getItem("userStats")

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements))
    }

    if (savedStats) {
      const parsed = JSON.parse(savedStats)
      setUserStats({
        ...parsed,
        diseasesIdentified: new Set(parsed.diseasesIdentified || []),
        lastScanDate: parsed.lastScanDate ? new Date(parsed.lastScanDate) : undefined
      })
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(achievements))
    localStorage.setItem("userStats", JSON.stringify({
      ...userStats,
      diseasesIdentified: Array.from(userStats.diseasesIdentified)
    }))
  }, [achievements, userStats])

  const calculateStreak = (lastScanDate?: Date): number => {
    if (!lastScanDate) return 1

    const now = new Date()
    const lastScan = new Date(lastScanDate)
    const diffTime = Math.abs(now.getTime() - lastScan.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    // If scanned today or yesterday, continue streak
    if (diffDays <= 1) {
      return userStats.currentStreak + 1
    }
    // Reset streak
    return 1
  }

  const calculateLevel = (points: number): number => {
    return Math.floor(points / 100) + 1
  }

  const addScan = (diseaseId: string, accurate: boolean) => {
    setUserStats(prev => {
      const newDiseasesIdentified = new Set(prev.diseasesIdentified)
      newDiseasesIdentified.add(diseaseId)

      const newStreak = calculateStreak(prev.lastScanDate)
      const newTotalScans = prev.totalScans + 1
      const newAccurateScans = accurate ? prev.accurateScans + 1 : prev.accurateScans
      const newLongestStreak = Math.max(prev.longestStreak, newStreak)

      return {
        totalScans: newTotalScans,
        accurateScans: newAccurateScans,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        totalPoints: prev.totalPoints,
        level: prev.level,
        diseasesIdentified: newDiseasesIdentified,
        lastScanDate: new Date()
      }
    })
  }

  const checkAchievements = (): Achievement[] => {
    const newlyUnlocked: Achievement[] = []

    setAchievements(prev => {
      return prev.map(achievement => {
        if (achievement.unlocked) return achievement

        let currentProgress = achievement.progress

        // Update progress based on achievement type
        switch (achievement.category) {
          case "scans":
            currentProgress = userStats.totalScans
            break
          case "accuracy":
            currentProgress = userStats.accurateScans
            break
          case "streak":
            currentProgress = userStats.currentStreak
            break
          case "learning":
            currentProgress = userStats.diseasesIdentified.size
            break
        }

        const updated = { ...achievement, progress: currentProgress }

        // Check if achievement is newly unlocked
        if (!updated.unlocked && currentProgress >= updated.target) {
          updated.unlocked = true
          updated.unlockedAt = new Date()
          newlyUnlocked.push(updated)

          // Add points
          setUserStats(prev => {
            const newPoints = prev.totalPoints + updated.points
            return {
              ...prev,
              totalPoints: newPoints,
              level: calculateLevel(newPoints)
            }
          })
        }

        return updated
      })
    })

    return newlyUnlocked
  }

  return (
    <AchievementContext.Provider
      value={{
        achievements,
        userStats,
        addScan,
        checkAchievements,
        totalPoints: userStats.totalPoints,
        currentLevel: userStats.level
      }}
    >
      {children}
    </AchievementContext.Provider>
  )
}

export function useAchievements() {
  const context = useContext(AchievementContext)
  if (!context) {
    throw new Error("useAchievements must be used within AchievementProvider")
  }
  return context
}
