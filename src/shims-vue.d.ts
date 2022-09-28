/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 03:51:07
 * @LastEditTime: 2022-09-28 18:48:16
 */
/* eslint-disable */
// export {}

// declare module 'vue' {
//   interface ComponentCustomProperties {
//     $filters: any
//   }
// }

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $filters: any
declare const VUE_APP_BASE_URL: string
declare module '*.json'

// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     $filters: any
//   }
// }


