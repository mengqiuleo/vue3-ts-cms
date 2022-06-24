import { App } from 'vue'
import registerElement from './register-element'
export function registerApp(app: App): void {
  registerElement(app)
}
