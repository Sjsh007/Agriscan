"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, X, Mic, Send, Volume2 } from "lucide-react"

export default function AgriBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Hello! I'm AgriBot. How can I help you with your crops today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [useVoiceResponse, setUseVoiceResponse] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [speechSupported, setSpeechSupported] = useState(false)

  useEffect(() => {
    // Check if speech recognition is supported
    setSpeechSupported("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      const userMessage = input.trim()
      const shouldUseVoice = useVoiceResponse // Capture voice flag before clearing
      setMessages([...messages, { text: userMessage, sender: "user" }])
      setUseVoiceResponse(false) // Reset voice flag

      // Simulate bot response (in a real app, this would call an AI service)
      setTimeout(() => {
        let botResponse = "I'm here to help! Let me assist you with that."

        const lowerInput = userMessage.toLowerCase()

        // Enhanced pattern matching for better interactivity
        if (lowerInput.includes("tomato") || lowerInput.includes("tomatoes")) {
          if (lowerInput.includes("spot") || lowerInput.includes("spots") || lowerInput.includes("black")) {
            botResponse =
              "It sounds like your tomatoes might have early blight or septoria leaf spot. These fungal diseases cause dark spots on leaves. I recommend: 1) Remove affected leaves immediately, 2) Apply neem oil or copper fungicide, 3) Water at the base to avoid wetting leaves. Would you like more details?"
          } else if (lowerInput.includes("yellow")) {
            botResponse =
              "Yellowing tomato leaves can indicate nutrient deficiency (nitrogen), overwatering, or fusarium wilt. Check if: 1) Soil is too wet, 2) Lower leaves turning yellow (normal aging), 3) Wilting with yellow leaves (disease). What other symptoms do you see?"
          } else {
            botResponse =
              "Tomatoes are susceptible to various diseases. Can you describe the symptoms? Are there spots, yellowing, wilting, or discoloration on leaves or fruits?"
          }
        } else if (lowerInput.includes("wheat") || lowerInput.includes("rice") || lowerInput.includes("grain")) {
          if (lowerInput.includes("rust") || lowerInput.includes("orange") || lowerInput.includes("brown")) {
            botResponse =
              "Rust diseases are common in cereals, appearing as orange-brown pustules. For wheat rust: 1) Use resistant varieties, 2) Apply fungicides early, 3) Remove volunteer plants. For rice blast: similar symptoms need immediate attention with fungicide treatment."
          } else {
            botResponse =
              "Cereal crops face diseases like rust, blast, and smut. What symptoms are you noticing? Color changes, spots, or stunted growth?"
          }
        } else if (lowerInput.includes("white") || lowerInput.includes("bug") || lowerInput.includes("insect")) {
          botResponse =
            "White insects could be whiteflies, aphids, or mealybugs. Quick solutions: 1) Spray with neem oil solution (2 tbsp per gallon), 2) Use insecticidal soap, 3) Introduce natural predators like ladybugs, 4) Yellow sticky traps. For severe infestations, use imidacloprid. Need specific pest control recommendations?"
        } else if (lowerInput.includes("mildew") || lowerInput.includes("powder") || lowerInput.includes("white coating")) {
          botResponse =
            "Powdery mildew appears as white powdery coating on leaves. It thrives in humid conditions. Treatment: 1) Spray with baking soda solution (1 tsp + 1 qt water + few drops dish soap), 2) Improve air circulation, 3) Apply sulfur-based fungicide, 4) Remove heavily infected leaves. Prevention: avoid overhead watering."
        } else if (lowerInput.includes("cucumber") || lowerInput.includes("melon") || lowerInput.includes("squash")) {
          botResponse =
            "Cucurbits commonly face powdery mildew, downy mildew, and cucumber mosaic virus. What symptoms are you seeing? White powder, yellow spots, mosaic patterns on leaves, or wilting?"
        } else if (lowerInput.includes("blight") || lowerInput.includes("wilting") || lowerInput.includes("wilt")) {
          botResponse =
            "Blight and wilting can be bacterial or fungal. Early blight shows concentric rings, late blight causes water-soaked lesions. For bacterial wilt: no cure, remove infected plants. For fungal: apply copper fungicide, improve drainage, practice crop rotation. Is the wilting sudden or gradual?"
        } else if (lowerInput.includes("leaf") && lowerInput.includes("curl")) {
          botResponse =
            "Leaf curling can indicate: 1) Viral infection (tomato leaf curl virus), 2) Aphid damage, 3) Herbicide drift, 4) Environmental stress (heat/water). Check for pests first. If viral: remove infected plants, control whiteflies (vectors). Need help identifying the cause?"
        } else if (lowerInput.includes("spray") || lowerInput.includes("pesticide") || lowerInput.includes("fungicide")) {
          botResponse =
            "For organic options: neem oil, copper fungicide, sulfur, horticultural oil. For chemical: chlorothalonil (fungus), imidacloprid (insects), mancozeb (broad spectrum). Always: 1) Read labels, 2) Wear protection, 3) Spray early morning/evening, 4) Rotate products to prevent resistance. What crop are you treating?"
        } else if (lowerInput.includes("prevent") || lowerInput.includes("prevention") || lowerInput.includes("avoid")) {
          botResponse =
            "Best disease prevention practices: 1) Crop rotation (2-3 years), 2) Proper spacing for air flow, 3) Water at base, avoid leaves, 4) Remove plant debris, 5) Use resistant varieties, 6) Mulch to prevent soil splash, 7) Regular monitoring. Which crop are you growing?"
        } else if (lowerInput.includes("organic") || lowerInput.includes("natural")) {
          botResponse =
            "Organic disease control options: 1) Neem oil (fungus + insects), 2) Copper fungicide, 3) Bacillus thuringiensis (caterpillars), 4) Diatomaceous earth (insects), 5) Compost tea (beneficial microbes), 6) Garlic/chili spray. These are safe and effective. What's your specific concern?"
        } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
          botResponse =
            "Hello! 👋 I'm AgriBot, your farming assistant. I can help you with: disease identification, treatment recommendations, pest control, organic solutions, and prevention tips. What crop are you working with?"
        } else if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
          botResponse =
            "You're welcome! 🌱 Feel free to ask me anything about your crops. I'm here to help you grow healthy plants. Good luck with your farming!"
        } else if (lowerInput.includes("help") || lowerInput.includes("what can you do")) {
          botResponse =
            "I can help you with: 🌿 Disease identification, 💊 Treatment suggestions (organic & chemical), 🐛 Pest control, 🛡️ Prevention strategies, 📚 Crop-specific advice, 🌾 Best practices. Just describe your crop issue and I'll guide you!"
        } else {
          botResponse =
            "I'm processing your question. Could you provide more details? For example: Which crop? What symptoms (spots, yellowing, wilting)? Any pests visible? This will help me give you accurate advice. You can also use the Scan feature to analyze crop images!"
        }

        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }])

        // Text-to-speech ONLY if message came from voice input
        if (shouldUseVoice && "speechSynthesis" in window) {
          const speech = new SpeechSynthesisUtterance(botResponse)
          speech.lang = localStorage.getItem("language") || "en"
          window.speechSynthesis.speak(speech)
        }
      }, 1000)

      setInput("")
    }
  }

  const handleVoiceInput = () => {
    if (!speechSupported) return

    setIsRecording(true)
    setUseVoiceResponse(true) // Set flag for voice response

    // Use Web Speech API for voice recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = localStorage.getItem("language") || "en"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => {
      setIsRecording(false)
      setUseVoiceResponse(false) // Reset if error
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel() // Stop any current speech
      const speech = new SpeechSynthesisUtterance(text)
      speech.lang = localStorage.getItem("language") || "en"
      window.speechSynthesis.speak(speech)
    }
  }

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        } transition-all duration-300 z-50`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 sm:w-96 h-[500px] shadow-xl z-40 flex flex-col overflow-hidden border-green-200">
          <div className="bg-green-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">AgriBot</span>
            </div>
            <span className="text-xs bg-green-700 px-2 py-1 rounded-full">Farmer Buddy</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-green-600 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none"
                  }`}
                >
                  {message.text}
                  {message.sender === "bot" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1 opacity-70 hover:opacity-100"
                      onClick={() => speakMessage(message.text)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`flex-shrink-0 ${isRecording ? "bg-red-100 text-red-500 animate-pulse" : ""}`}
                onClick={handleVoiceInput}
                disabled={!speechSupported}
              >
                <Mic className="h-4 w-4" />
              </Button>

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <Button
                variant="default"
                size="icon"
                className="flex-shrink-0 bg-green-600 hover:bg-green-700"
                onClick={handleSend}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

