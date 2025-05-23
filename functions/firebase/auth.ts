import { ref, onUnmounted, computed } from 'vue'
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  type User,
} from 'firebase/auth'
import { auth } from './init'

const currentUser = ref<User | null>(null)

// Subscribe to auth changes once
const unsubscribe = onAuthStateChanged(auth, (user) => {
  currentUser.value = user
})

// Optional cleanup for component usage
onUnmounted(() => {
  unsubscribe()
})

export function useAuth() {
  return {
    currentUser,
    isLoggedIn: computed(() => !!currentUser.value),
    login,
    register,
    logout,
  }
}

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  return signOut(auth)
}

export function watchAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
