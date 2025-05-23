import { ref, onUnmounted } from 'vue'

export function useGPS() {
  const coords = ref<{ lat: number; lng: number } | null>(null)
  const error = ref<string | null>(null)
  const isTracking = ref(false)
  let watchId: number | null = null

  // Try to use Permissions API for better UX (if available)
  const checkPermission = async () => {
    // Use built-in types, avoid redeclaring global interfaces
    if (navigator.permissions && typeof navigator.permissions.query === 'function') {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' })
        if (result.state === 'denied') {
          error.value = 'Location permission denied.'
          return false
        }
      } catch {
        // Permissions API not fully supported
      }
    }
    return true
  }

  const startTracking = async () => {
    error.value = null
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser.'
      return
    }
    const allowed = await checkPermission()
    if (!allowed) return
    isTracking.value = true
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        error.value = null
      },
      (err) => {
        error.value = err.message
        isTracking.value = false
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      watchId = null
      isTracking.value = false
    }
  }

  onUnmounted(stopTracking)

  // Mobile: fallback to one-time getCurrentPosition if needed
  const getCurrentLocation = () => {
    error.value = null
    if (!navigator.geolocation) {
      error.value = 'Geolocation is not supported by your browser.'
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        error.value = null
      },
      (err) => {
        error.value = err.message
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  return { coords, error, isTracking, startTracking, stopTracking, getCurrentLocation }
}
