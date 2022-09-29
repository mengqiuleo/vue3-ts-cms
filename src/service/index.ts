/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 15:35:12
 * @LastEditTime: 2022-09-29 17:22:24
 */
import MYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { MYRequestConfig } from './request/type'

import localCache from '@/utils/cache'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //# 这里的拦截器是我们自己传入的拦截器，不是封装给的拦截器
  // 而且这些拦截器世这个实例的所有接口请求的拦截器
  interceptors: {
    requestInterceptor: (config: MYRequestConfig) => {
      //#携带token的拦截
      const token = localCache.getCache('token')
      //# 注意这里！！！ 还要加上判断 config.headers
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})

export default myRequest
