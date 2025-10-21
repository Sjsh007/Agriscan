"use client"

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Leaf Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 opacity-20">
        <div className="floating-leaf text-6xl">🌿</div>
      </div>
      
      <div className="absolute top-40 right-20 w-16 h-16 opacity-15">
        <div className="floating-slow text-5xl" style={{ animationDelay: "1s" }}>🌱</div>
      </div>
      
      <div className="absolute bottom-32 left-1/4 w-24 h-24 opacity-10">
        <div className="floating-leaf text-7xl" style={{ animationDelay: "2s" }}>🍃</div>
      </div>
      
      <div className="absolute top-1/3 right-1/4 w-16 h-16 opacity-20">
        <div className="floating-slow text-5xl" style={{ animationDelay: "3s" }}>🌾</div>
      </div>

      <div className="absolute bottom-20 right-32 w-20 h-20 opacity-15">
        <div className="floating-leaf text-6xl" style={{ animationDelay: "1.5s" }}>🌿</div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-green-500/5 rounded-full blur-3xl pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-teal-500/5 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "3s" }}></div>

      {/* Animated Gradient Circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-full blur-3xl rotate-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-cyan-600/10 rounded-full blur-3xl rotate-slow" style={{ animationDelay: "5s" }}></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
    </div>
  )
}
