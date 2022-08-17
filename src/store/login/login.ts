/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-26 10:07:29
 * @LastEditTime: 2022-08-17 14:58:45
 */
import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { handleUserMenu, mapMenuToPermission } from '@/utils/map-menus'
import router from '@/router'

import { IAccount } from '@/service/login/type'

import { ILoginState } from './type'
import { IRootState } from '../type'
import { RouteRecordRaw } from 'vue-router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      //console.log('保存token', token)
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenu => routes
      const routes = handleUserMenu(userMenus)
      //console.log(routes)

      // 将routes => router.main.children
      routes.forEach((route: RouteRecordRaw) => {
        router.addRoute('main', route)
      })

      //获取用户按钮的权限
      const permissions = mapMenuToPermission(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //console.log('执行store的异步action去登录', payload)
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      console.log(loginResult.data.id, loginResult.data.token)
      const { token, id } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      //console.log('输出用户信息', userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      //console.log('用户菜单：', userMenus)
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.跳到首页
      router.push('/main')
    },
    // 每次首次运行代码时，加载下vuex
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
