import { App } from 'vue'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'

import { ElButton, ElCheckbox, ElForm, ElInput } from 'element-plus'

const components = [ElButton, ElCheckbox, ElForm, ElInput]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
