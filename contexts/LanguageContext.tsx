"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "te" | "ta" | "kn" | "mr"

interface Translations {
  [key: string]: string
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Translations> = {
  en: {
    "app.name": "AgriScan",
    "app.tagline": "AI-powered crop disease detection at your fingertips",
    "home.welcome": "🌱 Welcome to AgriScan!",
    "home.scan": "Scan My Crop",
    "home.upload": "Upload Image",
    "home.database": "Browse Database",
    "home.login": "Login / Signup",
    "home.scans": "Scans Completed",
    "home.accuracy": "AI Accuracy",
    "home.users": "Active Users",
    "home.quickActions": "Quick Actions",
    "home.quickActionsDesc": "Start analyzing your crops in seconds",
    "home.liveActivity": "Live Activity Feed",
    "home.recentScans": "Recent scans from farmers worldwide",
    "home.features": "Key Features",
    "home.50diseases": "Crop Diseases",
    "home.20crops": "Across 20+ crop types",
    "home.3seconds": "Analysis Time",
    "home.realtime": "Real-time processing",
    "home.multilingual": "Languages Supported",
    "home.globalreach": "Global reach",
    "toast.cameraReady": "🎥 Camera Ready!",
    "toast.cameraDesc": "Opening camera for real-time scan...",
    "toast.uploadReady": "📤 Upload Ready!",
    "toast.uploadDesc": "Select images for batch processing...",
    "badge.live": "LIVE",
    "badge.batch": "Batch",
  },
  hi: {
    "app.name": "एग्रीस्कैन",
    "app.tagline": "आपकी उंगलियों पर AI-संचालित फसल रोग का पता लगाना",
    "home.welcome": "🌱 एग्रीस्कैन में आपका स्वागत है!",
    "home.scan": "मेरी फसल स्कैन करें",
    "home.upload": "छवि अपलोड करें",
    "home.database": "डेटाबेस ब्राउज़ करें",
    "home.login": "लॉगिन / साइनअप",
    "home.scans": "स्कैन पूर्ण",
    "home.accuracy": "AI सटीकता",
    "home.users": "सक्रिय उपयोगकर्ता",
    "home.quickActions": "त्वरित क्रियाएं",
    "home.quickActionsDesc": "सेकंड में अपनी फसलों का विश्लेषण शुरू करें",
    "home.liveActivity": "लाइव गतिविधि फ़ीड",
    "home.recentScans": "दुनिया भर के किसानों से हाल के स्कैन",
    "home.features": "मुख्य विशेषताएं",
    "home.50diseases": "फसल रोग",
    "home.20crops": "20+ फसल प्रकारों में",
    "home.3seconds": "विश्लेषण समय",
    "home.realtime": "रियल-टाइम प्रसंस्करण",
    "home.multilingual": "भाषाएँ समर्थित",
    "home.globalreach": "वैश्विक पहुंच",
    "toast.cameraReady": "🎥 कैमरा तैयार!",
    "toast.cameraDesc": "रीयल-टाइम स्कैन के लिए कैमरा खोल रहा है...",
    "toast.uploadReady": "📤 अपलोड तैयार!",
    "toast.uploadDesc": "बैच प्रोसेसिंग के लिए छवियां चुनें...",
    "badge.live": "लाइव",
    "badge.batch": "बैच",
  },
  te: {
    "app.name": "అగ్రిస్కాన్",
    "app.tagline": "మీ చేతుల్లో AI-ఆధారిత పంట వ్యాధి గుర్తింపు",
    "home.welcome": "🌱 అగ్రిస్కాన్‌కు స్వాగతం!",
    "home.scan": "నా పంటను స్కాన్ చేయండి",
    "home.upload": "చిత్రాన్ని అప్‌లోడ్ చేయండి",
    "home.database": "డేటాబేస్ బ్రౌజ్ చేయండి",
    "home.login": "లాగిన్ / సైన్అప్",
    "home.scans": "స్కాన్‌లు పూర్తయ్యాయి",
    "home.accuracy": "AI ఖచ్చితత్వం",
    "home.users": "క్రియాశీల వినియోగదారులు",
    "home.quickActions": "త్వరిత చర్యలు",
    "home.quickActionsDesc": "సెకన్లలో మీ పంటల విశ్లేషణ ప్రారంభించండి",
    "home.liveActivity": "లైవ్ యాక్టివిటీ ఫీడ్",
    "home.recentScans": "ప్రపంచవ్యాప్తంగా రైతుల నుండి ఇటీవలి స్కాన్‌లు",
    "home.features": "ముఖ్య లక్షణాలు",
    "home.50diseases": "పంట వ్యాధులు",
    "home.20crops": "20+ పంట రకాలలో",
    "home.3seconds": "విశ్లేషణ సమయం",
    "home.realtime": "రియల్-టైమ్ ప్రాసెసింగ్",
    "home.multilingual": "భాషలు మద్దతు",
    "home.globalreach": "ప్రపంచ పరిధి",
    "toast.cameraReady": "🎥 కెమెరా సిద్ధం!",
    "toast.cameraDesc": "రియల్-టైమ్ స్కాన్ కోసం కెమెరా తెరుస్తోంది...",
    "toast.uploadReady": "📤 అప్‌లోడ్ సిద్ధం!",
    "toast.uploadDesc": "బ్యాచ్ ప్రాసెసింగ్ కోసం చిత్రాలను ఎంచుకోండి...",
    "badge.live": "లైవ్",
    "badge.batch": "బ్యాచ్",
  },
  ta: {
    "app.name": "அக்ரிஸ்கேன்",
    "app.tagline": "உங்கள் விரல்களில் AI-இயங்கும் பயிர் நோய் கண்டறிதல்",
    "home.welcome": "🌱 அக்ரிஸ்கேனுக்கு வரவேற்கிறோம்!",
    "home.scan": "எனது பயிரை ஸ்கேன் செய்யவும்",
    "home.upload": "படத்தைப் பதிவேற்றவும்",
    "home.database": "தரவுத்தளத்தை உலாவவும்",
    "home.login": "உள்நுழைவு / பதிவு செய்யவும்",
    "home.scans": "ஸ்கேன்கள் முடிந்தது",
    "home.accuracy": "AI துல்லியம்",
    "home.users": "செயலில் உள்ள பயனர்கள்",
    "home.quickActions": "விரைவு செயல்கள்",
    "home.quickActionsDesc": "விநாடிகளில் உங்கள் பயிர்களை பகுப்பாய்வு செய்யத் தொடங்குங்கள்",
    "home.liveActivity": "நேரடி செயல்பாட்டு ஊட்டம்",
    "home.recentScans": "உலகம் முழுவதும் உள்ள விவசாயிகளிடமிருந்து சமீபத்திய ஸ்கேன்கள்",
    "home.features": "முக்கிய அம்சங்கள்",
    "home.50diseases": "பயிர் நோய்கள்",
    "home.20crops": "20+ பயிர் வகைகளில்",
    "home.3seconds": "பகுப்பாய்வு நேரம்",
    "home.realtime": "நேரடி செயலாக்கம்",
    "home.multilingual": "ஆதரிக்கப்படும் மொழிகள்",
    "home.globalreach": "உலகளாவிய அணுகல்",
    "toast.cameraReady": "🎥 கேமரா தயார்!",
    "toast.cameraDesc": "நேரடி ஸ்கேனுக்கு கேமராவைத் திறக்கிறது...",
    "toast.uploadReady": "📤 பதிவேற்றம் தயார்!",
    "toast.uploadDesc": "தொகுதி செயலாக்கத்திற்கு படங்களைத் தேர்ந்தெடுக்கவும்...",
    "badge.live": "நேரடி",
    "badge.batch": "தொகுதி",
  },
  kn: {
    "app.name": "ಅಗ್ರಿಸ್ಕ್ಯಾನ್",
    "app.tagline": "ನಿಮ್ಮ ಬೆರಳ ತುದಿಯಲ್ಲಿ AI-ಚಾಲಿತ ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
    "home.welcome": "🌱 ಅಗ್ರಿಸ್ಕ್ಯಾನ್‌ಗೆ ಸ್ವಾಗತ!",
    "home.scan": "ನನ್ನ ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    "home.upload": "ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "home.database": "ಡೇಟಾಬೇಸ್ ಬ್ರೌಸ್ ಮಾಡಿ",
    "home.login": "ಲಾಗಿನ್ / ಸೈನ್ಅಪ್",
    "home.scans": "ಸ್ಕ್ಯಾನ್‌ಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ",
    "home.accuracy": "AI ನಿಖರತೆ",
    "home.users": "ಸಕ್ರಿಯ ಬಳಕೆದಾರರು",
    "home.quickActions": "ತ್ವರಿತ ಕ್ರಮಗಳು",
    "home.quickActionsDesc": "ಸೆಕೆಂಡುಗಳಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ",
    "home.liveActivity": "ಲೈವ್ ಚಟುವಟಿಕೆ ಫೀಡ್",
    "home.recentScans": "ವಿಶ್ವದಾದ್ಯಂತ ರೈತರಿಂದ ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್‌ಗಳು",
    "home.features": "ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು",
    "home.50diseases": "ಬೆಳೆ ರೋಗಗಳು",
    "home.20crops": "20+ ಬೆಳೆ ಪ್ರಕಾರಗಳಲ್ಲಿ",
    "home.3seconds": "ವಿಶ್ಲೇಷಣೆ ಸಮಯ",
    "home.realtime": "ನೈಜ-ಸಮಯ ಪ್ರಕ್ರಿಯೆ",
    "home.multilingual": "ಭಾಷೆಗಳು ಬೆಂಬಲಿತ",
    "home.globalreach": "ಜಾಗತಿಕ ವ್ಯಾಪ್ತಿ",
    "toast.cameraReady": "🎥 ಕ್ಯಾಮರಾ ಸಿದ್ಧ!",
    "toast.cameraDesc": "ನೈಜ-ಸಮಯ ಸ್ಕ್ಯಾನ್‌ಗಾಗಿ ಕ್ಯಾಮೆರಾ ತೆರೆಯುತ್ತಿದೆ...",
    "toast.uploadReady": "📤 ಅಪ್‌ಲೋಡ್ ಸಿದ್ಧ!",
    "toast.uploadDesc": "ಬ್ಯಾಚ್ ಪ್ರಕ್ರಿಯೆಗಾಗಿ ಚಿತ್ರಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ...",
    "badge.live": "ಲೈವ್",
    "badge.batch": "ಬ್ಯಾಚ್",
  },
  mr: {
    "app.name": "अॅग्रीस्कॅन",
    "app.tagline": "तुमच्या बोटांच्या टोकावर AI-चालित पीक रोग शोध",
    "home.welcome": "🌱 अॅग्रीस्कॅनमध्ये आपले स्वागत आहे!",
    "home.scan": "माझी पिके स्कॅन करा",
    "home.upload": "प्रतिमा अपलोड करा",
    "home.database": "डेटाबेस ब्राउझ करा",
    "home.login": "लॉगिन / साइनअप",
    "home.scans": "स्कॅन पूर्ण",
    "home.accuracy": "AI अचूकता",
    "home.users": "सक्रिय वापरकर्ते",
    "home.quickActions": "त्वरित क्रिया",
    "home.quickActionsDesc": "सेकंदात तुमच्या पिकांचे विश्लेषण सुरू करा",
    "home.liveActivity": "लाइव्ह अॅक्टिव्हिटी फीड",
    "home.recentScans": "जगभरातील शेतकऱ्यांकडून अलीकडील स्कॅन",
    "home.features": "मुख्य वैशिष्ट्ये",
    "home.50diseases": "पीक रोग",
    "home.20crops": "20+ पीक प्रकारांमध्ये",
    "home.3seconds": "विश्लेषण वेळ",
    "home.realtime": "रिअल-टाइम प्रक्रिया",
    "home.multilingual": "भाषा समर्थित",
    "home.globalreach": "जागतिक पोहोच",
    "toast.cameraReady": "🎥 कॅमेरा तयार!",
    "toast.cameraDesc": "रिअल-टाइम स्कॅनसाठी कॅमेरा उघडत आहे...",
    "toast.uploadReady": "📤 अपलोड तयार!",
    "toast.uploadDesc": "बॅच प्रक्रियेसाठी प्रतिमा निवडा...",
    "badge.live": "लाइव्ह",
    "badge.batch": "बॅच",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
