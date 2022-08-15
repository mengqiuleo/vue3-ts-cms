/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 06:33:45
 * @LastEditTime: 2022-08-15 22:05:44
 */
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import system from './main/system/system'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'Pan',
      age: 18
    }
  },
  modules: {
    login,
    system
  }
})

// 解决刷新问题，初始化 vuex
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
