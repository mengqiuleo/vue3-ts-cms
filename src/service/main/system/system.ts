/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 22:16:15
 * @LastEditTime: 2022-09-29 17:29:44
 */
import myRequest from '@/service'
import { IDataType } from '../../type'

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IDataType>({
    url: url,
    data: queryInfo,
    // # 这里就是针对一个实例的某个接口的拦截器
    interceptors: {
      requestInterceptor: (config: any) => {
        return config
      },
      responseInterceptor: (err: any) => {
        return err
      }
    }
  })
}

export function deletePageData(url: string) {
  return myRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return myRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return myRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
