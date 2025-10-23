"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Wifi, WifiOff, Cloud, CloudOff, Database, 
  HardDrive, RefreshCw, Check, X 
} from "lucide-react"
import { offlineStorage, initAutoSync } from "@/lib/offline-storage"

export function OfflineManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [storageInfo, setStorageInfo] = useState<any>(null)
  const [scansCount, setScansCount] = useState(0)
  const [syncQueue, setSyncQueue] = useState<any[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Initialize offline storage and auto-sync
    offlineStorage.init().then(() => {
      initAutoSync()
      loadData()
    })

    // Listen to online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      loadData()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check initial state
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const loadData = async () => {
    try {
      const info = await offlineStorage.getStorageInfo()
      setStorageInfo(info)

      const count = await offlineStorage.getScansCount()
      setScansCount(count)

      const queue = await offlineStorage.getSyncQueue()
      setSyncQueue(queue)
    } catch (error) {
      console.error("Failed to load offline data:", error)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000))
      await loadData()
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setIsSyncing(false)
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Compact Status Button */}
      <Button
        onClick={() => setShowDetails(!showDetails)}
        className={`rounded-full shadow-2xl transition-all transform hover:scale-110 relative overflow-hidden group ${
          isOnline 
            ? "bg-green-500 hover:bg-green-600 glow-green" 
            : "bg-red-500 hover:bg-red-600 animate-pulse glow"
        }`}
        size="lg"
        title={isOnline ? "Online" : "Offline Mode"}
      >
        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity ${
          isOnline 
            ? "bg-gradient-to-r from-green-400 to-emerald-500" 
            : "bg-gradient-to-r from-red-400 to-orange-500"
        }`}></div>
        {isOnline ? (
          <Wifi className="h-5 w-5 relative z-10" />
        ) : (
          <WifiOff className="h-5 w-5 relative z-10" />
        )}
        {syncQueue.length > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-white text-black text-xs rounded-full font-semibold shadow-md animate-bounce-subtle">
            {syncQueue.length}
          </span>
        )}
      </Button>

      {/* Detailed Status Panel */}
      {showDetails && (
        <Card className="absolute bottom-16 left-0 p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-2xl w-80 animate-slide-up card-glass border-2 border-gray-200 dark:border-gray-700 holographic">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Offline Mode</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {isOnline ? (
                <>
                  <div className="p-2 bg-green-500 rounded-full">
                    <Wifi className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-green-600">Online</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Connected to internet</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-red-500 rounded-full animate-pulse">
                    <WifiOff className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-red-600">Offline</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Working offline</p>
                  </div>
                </>
              )}
            </div>

            {/* Storage Info */}
            {storageInfo && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Storage Used</span>
                  <span className="font-semibold">{storageInfo.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(parseFloat(storageInfo.percentage), 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {formatBytes(storageInfo.usage)} / {formatBytes(storageInfo.quota)}
                </p>
              </div>
            )}

            {/* Offline Data Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Database className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Scans</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{scansCount}</p>
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CloudOff className="h-4 w-4 text-orange-600" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">To Sync</span>
                </div>
                <p className="text-xl font-bold text-orange-600">{syncQueue.length}</p>
              </div>
            </div>

            {/* Sync Button */}
            {isOnline && syncQueue.length > 0 && (
              <Button
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Now ({syncQueue.length})
                  </>
                )}
              </Button>
            )}

            {/* Features */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Full offline scanning</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">10,000+ scans storage</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Auto-sync when online</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
