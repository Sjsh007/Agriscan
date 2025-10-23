import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export interface ScanResult {
  id: string
  disease: string
  confidence: number
  crop: string
  scanDate: Date
  severity: "low" | "medium" | "high" | "critical"
  symptoms: string[]
  treatments: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
  }>
  preventiveMeasures: string[]
  imageUrl?: string
}

export interface ReportOptions {
  includeCharts: boolean
  includeTreatments: boolean
  includePreventiveMeasures: boolean
  includeImage: boolean
  language: "en" | "hi"
}

export class ReportGenerator {
  private doc: jsPDF
  private yPosition: number = 20
  private pageHeight: number = 280
  private margin: number = 20

  constructor() {
    this.doc = new jsPDF()
  }

  private addHeader() {
    // Logo and Title
    this.doc.setFillColor(34, 197, 94) // Green color
    this.doc.rect(0, 0, 210, 30, "F")
    
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(24)
    this.doc.setFont("helvetica", "bold")
    this.doc.text("🌱 AgriScan", this.margin, 15)
    
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")
    this.doc.text("AI-Powered Crop Disease Analysis Report", this.margin, 22)
    
    this.yPosition = 40
  }

  private addFooter() {
    const pageCount = this.doc.getNumberOfPages()
    this.doc.setFontSize(8)
    this.doc.setTextColor(100)
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i)
      this.doc.text(
        `Page ${i} of ${pageCount}`,
        this.doc.internal.pageSize.getWidth() / 2,
        this.doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      )
      this.doc.text(
        `Generated on ${new Date().toLocaleDateString()} | AgriScan © 2025`,
        this.doc.internal.pageSize.getWidth() / 2,
        this.doc.internal.pageSize.getHeight() - 5,
        { align: "center" }
      )
    }
  }

  private checkPageBreak(height: number) {
    if (this.yPosition + height > this.pageHeight) {
      this.doc.addPage()
      this.yPosition = 20
    }
  }

  private addSection(title: string) {
    this.checkPageBreak(15)
    
    this.doc.setFillColor(243, 244, 246)
    this.doc.rect(this.margin, this.yPosition - 5, 170, 10, "F")
    
    this.doc.setTextColor(0, 0, 0)
    this.doc.setFontSize(14)
    this.doc.setFont("helvetica", "bold")
    this.doc.text(title, this.margin + 2, this.yPosition)
    
    this.yPosition += 12
  }

  private addDiseaseInfo(result: ScanResult) {
    this.addSection("Disease Information")
    
    // Disease details
    const details = [
      ["Disease Name", result.disease],
      ["Crop Type", result.crop],
      ["Confidence Level", `${(result.confidence * 100).toFixed(1)}%`],
      ["Severity", result.severity.toUpperCase()],
      ["Scan Date", result.scanDate.toLocaleDateString()],
      ["Report ID", result.id.substring(0, 8).toUpperCase()]
    ]

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Field", "Value"]],
      body: details,
      theme: "grid",
      headStyles: { fillColor: [34, 197, 94] },
      margin: { left: this.margin, right: this.margin },
      styles: { fontSize: 10 }
    })

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 10
  }

  private addSymptoms(symptoms: string[]) {
    this.addSection("Observed Symptoms")
    
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")
    this.doc.setTextColor(0, 0, 0)

    symptoms.forEach((symptom, index) => {
      this.checkPageBreak(8)
      this.doc.text(`${index + 1}. ${symptom}`, this.margin + 5, this.yPosition)
      this.yPosition += 7
    })

    this.yPosition += 5
  }

  private addTreatments(treatments: ScanResult["treatments"]) {
    this.addSection("Recommended Treatments")
    
    const treatmentData = treatments.map(t => [
      t.name,
      t.dosage,
      t.frequency,
      t.duration
    ])

    autoTable(this.doc, {
      startY: this.yPosition,
      head: [["Treatment", "Dosage", "Frequency", "Duration"]],
      body: treatmentData,
      theme: "striped",
      headStyles: { fillColor: [34, 197, 94] },
      margin: { left: this.margin, right: this.margin },
      styles: { fontSize: 9 }
    })

    this.yPosition = (this.doc as any).lastAutoTable.finalY + 10
  }

  private addPreventiveMeasures(measures: string[]) {
    this.addSection("Preventive Measures")
    
    this.doc.setFontSize(10)
    this.doc.setFont("helvetica", "normal")
    this.doc.setTextColor(0, 0, 0)

    measures.forEach((measure, index) => {
      this.checkPageBreak(8)
      this.doc.text(`✓ ${measure}`, this.margin + 5, this.yPosition)
      this.yPosition += 7
    })

    this.yPosition += 5
  }

  private addConfidenceChart(confidence: number) {
    this.addSection("Confidence Analysis")
    
    this.checkPageBreak(40)
    
    // Draw confidence bar
    const barWidth = 150
    const barHeight = 20
    const barX = this.margin + 10
    const barY = this.yPosition

    // Background
    this.doc.setFillColor(229, 231, 235)
    this.doc.rect(barX, barY, barWidth, barHeight, "F")
    
    // Confidence fill
    const fillWidth = (confidence * barWidth)
    const color = confidence > 0.8 ? [34, 197, 94] : confidence > 0.6 ? [251, 191, 36] : [239, 68, 68]
    this.doc.setFillColor(color[0], color[1], color[2])
    this.doc.rect(barX, barY, fillWidth, barHeight, "F")
    
    // Border
    this.doc.setDrawColor(0)
    this.doc.rect(barX, barY, barWidth, barHeight)
    
    // Percentage text
    this.doc.setFontSize(12)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(255, 255, 255)
    this.doc.text(
      `${(confidence * 100).toFixed(1)}%`,
      barX + fillWidth / 2,
      barY + barHeight / 2 + 4,
      { align: "center" }
    )

    this.yPosition += barHeight + 15
  }

  private addWarningBox() {
    this.checkPageBreak(30)
    
    this.doc.setFillColor(254, 243, 199)
    this.doc.rect(this.margin, this.yPosition, 170, 25, "F")
    
    this.doc.setDrawColor(251, 191, 36)
    this.doc.setLineWidth(0.5)
    this.doc.rect(this.margin, this.yPosition, 170, 25)
    
    this.doc.setFontSize(9)
    this.doc.setFont("helvetica", "bold")
    this.doc.setTextColor(180, 83, 9)
    this.doc.text("⚠️ IMPORTANT NOTICE", this.margin + 3, this.yPosition + 6)
    
    this.doc.setFont("helvetica", "normal")
    this.doc.setFontSize(8)
    this.doc.text(
      "This report is generated by AI and should be used as a reference only.",
      this.margin + 3,
      this.yPosition + 12
    )
    this.doc.text(
      "For critical decisions, please consult with agricultural experts or extension officers.",
      this.margin + 3,
      this.yPosition + 18
    )

    this.yPosition += 30
  }

  public generateReport(result: ScanResult, options: ReportOptions): jsPDF {
    this.addHeader()
    
    // Add disease information
    this.addDiseaseInfo(result)
    
    // Add confidence chart if requested
    if (options.includeCharts) {
      this.addConfidenceChart(result.confidence)
    }
    
    // Add symptoms
    if (result.symptoms.length > 0) {
      this.addSymptoms(result.symptoms)
    }
    
    // Add treatments if requested
    if (options.includeTreatments && result.treatments.length > 0) {
      this.addTreatments(result.treatments)
    }
    
    // Add preventive measures if requested
    if (options.includePreventiveMeasures && result.preventiveMeasures.length > 0) {
      this.addPreventiveMeasures(result.preventiveMeasures)
    }
    
    // Add warning box
    this.addWarningBox()
    
    // Add footer
    this.addFooter()
    
    return this.doc
  }

  public downloadReport(result: ScanResult, options: ReportOptions) {
    const doc = this.generateReport(result, options)
    const fileName = `AgriScan_Report_${result.disease.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
    doc.save(fileName)
  }

  public getReportBlob(result: ScanResult, options: ReportOptions): Blob {
    const doc = this.generateReport(result, options)
    return doc.output("blob")
  }
}

// Utility function to generate a quick report
export function generateQuickReport(result: ScanResult) {
  const generator = new ReportGenerator()
  generator.downloadReport(result, {
    includeCharts: true,
    includeTreatments: true,
    includePreventiveMeasures: true,
    includeImage: false,
    language: "en"
  })
}
