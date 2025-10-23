// This file would handle internationalization for the app

export type Language = "en" | "hi" | "te" | "ta" | "kn" | "mr"

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "mr", name: "मराठी (Marathi)" },
]

// Mock translations (in a real app, these would be more comprehensive)
const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.name": "AgriScan",
    "home.scan": "Scan My Crop",
    "home.upload": "Upload Image",
    "home.database": "Browse Database",
    "home.login": "Login / Signup",
    "scan.title": "Scan My Crop",
    "upload.title": "Upload Image",
    "results.title": "Analysis Results",
    "agribot.greeting": "Hello! I'm AgriBot. How can I help you with your crops today?",
    // ... more translations
  },
  hi: {
    "app.name": "एग्रीस्कैन",
    "home.scan": "मेरी फसल स्कैन करें",
    "home.upload": "छवि अपलोड करें",
    "home.database": "डेटाबेस ब्राउज़ करें",
    "home.login": "लॉगिन / साइनअप",
    "scan.title": "मेरी फसल स्कैन करें",
    "upload.title": "छवि अपलोड करें",
    "results.title": "विश्लेषण परिणाम",
    "agribot.greeting": "नमस्ते! मैं एग्रीबॉट हूँ। आज मैं आपकी फसलों के साथ कैसे मदद कर सकता हूँ?",
    // ... more translations
  },
  te: {
    "app.name": "అగ్రిస్కాన్",
    "home.scan": "నా పంటను స్కాన్ చేయండి",
    "home.upload": "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    "home.database": "డేటాబేస్‌ను బ్రౌజ్ చేయండి",
    "home.login": "లాగిన్ / సైన్అప్",
    // ... more translations
  },
  ta: {
    "app.name": "அக்ரிஸ்கேன்",
    "home.scan": "எனது பயிரை ஸ்கேன் செய்யவும்",
    "home.upload": "படத்தைப் பதிவேற்றவும்",
    "home.database": "தரவுத்தளத்தை உலாவவும்",
    "home.login": "உள்நுழைவு / பதிவு செய்யவும்",
    // ... more translations
  },
  kn: {
    "app.name": "ಅಗ್ರಿಸ್ಕ್ಯಾನ್",
    "home.scan": "ನನ್ನ ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    "home.upload": "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "home.database": "ಡೇಟಾಬೇಸ್ ಬ್ರೌಸ್ ಮಾಡಿ",
    "home.login": "ಲಾಗಿನ್ / ಸೈನ್ಅಪ್",
    // ... more translations
  },
  mr: {
    "app.name": "अॅग्रीस्कॅन",
    "home.scan": "माझी पिके स्कॅन करा",
    "home.upload": "प्रतिमा अपलोड करा",
    "home.database": "डेटाबेस ब्राउझ करा",
    "home.login": "लॉगिन / साइनअप",
    // ... more translations
  },
}

// Get the current language from localStorage or default to English
export function getCurrentLanguage(): Language {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("language") as Language) || "en"
  }
  return "en"
}

// Translate a key to the current language
export function translate(key: string): string {
  const lang = getCurrentLanguage()
  return translations[lang]?.[key] || translations.en[key] || key
}

// Initialize text-to-speech with the current language
export function initSpeech(): SpeechSynthesisUtterance {
  const speech = new SpeechSynthesisUtterance()
  speech.lang = getCurrentLanguage()
  return speech
}

// Speak text in the current language
export function speakText(text: string): void {
  if ("speechSynthesis" in window) {
    const speech = initSpeech()
    speech.text = text
    window.speechSynthesis.speak(speech)
  }
}

