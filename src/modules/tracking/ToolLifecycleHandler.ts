import { useDarnLogger } from '.modules/tracking/useDarnLogger'
import { useAllTrackers } from '.modules/tracking/useTrackingHooks'

export function handleToolLifecycle(toolId: string) {
  const { addLog } = useDarnLogger()
  const { ble, rfid, gps } = useAllTrackers()

  const checkIn = async () => {
    addLog({ toolId, action: 'checked-in', timestamp: new Date().toISOString() })
    // Optionally sync tracking state
    await Promise.all([
      ble.scan?.(),
      rfid.startMobileScan?.(), // Prefer mobile scan if available, fallback to simulateScan
      gps.getCurrentLocation?.(),
    ])
  }

  const checkOut = async () => {
    addLog({ toolId, action: 'checked-out', timestamp: new Date().toISOString() })
    // Trigger status refresh
    await Promise.all([ble.scan?.(), rfid.startMobileScan?.(), gps.getCurrentLocation?.()])
  }

  const startTracking = () => {
    ble.scan?.()
    rfid.startMobileScan?.()
    gps.startTracking?.()
  }

  const stopTracking = () => {
    // BLE: no stopTracking, just clear scanning state if present
    if (ble.isScanning && ble.isScanning.value) {
      ble.isScanning.value = false
    }
    // RFID: no stopTracking, just clear isScanning if present
    if (rfid.isScanning && rfid.isScanning.value) {
      rfid.isScanning.value = false
    }
    // GPS: stopTracking if available
    gps.stopTracking?.()
  }

  return { checkIn, checkOut, startTracking, stopTracking }
}
