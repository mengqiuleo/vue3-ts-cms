/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 22:16:15
 * @LastEditTime: 2022-08-15 22:28:43
 */
import myRequest from '@/service'
import { IDataType } from '../../type'

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
