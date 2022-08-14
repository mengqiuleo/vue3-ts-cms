/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:17:23
 * @LastEditTime: 2022-08-14 00:02:03
 */
const dashboard = () => import('@/views/main/analysis/dashboard/dashboard.vue')
export default {
  path: '/main/analysis/dashboard',
  name: 'dashboard',
  component: dashboard,
  children: []
}
