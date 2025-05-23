import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/main.css'

import { initializeFirebase } from '@/services/cloud-firebase/init' // ✅ Initialize Firebase safely
import { registerGlobalDirectives } from '@/directives' // ✅ Optional custom Vue directives
import { createPinia } from 'pinia' // Optional state management
import { injectAppPlugins } from '@/plugins' // Your own custom Vue plugins

const app = createApp(App)

// 🔐 Firebase (safe to run even if already initialized)
initializeFirebase()

// 🔧 Plugins
app.use(router)
app.use(createPinia()) // 💾 Replace with your state system if needed
injectAppPlugins(app) // ⚙️ ToolingHero-specific UI or service plugins

// 🧩 Global Directives (e.g., v-click-outside)
registerGlobalDirectives(app)

// 🧪 Global Error Handler
app.config.errorHandler = (err) => {
  console.error('💥 Global error:', err)
  // Optionally: send to Sentry, Firebase Crashlytics, etc.
}

app.mount('#app')
