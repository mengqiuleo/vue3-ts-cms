/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 23:13:32
 * @LastEditTime: 2022-09-30 19:54:21
 */
import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

/**
 * 将后端菜单数据转换成前端好用的路由数组
 * 该函数默认登录后就会执行
 * @param userMenus：该参数是我们传入的当前用户所拥有的的菜单
 * @returns
 */
export function handleUserMenu(userMenus: any): RouteRecordRaw[] {
  // 1.定义所有路由存储，这里的所有路由指的是前端我们定义的所有页面的路由
  // 然后我们会从这个 所有路由的数组中进行筛选，最后返回该用户可以拥有的路由
  const allRoutes: RouteRecordRaw[] = []

  // 2.遍历所有路由
  const routeFiles = require.context('../router/main', true, /\.ts$/)
  //console.log(routeFiles)
  routeFiles.keys().forEach((element) => {
    const routePath = require('../router/main' + element.split('.')[1])
    allRoutes.push(routePath.default)
  })
  console.log('allRoutes: ', allRoutes)

  // 3.定义返回的路由数组
  const routes: RouteRecordRaw[] = []

  // 4.定义递归数组方法
  const _recurseGetRoute = function (menus: any) {
    for (const menu of menus) {
      // type为2表示是子路由，并且不会再有children
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 让 firstMenu变量存储一下 menu. firstMenu变量用来解决直接访问Localhost:8080为空白的情况
        // firstMenu 只会被赋一次值！！
        // 这里为什么会被定到系统总览的核心技术页面？？
        // 因为我们遍历时，第一个遍历到的子路由就是系统总览的核心技术页面，而且这个子路由正好在菜单的第一栏
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

/**
 * 用来生成面包屑组件的路由
 * @param userMenus 用户的全部菜单
 * @param currentPath 当前路由
 * @returns
 */
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  // 复用下面的pathMapToMenu函数，返回值为面包屑路由的全部
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

/**
 *  实现用当前路径从全部路由菜单中匹配到当前路径的全部信息
 * @param userMenus 用户的路由菜单
 * @param currentPath 当前的路径
 * @param breadcrumb
 * @returns
 * 为了实现复用，因为我们还有一个功能函数是拿到当前路由的信息，还要拿到父级路由的信息，
 * 那么为了复用，那我们在遍历一级菜单时就顺便保存了当前路由(即父级路由)的信息
 */
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
  // 可以把breadcrumb设置成可选类型，这样方便复用
): any {
  for (const menu of userMenus) {
    // 父级菜单继续遍历
    if (menu.type === 1) {
      // 如果findMenu有值，那就证明了这个父级路由中包含所找的子集路由
      // 那我们就顺便保存了menu 和 findMenu
      //相当于二叉树往回走的时候，收集信息(与之相反的是：向下探索)
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
