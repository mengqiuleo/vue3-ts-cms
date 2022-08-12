/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 03:51:07
 * @LastEditTime: 2022-08-12 18:13:17
 */
import { createApp } from 'vue'
import { registerApp } from './global'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import router from './router'
import store from './store'

//import myRequest from './service'

const app = createApp(App)

registerApp(app)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// myRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
