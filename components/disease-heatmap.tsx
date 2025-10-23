"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, TrendingUp, AlertTriangle, CheckCircle, Filter, Map } from "lucide-react"

interface DiseaseHotspot {
  id: string
  location: string
  state: string
  disease: string
  severity: "low" | "medium" | "high" | "critical"
  cases: number
  trend: "increasing" | "stable" | "decreasing"
  lastUpdated: Date
  lat: number
  lng: number
}

export default function DiseaseHeatmap() {
  const [hotspots, setHotspots] = useState<DiseaseHotspot[]>([])
  const [selectedState, setSelectedState] = useState<string>("all")
  const [selectedDisease, setSelectedDisease] = useState<string>("all")

  useEffect(() => {
    // Simulate disease hotspot data
    const mockHotspots: DiseaseHotspot[] = [
      {
        id: "1",
        location: "Guntur District",
        state: "Andhra Pradesh",
        disease: "Tomato Late Blight",
        severity: "high",
        cases: 156,
        trend: "increasing",
        lastUpdated: new Date("2025-01-18"),
        lat: 16.3067,
        lng: 80.4365
      },
      {
        id: "2",
        location: "Nashik District",
        state: "Maharashtra",
        disease: "Grape Downy Mildew",
        severity: "critical",
        cases: 243,
        trend: "increasing",
        lastUpdated: new Date("2025-01-17"),
        lat: 19.9975,
        lng: 73.7898
      },
      {
        id: "3",
        location: "Mysuru District",
        state: "Karnataka",
        disease: "Bacterial Wilt",
        severity: "medium",
        cases: 87,
        trend: "stable",
        lastUpdated: new Date("2025-01-16"),
        lat: 12.2958,
        lng: 76.6394
      },
      {
        id: "4",
        location: "Ludhiana District",
        state: "Punjab",
        disease: "Wheat Rust",
        severity: "high",
        cases: 198,
        trend: "decreasing",
        lastUpdated: new Date("2025-01-15"),
        lat: 30.9010,
        lng: 75.8573
      },
      {
        id: "5",
        location: "Thanjavur District",
        state: "Tamil Nadu",
        disease: "Rice Blast",
        severity: "medium",
        cases: 112,
        trend: "stable",
        lastUpdated: new Date("2025-01-14"),
        lat: 10.7870,
        lng: 79.1378
      },
      {
        id: "6",
        location: "Bhopal District",
        state: "Madhya Pradesh",
        disease: "Soybean Rust",
        severity: "low",
        cases: 45,
        trend: "decreasing",
        lastUpdated: new Date("2025-01-13"),
        lat: 23.2599,
        lng: 77.4126
      },
      {
        id: "7",
        location: "Kolkata District",
        state: "West Bengal",
        disease: "Potato Late Blight",
        severity: "high",
        cases: 176,
        trend: "increasing",
        lastUpdated: new Date("2025-01-12"),
        lat: 22.5726,
        lng: 88.3639
      },
      {
        id: "8",
        location: "Jaipur District",
        state: "Rajasthan",
        disease: "Cotton Leaf Curl",
        severity: "medium",
        cases: 93,
        trend: "stable",
        lastUpdated: new Date("2025-01-11"),
        lat: 26.9124,
        lng: 75.7873
      }
    ]

    setHotspots(mockHotspots)
  }, [])

  const filteredHotspots = hotspots.filter(hotspot => {
    if (selectedState !== "all" && hotspot.state !== selectedState) return false
    if (selectedDisease !== "all" && hotspot.disease !== selectedDisease) return false
    return true
  })

  const states = Array.from(new Set(hotspots.map(h => h.state))).sort()
  const diseases = Array.from(new Set(hotspots.map(h => h.disease))).sort()

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: "bg-green-500/10 text-green-500 border-green-500/20",
      medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      critical: "bg-red-500/10 text-red-500 border-red-500/20"
    }
    return colors[severity as keyof typeof colors] || colors.low
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") return <TrendingUp className="w-3 h-3 text-red-500" />
    if (trend === "decreasing") return <CheckCircle className="w-3 h-3 text-green-500" />
    return <AlertTriangle className="w-3 h-3 text-yellow-500" />
  }

  const severityStats = {
    critical: hotspots.filter(h => h.severity === "critical").length,
    high: hotspots.filter(h => h.severity === "high").length,
    medium: hotspots.filter(h => h.severity === "medium").length,
    low: hotspots.filter(h => h.severity === "low").length
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-red-500/50 bg-red-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{severityStats.critical}</div>
              <div className="text-sm text-muted-foreground mt-1">Critical</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/50 bg-orange-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{severityStats.high}</div>
              <div className="text-sm text-muted-foreground mt-1">High Risk</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{severityStats.medium}</div>
              <div className="text-sm text-muted-foreground mt-1">Medium</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{severityStats.low}</div>
              <div className="text-sm text-muted-foreground mt-1">Low Risk</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">State</label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Disease</label>
            <Select value={selectedDisease} onValueChange={setSelectedDisease}>
              <SelectTrigger>
                <SelectValue placeholder="Select disease" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Diseases</SelectItem>
                {diseases.map(disease => (
                  <SelectItem key={disease} value={disease}>{disease}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedState("all")
                setSelectedDisease("all")
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-red-500" />
            Disease Hotspots
          </CardTitle>
          <CardDescription>
            Real-time disease outbreak tracking across India
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredHotspots.map(hotspot => (
              <Card
                key={hotspot.id}
                className={`transition-all hover:shadow-lg ${
                  hotspot.severity === "critical"
                    ? "border-red-500/50 bg-red-500/5"
                    : hotspot.severity === "high"
                    ? "border-orange-500/50 bg-orange-500/5"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-red-500 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg">{hotspot.location}</h3>
                          <p className="text-sm text-muted-foreground">{hotspot.state}</p>
                        </div>
                      </div>

                      <div className="ml-8 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Disease:</span>
                          <span className="text-sm">{hotspot.disease}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Cases:</span>
                          <span className="text-sm font-bold">{hotspot.cases}</span>
                          <Badge variant="outline" className="gap-1">
                            {getTrendIcon(hotspot.trend)}
                            {hotspot.trend}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Last Updated:</span>
                          <span className="text-sm">{hotspot.lastUpdated.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant="outline"
                        className={getSeverityColor(hotspot.severity)}
                      >
                        {hotspot.severity.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHotspots.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Map className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No disease hotspots found for the selected filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
