/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-26 10:09:13
 * @LastEditTime: 2022-09-28 10:38:28
 */
import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/type'

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
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
