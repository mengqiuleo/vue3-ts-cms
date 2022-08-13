/*
 * @Date: 2022-04-15 16:23:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-13 20:11:02
 * @FilePath: \Vue3-ts-cms\src\global\register-icon.ts
 * @description: 文件描述
 */
/*
 * @Date: 2022-04-12 17:02:50
 * @LastEditors: wuyuxin
 * @LastEditTime: 2022-04-15 16:16:29
 * @FilePath: \Vue3-ts-cms\src\global\register-element.ts
 * @description: 文件描述
 */
import { App } from 'vue'
import {
  UserFilled,
  Iphone,
  Monitor,
  Goods,
  Document,
  Location,
  ChatLineRound,
  Setting,
  Fold,
  Expand,
  CircleClose,
  Refresh,
  Search,
  Edit,
  Delete,
  WarningFilled
} from '@element-plus/icons-vue'

const component = [
  UserFilled,
  Iphone,
  Monitor,
  Goods,
  Document,
  Location,
  ChatLineRound,
  Setting,
  Fold,
  Expand,
  CircleClose,
  Refresh,
  Search,
  Edit,
  Delete,
  WarningFilled
]
export default function registerElement(app: App): void {
  component.forEach((element) => {
    app.component(element.name, element)
  })
}
// 统一注册Icon图标
