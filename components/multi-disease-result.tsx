"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  AlertTriangle, CheckCircle, TrendingUp, Leaf, 
  AlertCircle, Target, Brain, Sparkles 
} from "lucide-react"

export interface DetectedDisease {
  id: string
  name: string
  scientificName: string
  confidence: number
  severity: "low" | "medium" | "high" | "critical"
  affectedArea: number
  symptoms: string[]
  primaryTreatment: string
}

interface MultiDiseaseResultProps {
  diseases: DetectedDisease[]
  cropType: string
  overallHealth: number
}

export default function MultiDiseaseResult({ 
  diseases, 
  cropType, 
  overallHealth 
}: MultiDiseaseResultProps) {
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null)

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: "bg-green-500/10 text-green-700 border-green-500/20",
      medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
      high: "bg-orange-500/10 text-orange-700 border-orange-500/20",
      critical: "bg-red-500/10 text-red-700 border-red-500/20"
    }
    return colors[severity as keyof typeof colors] || colors.low
  }

  const getSeverityIcon = (severity: string) => {
    if (severity === "critical") return <AlertTriangle className="w-4 h-4 text-red-500" />
    if (severity === "high") return <AlertCircle className="w-4 h-4 text-orange-500" />
    if (severity === "medium") return <AlertCircle className="w-4 h-4 text-yellow-500" />
    return <CheckCircle className="w-4 h-4 text-green-500" />
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600"
    if (health >= 60) return "text-yellow-600"
    if (health >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const priorityDiseases = diseases.sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
    return severityOrder[b.severity] - severityOrder[a.severity]
  })

  return (
    <div className="space-y-6">
      {/* Overall Health Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                Multi-Disease Analysis
              </CardTitle>
              <CardDescription>
                Advanced AI detected {diseases.length} disease{diseases.length !== 1 ? "s" : ""} on your {cropType}
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Plant Health</span>
                <span className={`text-2xl font-bold ${getHealthColor(overallHealth)}`}>
                  {overallHealth}%
                </span>
              </div>
              <Progress value={overallHealth} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                Based on severity and affected area of detected diseases
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-2 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{diseases.length}</div>
                <div className="text-xs text-muted-foreground">Detected</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">
                  {diseases.filter(d => d.severity === "high" || d.severity === "critical").length}
                </div>
                <div className="text-xs text-muted-foreground">High Risk</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">
                  {Math.max(...diseases.map(d => d.confidence)).toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">Max Confidence</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Alert */}
      {diseases.some(d => d.severity === "critical" || d.severity === "high") && (
        <Alert className="border-orange-500/50 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-900">
            <strong>Immediate Action Required:</strong> Multiple high-severity diseases detected. 
            Start treatment with the highest priority disease first.
          </AlertDescription>
        </Alert>
      )}

      {/* Disease List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-red-500" />
          Detected Diseases (Priority Order)
        </h3>

        {priorityDiseases.map((disease, index) => (
          <Card
            key={disease.id}
            className={`transition-all hover:shadow-lg cursor-pointer ${
              disease.severity === "critical"
                ? "border-red-500/50 bg-red-50/30"
                : disease.severity === "high"
                ? "border-orange-500/50 bg-orange-50/30"
                : ""
            }`}
            onClick={() => setExpandedDisease(expandedDisease === disease.id ? null : disease.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getSeverityIcon(disease.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-500/10 text-blue-700 border-blue-500/20 text-xs"
                      >
                        #{index + 1} Priority
                      </Badge>
                      <h4 className="font-semibold text-base">{disease.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground italic mb-2">
                      {disease.scientificName}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                        <div className="flex items-center gap-2">
                          <Progress value={disease.confidence} className="h-2 flex-1" />
                          <span className="text-xs font-semibold">{disease.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Affected Area</div>
                        <div className="flex items-center gap-2">
                          <Progress value={disease.affectedArea} className="h-2 flex-1" />
                          <span className="text-xs font-semibold">{disease.affectedArea}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className={getSeverityColor(disease.severity)}>
                  {disease.severity.toUpperCase()}
                </Badge>
              </div>

              {expandedDisease === disease.id && (
                <div className="mt-4 pt-4 border-t space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <h5 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Key Symptoms:
                    </h5>
                    <ul className="space-y-1">
                      {disease.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground pl-4">
                          • {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h5 className="text-sm font-semibold mb-1 flex items-center gap-1 text-blue-800">
                      <Leaf className="w-3 h-3" />
                      Primary Treatment:
                    </h5>
                    <p className="text-xs text-blue-900">{disease.primaryTreatment}</p>
                  </div>

                  <Button size="sm" variant="outline" className="w-full">
                    View Full Treatment Plan
                  </Button>
                </div>
              )}

              {expandedDisease !== disease.id && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Click to expand details
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Combined Treatment Strategy */}
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Combined Treatment Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <strong>Step 1:</strong> Address critical/high severity diseases first
          </p>
          <p className="text-sm">
            <strong>Step 2:</strong> Use broad-spectrum treatments when possible
          </p>
          <p className="text-sm">
            <strong>Step 3:</strong> Monitor plant response after 7-10 days
          </p>
          <p className="text-sm">
            <strong>Step 4:</strong> Consult agricultural expert for persistent issues
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
