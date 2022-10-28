/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 21:58:38
 * @LastEditTime: 2022-10-01 08:19:33
 */
import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './type'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentCount: 0,
      departmentList: [],
      categoryCount: 0,
      categoryList: [],
      storyCount: 0,
      storyList: []
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    changeDepartmentCount(state, totalCount: number) {
      state.departmentCount = totalCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeCategoryCount(state, totalCount: number) {
      state.categoryCount = totalCount
    },
    changeCategoryList(state, roleList: any) {
      state.categoryList = roleList
    },
    changeStoryCount(state, totalCount: number) {
      state.storyCount = totalCount
    },
    changeStoryList(state, storyList: any) {
      state.storyList = storyList
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 获取列表数据，并存储在 store中
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      //console.log('payload', payload)
      let pageName = ''
      if (payload.pageName) {
        pageName = payload.pageName
      } else {
        pageName = payload.pageUrl
      }
      const pageUrl = `/${pageName}/list`
      // 2.对页面发送请求
      console.log('发送请求url: ', pageUrl)
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存放到 state 中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      // dispatch：执行actions
      dispatch('getPageListAction', {
        pageName,
        pageUrl: `/${pageName}/list`,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      console.log('创建url: ', pageUrl)
      await createPageData(pageUrl, newData)

      dispatch('getPageListAction', {
        pageName,
        pageUrl: `/${pageName}/list`,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      console.log('编辑url: ', pageUrl)
      await editPageData(pageUrl, editData)

      dispatch('getPageListAction', {
        pageName,
        pageUrl: `/${pageName}/list`,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
