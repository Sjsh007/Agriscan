"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, FileImage, X, CheckCircle2, Layers, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AgriBot from "@/components/agri-bot"
import { toast } from "@/hooks/use-toast"

interface UploadedFile {
  id: string
  file: File
  preview: string
  status: "pending" | "analyzing" | "complete"
  progress: number
}

export default function UploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [batchAnalyzing, setBatchAnalyzing] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      processFiles(Array.from(files))
    }
  }

  const processFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast({ title: "Unsupported file", description: `${file.name} is not an image file.` })
        return false
      }

      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: `${file.name} exceeds 10MB limit.` })
        return false
      }

      return true
    })

    if (validFiles.length === 0) return

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: "",
      status: "pending",
      progress: 0,
    }))

    // Load preview images
    newFiles.forEach((uploadedFile) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? { ...f, preview: result } : f)))
      }
      reader.readAsDataURL(uploadedFile.file)
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])
    toast({
      title: "📷 Images added",
      description: `${validFiles.length} image${validFiles.length > 1 ? "s" : ""} ready for analysis.`,
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files))
    }
  }

  const analyzeBatch = async () => {
    if (uploadedFiles.length === 0) return

    setBatchAnalyzing(true)
    toast({ title: "🔬 Starting batch analysis", description: `Processing ${uploadedFiles.length} images...` })

    // Simulate progressive analysis
    for (let i = 0; i < uploadedFiles.length; i++) {
      const fileId = uploadedFiles[i].id

      // Mark as analyzing
      setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "analyzing" as const } : f)))

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
      }

      // Mark as complete
      setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "complete" as const } : f)))
    }

    toast({ title: "✅ Batch complete", description: "All images analyzed successfully!" })
    setBatchAnalyzing(false)

    // Redirect to results after a short delay
    setTimeout(() => {
      router.push("/results")
    }, 1500)
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
    toast({ title: "Image removed", description: "Image removed from batch." })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-green-700">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-green-700" />
          <h1 className="text-xl font-bold text-green-700">Batch Upload</h1>
        </div>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* Upload Zone */}
      <Card className="w-full max-w-4xl overflow-hidden shadow-lg border-green-100 mb-6">
        <div
          className={`p-8 flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed ${
            dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          } rounded-lg transition-all`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="relative mb-4">
            <FileImage className={`h-16 w-16 ${dragActive ? "text-green-500" : "text-gray-400"} transition-colors`} />
            {uploadedFiles.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {uploadedFiles.length}
              </div>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {uploadedFiles.length === 0 ? "Upload crop images" : `${uploadedFiles.length} images ready`}
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            {dragActive
              ? "Drop images here..."
              : "Drag and drop multiple images, or click to browse"}
          </p>
          <Button onClick={triggerFileInput} className="bg-green-600 hover:bg-green-700" disabled={batchAnalyzing}>
            <Upload className="mr-2 h-4 w-4" />
            Add More Images
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </Card>

      {/* Image Gallery */}
      {uploadedFiles.length > 0 && (
        <Card className="w-full max-w-4xl overflow-hidden shadow-lg border-green-100 mb-6">
          <div className="p-4 bg-green-50 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-700" />
              <h2 className="font-semibold text-green-700">Image Gallery</h2>
            </div>
            <div className="text-sm text-gray-600">
              {uploadedFiles.filter((f) => f.status === "complete").length} / {uploadedFiles.length} analyzed
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="relative group animate-fade-in">
                <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                  {file.preview && (
                    <Image src={file.preview} alt={file.file.name} fill className="object-cover" />
                  )}

                  {/* Status Overlay */}
                  {file.status === "analyzing" && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <p className="text-white text-xs">{file.progress}%</p>
                    </div>
                  )}

                  {file.status === "complete" && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Remove Button */}
                  {!batchAnalyzing && file.status === "pending" && (
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                {file.status === "analyzing" && (
                  <Progress value={file.progress} className="mt-2 h-1" />
                )}

                <p className="text-xs text-gray-600 mt-1 truncate">{file.file.name}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Analyze Button */}
      {uploadedFiles.length > 0 && (
        <Button
          onClick={analyzeBatch}
          disabled={batchAnalyzing || uploadedFiles.some((f) => f.status === "analyzing")}
          className="w-full max-w-4xl bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold"
        >
          {batchAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Analyzing {uploadedFiles.filter((f) => f.status === "complete").length} / {uploadedFiles.length}...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              Analyze All {uploadedFiles.length} Images
            </>
          )}
        </Button>
      )}

      <div className="w-full max-w-4xl mt-6">
        <p className="text-sm text-gray-600 text-center">
          💡 Tip: For best results, upload clear, well-lit images of affected plant parts. Supported: JPG, PNG, WEBP
          (max 10MB each).
        </p>
      </div>

      <AgriBot />
    </main>
  )
}

