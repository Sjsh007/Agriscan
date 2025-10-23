"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, TrendingDown, AlertTriangle, Cloud, Droplets, 
  Sun, Wind, ThermometerSun, Brain, BarChart3,
  Calendar, MapPin, Leaf, Bug, Shield, Activity
} from "lucide-react"
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts"
import { format, addDays, subDays } from "date-fns"

export default function AnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState("disease")
  const [timeRange, setTimeRange] = useState(7)
  const [weatherData, setWeatherData] = useState<any>(null)

  // Mock predictive data
  const diseaseRiskData = [
    { date: format(subDays(new Date(), 6), "MMM dd"), actual: 12, predicted: 14, risk: "Low" },
    { date: format(subDays(new Date(), 5), "MMM dd"), actual: 15, predicted: 17, risk: "Low" },
    { date: format(subDays(new Date(), 4), "MMM dd"), actual: 18, predicted: 19, risk: "Medium" },
    { date: format(subDays(new Date(), 3), "MMM dd"), actual: 22, predicted: 25, risk: "Medium" },
    { date: format(subDays(new Date(), 2), "MMM dd"), actual: 28, predicted: 30, risk: "High" },
    { date: format(subDays(new Date(), 1), "MMM dd"), actual: 32, predicted: 35, risk: "High" },
    { date: format(new Date(), "MMM dd"), actual: 35, predicted: 38, risk: "High" },
    { date: format(addDays(new Date(), 1), "MMM dd"), predicted: 42, risk: "Critical" },
    { date: format(addDays(new Date(), 2), "MMM dd"), predicted: 45, risk: "Critical" },
    { date: format(addDays(new Date(), 3), "MMM dd"), predicted: 48, risk: "Critical" },
    { date: format(addDays(new Date(), 4), "MMM dd"), predicted: 44, risk: "High" },
    { date: format(addDays(new Date(), 5), "MMM dd"), predicted: 40, risk: "High" },
    { date: format(addDays(new Date(), 6), "MMM dd"), predicted: 36, risk: "Medium" },
    { date: format(addDays(new Date(), 7), "MMM dd"), predicted: 32, risk: "Medium" },
  ]

  const cropHealthData = [
    { crop: "Rice", health: 85, trend: "up" },
    { crop: "Wheat", health: 78, trend: "down" },
    { crop: "Corn", health: 92, trend: "up" },
    { crop: "Cotton", health: 71, trend: "stable" },
    { crop: "Sugarcane", health: 88, trend: "up" },
  ]

  const diseaseDistribution = [
    { name: "Leaf Blight", value: 35, color: "#ef4444" },
    { name: "Rust", value: 25, color: "#f97316" },
    { name: "Mildew", value: 20, color: "#f59e0b" },
    { name: "Wilt", value: 15, color: "#eab308" },
    { name: "Others", value: 5, color: "#84cc16" },
  ]

  const weatherForecast = [
    { day: "Mon", temp: 32, humidity: 65, rain: 20 },
    { day: "Tue", temp: 34, humidity: 70, rain: 40 },
    { day: "Wed", temp: 31, humidity: 75, rain: 60 },
    { day: "Thu", temp: 29, humidity: 80, rain: 80 },
    { day: "Fri", temp: 30, humidity: 72, rain: 45 },
    { day: "Sat", temp: 33, humidity: 68, rain: 25 },
    { day: "Sun", temp: 35, humidity: 62, rain: 10 },
  ]

  const alerts = [
    { 
      severity: "critical", 
      title: "High Disease Risk Alert", 
      description: "Leaf blight outbreak predicted in 3-5 days",
      action: "Apply preventive fungicide"
    },
    { 
      severity: "high", 
      title: "Weather Warning", 
      description: "Heavy rainfall expected Thu-Fri",
      action: "Prepare drainage systems"
    },
    { 
      severity: "medium", 
      title: "Crop Health Declining", 
      description: "Wheat showing stress symptoms",
      action: "Check soil moisture and nutrients"
    },
  ]

  // Simulate weather data fetch
  useEffect(() => {
    setWeatherData({
      current: {
        temp: 32,
        humidity: 68,
        windSpeed: 12,
        condition: "Partly Cloudy"
      }
    })
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500"
      case "high": return "bg-orange-500"
      case "medium": return "bg-yellow-500"
      default: return "bg-green-500"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-5 w-5" />
      case "high": return <TrendingUp className="h-5 w-5" />
      case "medium": return <Activity className="h-5 w-5" />
      default: return <Shield className="h-5 w-5" />
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Predictive Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              AI-powered disease forecasting and crop health insights
            </p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {[7, 14, 30].map((days) => (
              <Button
                key={days}
                variant={timeRange === days ? "default" : "outline"}
                onClick={() => setTimeRange(days)}
                className="w-16"
              >
                {days}d
              </Button>
            ))}
          </div>
        </div>

        {/* Alert Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert, idx) => (
            <Card key={idx} className={`p-4 border-l-4 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)} text-white`}>
                  {getSeverityIcon(alert.severity)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{alert.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{alert.description}</p>
                  <Button size="sm" variant="link" className="p-0 h-auto mt-2 text-xs">
                    {alert.action} →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Farm Health Score</p>
                <p className="text-3xl font-bold mt-1">82/100</p>
                <p className="text-xs mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +5% this week
                </p>
              </div>
              <Activity className="h-12 w-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Disease Risk</p>
                <p className="text-3xl font-bold mt-1">High</p>
                <p className="text-xs mt-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Peaks in 3 days
                </p>
              </div>
              <Bug className="h-12 w-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Weather Impact</p>
                <p className="text-3xl font-bold mt-1">Medium</p>
                <p className="text-xs mt-2 flex items-center gap-1">
                  <Cloud className="h-3 w-3" /> Rain expected
                </p>
              </div>
              <Cloud className="h-12 w-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">AI Confidence</p>
                <p className="text-3xl font-bold mt-1">94%</p>
                <p className="text-xs mt-2 flex items-center gap-1">
                  <Brain className="h-3 w-3" /> High accuracy
                </p>
              </div>
              <Brain className="h-12 w-12 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Disease Risk Prediction Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Disease Risk Forecast</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">14-day predictive analysis with ML</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Predicted</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={diseaseRiskData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#colorActual)" 
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="#3b82f6" 
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorPredicted)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Health Status */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Crop Health Status</h2>
            <div className="space-y-4">
              {cropHealthData.map((crop, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{crop.crop}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{crop.health}%</span>
                      {crop.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {crop.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        crop.health >= 80 ? "bg-green-500" : 
                        crop.health >= 60 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${crop.health}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Disease Distribution */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Disease Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={diseaseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {diseaseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Weather Forecast */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">7-Day Weather Forecast</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weatherForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="temp" fill="#f97316" name="Temp (°C)" />
              <Bar yAxisId="left" dataKey="humidity" fill="#3b82f6" name="Humidity (%)" />
              <Bar yAxisId="right" dataKey="rain" fill="#06b6d4" name="Rain (%)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-green-600" />
            AI Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">Immediate Action</h3>
              <p className="text-sm">Apply preventive fungicide to rice fields before predicted rainfall.</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">This Week</h3>
              <p className="text-sm">Monitor wheat crops closely. Consider soil nutrient testing.</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-purple-600 mb-2">Long Term</h3>
              <p className="text-sm">Plan crop rotation for next season to reduce disease pressure.</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
