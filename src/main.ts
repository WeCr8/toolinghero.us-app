import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/main.css' // 🧩 Optional global styles

const app = createApp(App)
app.use(router)
app.mount('#app')
