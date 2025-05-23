import { useBLE } from '@/composables/useBLE'
import { useRFID } from '@/composables/useRFID'
import { useGPS } from '@/composables/useGPS'

export function useAllTrackers() {
  const ble = useBLE()
  const rfid = useRFID()
  const gps = useGPS()

  return { ble, rfid, gps }
}
