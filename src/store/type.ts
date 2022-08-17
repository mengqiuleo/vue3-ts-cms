/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-26 10:09:13
 * @LastEditTime: 2022-08-18 02:20:30
 */
import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'

export interface IRootState {
  name?: string
  age?: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
