/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 18:27:43
 * @LastEditTime: 2022-08-13 00:50:23
 */
import type { AxiosRequestConfig } from 'axios'

export interface MYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface MYRequestConfig extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors
  showLoading?: boolean
}
