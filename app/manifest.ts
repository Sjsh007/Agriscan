import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AgriScan - AI Crop Disease Identifier",
    short_name: "AgriScan",
    description: "AI-powered crop pest and disease identifier for farmers",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4CAF50",
    icons: [
      {
        src: "/placeholder-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/placeholder-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/placeholder-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}

