/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 23:13:32
 * @LastEditTime: 2022-08-17 14:56:55
 */
import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        if (!firstMenu) {
          firstMenu = menu
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

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenuToPermission(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function menuMapLeafKeys(userMenus: any): any {
  const leftKeys: number[] = []
  console.log(userMenus)
  const _recurseGetMenu = (menus: any): any => {
    for (const item of menus) {
      if (item.type === 1) {
        _recurseGetMenu(item.children ?? [])
      } else {
        leftKeys.push(item.id)
      }
    }
  }
  _recurseGetMenu(userMenus)
  return leftKeys
}

export { firstMenu }
