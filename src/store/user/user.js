export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    tier: 'free', // 'pro', 'enterprise'
  }),
  actions: {
    async fetchUserTier(uid) {
      const userRef = doc(getFirestore(), 'users', uid)
      const snap = await getDoc(userRef)
      this.currentUser = snap.data()
      this.tier = snap.data().tier || 'free'
    },
  },
})
