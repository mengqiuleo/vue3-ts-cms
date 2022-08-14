/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 23:13:32
 * @LastEditTime: 2022-08-15 00:02:26
 */
import { RouteRecordRaw } from 'vue-router'

let firstMenuPath: any = ''

export function handleUserMenu(userMenus: any): RouteRecordRaw[] {
  // 1.定义所有路由存储
  const allRoutes: RouteRecordRaw[] = []

  // 2.遍历所有路由
  const routeFiles = require.context('../router/main', true, /\.ts$/)
  //console.log(routeFiles)
  routeFiles.keys().forEach((element) => {
    const routePath = require('../router/main' + element.split('.')[1])
    allRoutes.push(routePath.default)
  })
  //console.log(allRoutes, 'allRoutes')

  // 3.定义返回值数组
  const routes: RouteRecordRaw[] = []

  // 4.定义递归数组方法
  const _recurseGetRoute = function (menus: any) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenuPath) {
          firstMenuPath = route?.path
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  // 5.调用递归函数
  _recurseGetRoute(userMenus)

  return routes
}
