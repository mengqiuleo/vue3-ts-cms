import { App } from 'vue'
import registerElement from './register-element'
import registerIcon from './register-icon'
export function registerApp(app: App): void {
  registerElement(app)
  app.use(registerIcon)
}
