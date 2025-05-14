// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'

// Global styles
import '@/assets/css/main.css'

// Firebase init (optional if you’re using auth or Firestore early)
import '@/services/firebase/init'

const app = createApp(App)

// 🧠 Global stores + plugins
app.use(createPinia())

// 🌐 Router
app.use(router)

// 🧠 Meta tags (for SEO/PWA)
const head = createHead()
app.use(head)

// 🔁 Mount when ready
app.mount('#app')
