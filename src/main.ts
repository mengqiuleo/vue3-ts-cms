import { createApp } from 'vue'
import { registerApp } from './global'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import router from './router'
import store from './store'

import myRequest from './service'

const app = createApp(App)

registerApp(app)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

// myRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     // # 对每个请求单独的拦截，一般不会用到
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独请求的config')
//       return res
//     }
//   }
// })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

myRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: true
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
