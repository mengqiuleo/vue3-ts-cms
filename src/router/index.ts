/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 06:16:16
 * @LastEditTime: 2022-10-28 10:53:00
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login' //#这里是没有token：重定向到登录页，而不是token过期重定向
    }
  }

  // console.log('刷新丢失问题：', router.getRoutes())
  // console.log('刷新丢失问题：', to)

  // 解决直接访问 localhost:8080 为空白的情况
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
