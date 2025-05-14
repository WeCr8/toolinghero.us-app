import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Tailwind & global styles
import './assets/css/main.css'

// Mount app
const app = createApp(App)
app.use(router)
app.mount('#app')
