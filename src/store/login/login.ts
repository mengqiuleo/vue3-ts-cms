/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-26 10:07:29
 * @LastEditTime: 2022-08-12 18:14:12
 */
import { Module } from 'vuex'

import { accountLoginRequest } from '@/service/login/login'

import { IAccount } from '@/service/login/type'

import { ILoginState } from './type'
import { IRootState } from '../type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      console.log(token)
      state.token = token
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log('执行accountLoginAction', payload)
      // 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      console.log(loginResult.data.id, loginResult.data.token)
      const { token } = loginResult.data
      commit('changeToken', token)
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
