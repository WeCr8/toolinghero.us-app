import { ref, computed, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

const user = ref<User | null>(null)
const userProfile = ref<Record<string, unknown> | null>(null)
const isLoading = ref(true)
const isLocked = ref(false)

export function useUserSession() {
  const auth = getAuth()
  const db = getFirestore()

  async function fetchUserProfile(uid: string) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      userProfile.value = userDoc.exists() ? userDoc.data() : null
    } catch {
      userProfile.value = null
    }
  }

  onMounted(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser
      isLoading.value = false
      if (!firebaseUser) {
        isLocked.value = true
        userProfile.value = null
      } else {
        isLocked.value = false
        await fetchUserProfile(firebaseUser.uid)
      }
    })
  })

  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email ?? '')
  const userUid = computed(() => user.value?.uid ?? '')

  return {
    user,
    userProfile,
    isLoading,
    isLocked,
    isAuthenticated,
    userEmail,
    userUid,
  }
}
