/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 06:33:45
 * @LastEditTime: 2022-08-13 16:49:12
 */
import { createStore } from 'vuex'
import { IRootState } from './type'

import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'Pan',
      age: 18
    }
  },
  modules: {
    login
  }
})

// 解决刷新问题，初始化 vuex
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
