/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 03:51:07
 * @LastEditTime: 2022-10-29 12:59:08
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

// 注意：要让setupStore()放在app.use(router)的上面，这样进行路由匹配时才能匹配到，要不然会跳到not found
// 解决刷新出现not found的问题
setupStore() // 意思是每次首次运行代码都会去调一下vuex
app.use(router)
app.use(store)
app.mount('#app')

console.log(process.env)
