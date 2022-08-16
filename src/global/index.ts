/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 13:13:12
 * @LastEditTime: 2022-08-16 06:24:50
 */
import { App } from 'vue'
import registerElement from './register-element'
import registerIcon from './register-icon'
import registerProperties from './register-properties'

export function registerApp(app: App): void {
  registerElement(app)
  app.use(registerIcon)
  app.use(registerProperties)
}
