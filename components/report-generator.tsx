"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, Download, Share2, Eye, CheckCircle, 
  FileBarChart, Sparkles, Loader2 
} from "lucide-react"
import { ReportGenerator, type ScanResult, type ReportOptions } from "@/lib/report-generator"
import { toast } from "@/hooks/use-toast"

interface ReportGeneratorProps {
  scanResult: ScanResult
}

export default function ReportGeneratorComponent({ scanResult }: ReportGeneratorProps) {
  const [options, setOptions] = useState<ReportOptions>({
    includeCharts: true,
    includeTreatments: true,
    includePreventiveMeasures: true,
    includeImage: false,
    language: "en"
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    
    try {
      const generator = new ReportGenerator()
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      generator.downloadReport(scanResult, options)
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Report Generated Successfully!
          </div>
        ),
        description: "Your PDF report has been downloaded."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again."
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePreviewReport = () => {
    const generator = new ReportGenerator()
    const blob = generator.getReportBlob(scanResult, options)
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }

  const handleShareReport = async () => {
    if (navigator.share) {
      const generator = new ReportGenerator()
      const blob = generator.getReportBlob(scanResult, options)
      const file = new File([blob], "AgriScan_Report.pdf", { type: "application/pdf" })
      
      try {
        await navigator.share({
          title: "AgriScan Disease Report",
          text: `Disease Report: ${scanResult.disease}`,
          files: [file]
        })
        
        toast({
          title: "Shared Successfully",
          description: "Report has been shared."
        })
      } catch (error) {
        toast({
          title: "Share Failed",
          description: "Unable to share the report."
        })
      }
    } else {
      toast({
        title: "Share Not Supported",
        description: "Your browser doesn't support sharing."
      })
    }
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="w-5 h-5 text-blue-500" />
              Generate Report
            </CardTitle>
            <CardDescription>
              Create a professional PDF report of your scan results
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <Sparkles className="w-3 h-3 mr-1" />
            PDF Export
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Preview */}
        <div className="p-4 bg-white rounded-lg border-2 border-dashed border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-sm">Report Preview</h3>
              <p className="text-xs text-muted-foreground">
                {scanResult.disease} - {scanResult.crop}
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Confidence:</span>
              <span className="font-semibold">{(scanResult.confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Severity:</span>
              <Badge variant="outline" className="h-5 text-xs">
                {scanResult.severity}
              </Badge>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="text-muted-foreground">Scan Date:</span>
              <span className="font-medium">{scanResult.scanDate.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Report ID:</span>
              <span className="font-mono text-xs">{scanResult.id.substring(0, 8).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Report Options */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            Report Options
          </h3>
          
          <div className="space-y-3 pl-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="charts"
                checked={options.includeCharts}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, includeCharts: checked as boolean })
                }
              />
              <Label
                htmlFor="charts"
                className="text-sm font-normal cursor-pointer"
              >
                Include confidence charts and visualizations
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="treatments"
                checked={options.includeTreatments}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, includeTreatments: checked as boolean })
                }
              />
              <Label
                htmlFor="treatments"
                className="text-sm font-normal cursor-pointer"
              >
                Include treatment recommendations
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="preventive"
                checked={options.includePreventiveMeasures}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, includePreventiveMeasures: checked as boolean })
                }
              />
              <Label
                htmlFor="preventive"
                className="text-sm font-normal cursor-pointer"
              >
                Include preventive measures
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="image"
                checked={options.includeImage}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, includeImage: checked as boolean })
                }
              />
              <Label
                htmlFor="image"
                className="text-sm font-normal cursor-pointer"
              >
                Include crop image (if available)
              </Label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>

          <Button
            onClick={handlePreviewReport}
            variant="outline"
            disabled={isGenerating}
            className="flex-1"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>

          <Button
            onClick={handleShareReport}
            variant="outline"
            disabled={isGenerating}
            className="flex-1"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-muted-foreground text-center pt-2 border-t">
          Reports are generated in professional PDF format and include AI-powered insights
        </p>
      </CardContent>
    </Card>
  )
}
