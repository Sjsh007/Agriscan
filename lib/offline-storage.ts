// Enhanced IndexedDB Manager for Offline Storage
const DB_NAME = "AgriScanDB"
const DB_VERSION = 2
const STORES = {
  scans: "scans",
  diseases: "diseases",
  predictions: "predictions",
  sync: "syncQueue"
}

class OfflineStorageManager {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result

        // Scans store
        if (!db.objectStoreNames.contains(STORES.scans)) {
          const scanStore = db.createObjectStore(STORES.scans, { 
            keyPath: "id", 
            autoIncrement: true 
          })
          scanStore.createIndex("timestamp", "timestamp", { unique: false })
          scanStore.createIndex("disease", "disease", { unique: false })
          scanStore.createIndex("synced", "synced", { unique: false })
        }

        // Diseases database store
        if (!db.objectStoreNames.contains(STORES.diseases)) {
          const diseaseStore = db.createObjectStore(STORES.diseases, { 
            keyPath: "id" 
          })
          diseaseStore.createIndex("name", "name", { unique: true })
          diseaseStore.createIndex("category", "category", { unique: false })
        }

        // Predictions store
        if (!db.objectStoreNames.contains(STORES.predictions)) {
          const predStore = db.createObjectStore(STORES.predictions, { 
            keyPath: "id",
            autoIncrement: true
          })
          predStore.createIndex("date", "date", { unique: false })
        }

        // Sync queue store
        if (!db.objectStoreNames.contains(STORES.sync)) {
          const syncStore = db.createObjectStore(STORES.sync, { 
            keyPath: "id",
            autoIncrement: true
          })
          syncStore.createIndex("action", "action", { unique: false })
          syncStore.createIndex("timestamp", "timestamp", { unique: false })
        }
      }
    })
  }

  // Save scan offline
  async saveScan(scanData: any): Promise<number> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.scans], "readwrite")
      const store = transaction.objectStore(STORES.scans)
      
      const scan = {
        ...scanData,
        timestamp: new Date().toISOString(),
        synced: false
      }
      
      const request = store.add(scan)
      request.onsuccess = () => resolve(request.result as number)
      request.onerror = () => reject(request.error)
    })
  }

  // Get all scans
  async getAllScans(): Promise<any[]> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.scans], "readonly")
      const store = transaction.objectStore(STORES.scans)
      const request = store.getAll()
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Get scans count
  async getScansCount(): Promise<number> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.scans], "readonly")
      const store = transaction.objectStore(STORES.scans)
      const request = store.count()
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Save disease data
  async saveDiseaseData(diseases: any[]): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.diseases], "readwrite")
      const store = transaction.objectStore(STORES.diseases)
      
      diseases.forEach(disease => store.put(disease))
      
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    })
  }

  // Get disease by ID
  async getDiseaseById(id: string): Promise<any> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.diseases], "readonly")
      const store = transaction.objectStore(STORES.diseases)
      const request = store.get(id)
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Search diseases
  async searchDiseases(query: string): Promise<any[]> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.diseases], "readonly")
      const store = transaction.objectStore(STORES.diseases)
      const request = store.getAll()
      
      request.onsuccess = () => {
        const results = request.result.filter((disease: any) => 
          disease.name.toLowerCase().includes(query.toLowerCase()) ||
          disease.category?.toLowerCase().includes(query.toLowerCase())
        )
        resolve(results)
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Add to sync queue
  async addToSyncQueue(action: string, data: any): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.sync], "readwrite")
      const store = transaction.objectStore(STORES.sync)
      
      const item = {
        action,
        data,
        timestamp: new Date().toISOString(),
        retries: 0
      }
      
      const request = store.add(item)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Get sync queue
  async getSyncQueue(): Promise<any[]> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.sync], "readonly")
      const store = transaction.objectStore(STORES.sync)
      const request = store.getAll()
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Clear sync queue item
  async clearSyncQueueItem(id: number): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORES.sync], "readwrite")
      const store = transaction.objectStore(STORES.sync)
      const request = store.delete(id)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Get storage usage
  async getStorageInfo(): Promise<any> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
        percentage: estimate.quota ? ((estimate.usage || 0) / estimate.quota * 100).toFixed(2) : 0
      }
    }
    return null
  }

  // Clear old data (keep last 1000 scans)
  async clearOldData(): Promise<void> {
    if (!this.db) await this.init()
    
    const scans = await this.getAllScans()
    if (scans.length > 1000) {
      // Sort by timestamp and keep only latest 1000
      scans.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      const toDelete = scans.slice(1000)
      
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORES.scans], "readwrite")
        const store = transaction.objectStore(STORES.scans)
        
        toDelete.forEach(scan => store.delete(scan.id))
        
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      })
    }
  }
}

export const offlineStorage = new OfflineStorageManager()

// Auto-sync when online
export async function initAutoSync() {
  if (typeof window === "undefined") return

  window.addEventListener("online", async () => {
    console.log("Device is online, starting sync...")
    const queue = await offlineStorage.getSyncQueue()
    
    for (const item of queue) {
      try {
        // Attempt to sync each item
        // You would implement actual API calls here
        console.log(`Syncing: ${item.action}`, item.data)
        
        // If successful, remove from queue
        await offlineStorage.clearSyncQueueItem(item.id)
      } catch (error) {
        console.error(`Sync failed for ${item.action}:`, error)
        // Will retry on next online event
      }
    }
  })

  // Check storage periodically and clean up if needed
  setInterval(async () => {
    const info = await offlineStorage.getStorageInfo()
    if (info && parseFloat(info.percentage) > 80) {
      await offlineStorage.clearOldData()
    }
  }, 3600000) // Check every hour
}
