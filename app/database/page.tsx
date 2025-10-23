"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Filter, Leaf, TrendingUp, Shield, BookOpen, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AgriBot from "@/components/agri-bot"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

// Mock disease database
const diseasesDatabase = [
  {
    id: 1,
    name: "Early Blight",
    crop: "Tomato",
    scientificName: "Alternaria solani",
    severity: "Moderate",
    image: "/placeholder.svg?height=200&width=200",
    prevalence: 78, // how common (%)
    treatmentSuccess: 85, // success rate (%)
    symptoms: ["Dark spots on leaves", "Yellow halos around spots", "Leaf wilting"],
  },
  {
    id: 2,
    name: "Powdery Mildew",
    crop: "Cucumber",
    scientificName: "Erysiphe cichoracearum",
    severity: "Mild",
    image: "/placeholder.svg?height=200&width=200",
    prevalence: 92,
    treatmentSuccess: 95,
    symptoms: ["White powdery coating", "Leaf distortion", "Stunted growth"],
  },
  {
    id: 3,
    name: "Bacterial Leaf Spot",
    crop: "Pepper",
    scientificName: "Xanthomonas campestris",
    severity: "Severe",
    image: "/placeholder.svg?height=200&width=200",
    prevalence: 65,
    treatmentSuccess: 70,
    symptoms: ["Dark water-soaked spots", "Leaf yellowing", "Fruit lesions"],
  },
  {
    id: 4,
    name: "Rust",
    crop: "Wheat",
    scientificName: "Puccinia graminis",
    severity: "Severe",
    image: "/placeholder.svg?height=200&width=200",
    prevalence: 55,
    treatmentSuccess: 75,
    symptoms: ["Orange-brown pustules", "Leaf drying", "Reduced yield"],
  },
  {
    id: 5,
    name: "Downy Mildew",
    crop: "Grape",
    scientificName: "Plasmopara viticola",
    severity: "Moderate",
    image: "/placeholder.svg?height=200&width=200",
    prevalence: 70,
    treatmentSuccess: 80,
    symptoms: ["Yellow spots on upper leaf", "Fuzzy growth beneath", "Fruit rot"],
  },
  {
    id: 6,
    name: "Anthracnose",
    crop: "Mango",
    scientificName: "Colletotrichum gloeosporioides",
    severity: "Mild",
    image: "/placeholder.svg?height=200&width=200",
    prevalence: 60,
    treatmentSuccess: 90,
    symptoms: ["Dark sunken lesions", "Fruit drop", "Leaf spots"],
  },
  {
    id: 7,
    name: "Rice Blast",
    crop: "Rice",
    scientificName: "Magnaporthe oryzae",
    severity: "Severe",
    image: "/placeholder.svg?height=200&width=200",
    prevalence: 50,
    treatmentSuccess: 65,
    symptoms: ["Diamond-shaped lesions", "Gray centers", "Panicle infection"],
  },
]

export default function DatabasePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [cropFilter, setCropFilter] = useState("")
  const [severityFilter, setSeverityFilter] = useState("")

  // Filter diseases based on search term and filters
  const filteredDiseases = diseasesDatabase.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.scientificName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCrop = cropFilter ? disease.crop === cropFilter : true
    const matchesSeverity = severityFilter ? disease.severity === severityFilter : true

    return matchesSearch && matchesCrop && matchesSeverity
  })

  // Get unique crop types for filter
  const cropTypes = Array.from(new Set(diseasesDatabase.map((d) => d.crop)))

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-green-700">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-green-700">Disease Database</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search diseases, crops..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <Select value={cropFilter} onValueChange={setCropFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Crop Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="Mild">Mild</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchTerm("")
                setCropFilter("")
                setSeverityFilter("")
              }}
              className="flex-shrink-0"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <Card className="w-full max-w-md shadow-lg border-green-100 mb-6">
        <div className="p-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-700">{filteredDiseases.length}</div>
            <div className="text-xs text-gray-600">Diseases</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-700">{cropTypes.length}</div>
            <div className="text-xs text-gray-600">Crops</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-700">
              {Math.round(filteredDiseases.reduce((sum, d) => sum + d.treatmentSuccess, 0) / filteredDiseases.length)}%
            </div>
            <div className="text-xs text-gray-600">Avg Success</div>
          </div>
        </div>
      </Card>

      <div className="w-full max-w-md space-y-4 mb-6">
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((disease, index) => (
            <Card
              key={disease.id}
              className="overflow-hidden cursor-pointer hover:shadow-xl hover:border-green-300 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => {
                toast({ title: "📖 Opening disease details", description: `Loading information about ${disease.name}...` })
                setTimeout(() => router.push(`/disease/${disease.id}`), 500)
              }}
            >
              <div className="flex">
                <div className="w-1/3 relative">
                  <Image
                    src={disease.image || "/placeholder.svg"}
                    alt={disease.name}
                    width={120}
                    height={120}
                    className="object-cover h-full"
                  />
                  {/* Severity Badge Overlay */}
                  <div className="absolute top-2 left-2">
                    <Badge
                      className={`${
                        disease.severity === "Mild"
                          ? "bg-yellow-500"
                          : disease.severity === "Moderate"
                            ? "bg-orange-500"
                            : "bg-red-500"
                      } text-white`}
                    >
                      {disease.severity === "Mild" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {disease.severity === "Moderate" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {disease.severity === "Severe" && <XCircle className="w-3 h-3 mr-1" />}
                      {disease.severity}
                    </Badge>
                  </div>
                </div>
                <div className="w-2/3 p-4">
                  <h3 className="font-bold text-green-800 mb-1">{disease.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Leaf className="h-3 w-3 mr-1 text-green-600" />
                    <span className="font-medium">{disease.crop}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic mb-3">{disease.scientificName}</p>

                  {/* Quick Stats */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-gray-600">
                        <TrendingUp className="w-3 h-3" />
                        Prevalence
                      </span>
                      <span className="font-bold text-orange-600">{disease.prevalence}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Shield className="w-3 h-3" />
                        Success Rate
                      </span>
                      <span className="font-bold text-green-600">{disease.treatmentSuccess}%</span>
                    </div>
                  </div>

                  {/* Symptoms Preview */}
                  <div className="mt-2 pt-2 border-t">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="font-medium">Key Symptoms:</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {disease.symptoms.join(" • ")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center p-8">
            <div className="mb-4 text-gray-400">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No diseases found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      <AgriBot />
    </main>
  )
}

