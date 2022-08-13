/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 03:51:07
 * @LastEditTime: 2022-08-13 16:49:12
 */
import { createApp } from 'vue'
import { registerApp } from './global'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

registerApp(app)
app.use(router)
app.use(store)
setupStore() // 意思是每次首次运行代码都会去调一下vuex
app.mount('#app')
