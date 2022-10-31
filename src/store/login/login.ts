/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-26 10:07:29
 * @LastEditTime: 2022-10-31 20:53:07
 */
import { Module } from 'vuex'

// 请求接口的函数
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'
import { handleUserMenu, mapMenuToPermission } from '@/utils/map-menus' //对路由数组进行处理
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
    // 将用户token保存到vuex中
    changeToken(state, token: string) {
      //console.log('保存token', token)
      state.token = token
    },
    // 将用户信息存储到vuex中
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 存储用户菜单相关信息
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 下面就是将userMenus菜单添加到路由中
      //# userMenu => routes
      const routes = handleUserMenu(userMenus)
      // console.log('routes: ', routes)

      // 将routes => router.main.children
      // 前面还在疑惑，注册的所有页面的路由放在哪里注册？ 就是在这里用：并且要注意我们的所有页面的路由应该是main组件的子路由
      routes.forEach((route: RouteRecordRaw) => {
        router.addRoute('main', route)
      })

      //获取用户按钮的权限
      const permissions = mapMenuToPermission(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //console.log('执行store的异步action去登录', payload)
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload) //这里的await的函数都会包含着对应的后端请求路径
      // console.log(loginResult)
      // 登录：向后端发送请求，返回的是用户id和token
      // console.log(loginResult.data.id, loginResult.data.token)
      const { token, id } = loginResult.data
      commit('changeToken', token) //token保存到vuex中
      localCache.setCache('token', token) //token保存到localStorage中
      //为什么token要在vuex中保存，还要在localStorage中保存？
      //因为vuex刷新会丢失，所以还要在localStorage中保存

      // 发起初始化请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id) //也是包含着对应后端的请求路径
      //console.log('输出用户信息', userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo) //同上，将用户信息存在vuex和本地
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单 --> 根据用户角色请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id) //包含着对应后端的请求路径
      const userMenus = userMenusResult.data
      //console.log('用户菜单：', userMenus)
      // 我们只是拿到菜单了，但是还需要拿到一个路由数组，这个路由数组的实现过程会在commit中体现
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.跳到首页
      router.push('/main')
    },

    //# 每次首次运行代码时，加载下vuex
    // 解决每次刷新vuex数据消失问题
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        // 为什么这里频繁commit呢？
        // 因为vuex刷新后丢失，commit操作是在将localStorage中保存的数据再次存入vuex中
        commit('changeToken', token)

        // 发起初始化请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
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
