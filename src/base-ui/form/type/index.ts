/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-14 11:58:22
 * @LastEditTime: 2022-08-18 05:23:38
 */
type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  title?: string
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
}
