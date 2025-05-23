import { ref } from 'vue'

// Helper to safely access bluetooth property on navigator
function getBluetooth() {
  return (
    navigator as unknown as {
      bluetooth?: { requestDevice?: (options: unknown) => Promise<{ name?: string }> }
    }
  ).bluetooth
}

export function useBLE() {
  const nearbyDevices = ref<string[]>([])
  const isScanning = ref(false)
  const error = ref<string | null>(null)

  // Scan for BLE devices (Web Bluetooth API)
  const scan = async () => {
    error.value = null
    const bluetooth = getBluetooth()
    if (!bluetooth || typeof bluetooth.requestDevice !== 'function') {
      error.value = 'BLE not supported on this browser/device.'
      return
    }
    isScanning.value = true
    try {
      const device = await bluetooth.requestDevice({
        acceptAllDevices: true,
        // Optionally add filters for mobile/desktop
        // filters: [{ services: ['battery_service'] }]
      })
      nearbyDevices.value.push(device.name || 'Unnamed Device')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'BLE scan failed.'
    } finally {
      isScanning.value = false
    }
  }

  // Simulate scan for desktop/dev environments
  const simulateScan = (deviceName: string) => {
    nearbyDevices.value.push(deviceName)
  }

  return { nearbyDevices, isScanning, error, scan, simulateScan }
}
