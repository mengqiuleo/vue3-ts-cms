/*
 * @Author: Pan Jingyi
 * @Date: 2022-10-30 19:06:19
 * @LastEditTime: 2022-10-31 18:35:23
 */
import myRequest from '@/service'
import { IDataType } from '../../type'
interface IArticlesDataType {
  title: string
  content: string
}
export function publishArticlesData(articlesData: IArticlesDataType) {
  return myRequest.post<IDataType>({
    url: '/story',
    data: articlesData
  })
}
export function getArticlesData(payload: any) {
  return myRequest.post<IDataType>({
    url: '/story/list',
    data: payload
  })
}
