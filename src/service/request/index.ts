import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MYRequestInterceptors, MYRequestConfig } from './type'

import { ElLoading } from 'element-plus/lib/index'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class MYRequest {
  instance: AxiosInstance //一个属性(这个属性就是axios身上自带的)，用来存放我们传入的配置
  interceptors?: MYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: MYRequestConfig) {
    // config是我们自己传入的配置
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    //# 从config中取出的拦截器是每个实例自己的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //# 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        // 添加loading组件
        if (this.loading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err: any) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close()

        // 例子2：利用后端的判断码进行判断
        const data = res.data //res.data才是我们真正返回的数据，这里我们拿到真正需要的数据即可，没必要拿到所有的数据
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 移除loading
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  // 封装的这个request方法可以让我们传入请求的方式，那么下面封装真正的get,post,patch...方法就会便捷很多
  request<T = any>(config: MYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      //# 如果某个实例的某个请求有拦截器，那就先调一下这个实例的针对这个请求的拦截器(这里是请求拦截器)
      // 针对某个实例的某个接口有拦截器的例子放在最下面
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance //this.instance 其实是根据我们传入的配置创造出来的一个axios实例
        .request<any, T>(config)
        .then((res) => {
          //# 每个实例针对某个接口的响应拦截器(响应拦截器)
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MYRequest

/**
 * 针对一个实例的某个接口有一个拦截器
 */
/*
myRequest.post<IDataType>({
    url: url,
    data: queryInfo,
     # 这里就是针对一个实例的某个接口的拦截器
    interceptors: {
      requestInterceptor: (config: any) => {
        return config
      },
      responseInterceptor: (err: any) => {
        return err
      }
    }
  })
*/
