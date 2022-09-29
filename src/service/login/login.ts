/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-26 11:57:10
 * @LastEditTime: 2022-09-29 19:32:14
 */
import myRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../type'

/**
 * 这里我们可以直接调用class封装的类的实例，因为在service文件夹下的index.ts文件中
 * 我们已经创建出来了一个axios类的实例，那么直接调用对应的方法即可
 */

/**
 * service文件下的文件主要是 定义接口，并且创建请求接口的函数，
 * 每个函数中一般会调用axios实例的get，post方法
 */
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

/**
 * 用户登录的请求接口及请求函数
 * @param account 用户的账号密码
 */
export function accountLoginRequest(account: IAccount) {
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

/**
 * 用户信息请求的接口及请求函数
 * @param id 根据用户id请求用户相关信息
 */
export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

/**
 * @param id 根据用户角色来请求对应菜单
 */
export function requestUserMenusByRoleId(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
