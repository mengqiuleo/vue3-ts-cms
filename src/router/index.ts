/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 06:16:16
 * @LastEditTime: 2022-09-30 19:02:59
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
      return '/login'
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
