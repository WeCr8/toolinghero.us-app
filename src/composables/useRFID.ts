import { ref } from 'vue'

// Type definitions for Web NFC API (limited, for TS safety)
declare global {
  interface Window {
    NDEFReader?: {
      new (): NDEFReader
    }
  }
  interface NDEFReader {
    scan(): Promise<void>
    onreading: ((event: NDEFReadingEvent) => void) | null
    onerror: ((event: Event) => void) | null
  }
  interface NDEFReadingEvent extends Event {
    serialNumber?: string
  }
}

export function useRFID() {
  const lastScan = ref<string>('')
  const isScanning = ref(false)
  const scanHistory = ref<string[]>([])

  // Simulate a scan (for dev/testing or desktop)
  const simulateScan = (tagId: string) => {
    lastScan.value = tagId
    scanHistory.value.push(tagId)
    isScanning.value = false
    console.log('RFID tag scanned:', tagId)
  }

  // For mobile: listen to NFC events if available
  const startMobileScan = async () => {
    if ('NDEFReader' in window) {
      try {
        isScanning.value = true
        const ndef = new window.NDEFReader!()
        await ndef.scan()
        ndef.onreading = (event: NDEFReadingEvent) => {
          const tagId = event.serialNumber || 'UnknownTag'
          lastScan.value = tagId
          scanHistory.value.push(tagId)
          isScanning.value = false
          console.log('NFC tag scanned:', tagId)
        }
        ndef.onerror = (error: Event) => {
          isScanning.value = false
          console.error('NFC scan error:', error)
        }
      } catch (err) {
        isScanning.value = false
        console.error('NFC scan failed:', err)
      }
    } else {
      console.warn('NFC scanning not supported on this device/browser.')
    }
  }

  return { lastScan, scanHistory, isScanning, simulateScan, startMobileScan }
}
