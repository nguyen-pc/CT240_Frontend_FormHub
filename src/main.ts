import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
