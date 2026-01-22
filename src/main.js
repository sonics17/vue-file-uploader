import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '@/assets/styles/main.css'

createApp(App).use(router).use(createPinia()).mount('#app')
