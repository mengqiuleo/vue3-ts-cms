import MYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { MYRequestConfig } from './request/type'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: MYRequestConfig) => {
      //#携带token的拦截
      const token = ''
      //# 注意这里！！！ 还要加上判断 config.headers
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('请求失败的拦截')
      return error
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (error) => {
      console.log('响应失败的拦截')
      return error
    }
  }
})

export default myRequest
