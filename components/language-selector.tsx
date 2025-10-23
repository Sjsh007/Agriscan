"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "mr", name: "मराठी (Marathi)" },
]

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language") || "en"
    setCurrentLanguage(savedLanguage)
  }, [])

  const changeLanguage = (code: string) => {
    setCurrentLanguage(code)
    localStorage.setItem("language", code)
    // Reload page to apply language change
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={currentLanguage === lang.code ? "bg-muted font-medium" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

