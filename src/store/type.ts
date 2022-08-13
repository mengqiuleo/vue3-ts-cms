/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-26 10:09:13
 * @LastEditTime: 2022-08-13 18:47:10
 */
import { ILoginState } from './login/type'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
