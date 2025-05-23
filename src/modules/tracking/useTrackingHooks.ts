import { useBLE } from '@/composables/useBLE'
import { useRFID } from '@/composables/useRFID'
import { useGPS } from '@/composables/useGPS'

declare global {
  interface Window {
    _toolingHeroTrackers?: {
      ble: ReturnType<typeof useBLE>
      rfid: ReturnType<typeof useRFID>
      gps: ReturnType<typeof useGPS>
    }
  }
}

export function useAllTrackers() {
  // Memoize tracker composables so they are not recreated on every call
  // This ensures state is shared across the app
  if (!window._toolingHeroTrackers) {
    window._toolingHeroTrackers = {
      ble: useBLE(),
      rfid: useRFID(),
      gps: useGPS(),
    }
  }
  const { ble, rfid, gps } = window._toolingHeroTrackers
  return { ble, rfid, gps }
}
