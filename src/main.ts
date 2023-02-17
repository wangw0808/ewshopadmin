import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from'./router'
// 引入css样式
import '@/styles/tailwind.css'
import '@/styles/index.css'
// 导入pinia
import {createPinia} from 'pinia'
const app = createApp(App)
// 创建pinia实例
const pinia = createPinia()
// 创建并挂载实例
app.use(router)
// 挂载pinia
app.use(pinia)
app.mount('#app')
