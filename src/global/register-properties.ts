/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 06:21:13
 * @LastEditTime: 2022-08-16 06:41:02
 */
import { App } from 'vue'
import { formatUtcString } from '@/utils/data-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
