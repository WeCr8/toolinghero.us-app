import { ref, computed, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const user = ref(null)
const isLoading = ref(true)
const isLocked = ref(false) // Use this to disable UI if session expires or plan is restricted

export function useUserSession() {
  const auth = getAuth()

  onMounted(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      isLoading.value = false
      // Optionally lock session if user is null or missing required plan/license
      if (!firebaseUser) {
        isLocked.value = true
      }
    })
  })

  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || '')
  const userUid = computed(() => user.value?.uid || '')

  return {
    user,
    isLoading,
    isLocked,
    isAuthenticated,
    userEmail,
    userUid
  }
}