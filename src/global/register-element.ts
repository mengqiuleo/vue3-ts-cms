/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 14:14:25
 * @LastEditTime: 2022-08-18 05:13:13
 */
import { App } from 'vue'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'

import {
  ElAside,
  ElAvatar,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElRadio,
  ElRow,
  ElCol,
  ElSelect,
  ElSubMenu,
  ElTabPane,
  ElTag,
  ElTabs,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElIcon,
  ElConfigProvider,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard,
  ElTooltip,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'

const components = [
  ElAside,
  ElAvatar,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElRadio,
  ElRow,
  ElCol,
  ElSelect,
  ElSubMenu,
  ElTabPane,
  ElTabs,
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElIcon,
  ElConfigProvider,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard,
  ElTooltip,
  ElDescriptions,
  ElDescriptionsItem
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
