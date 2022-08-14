/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-14 11:58:22
 * @LastEditTime: 2022-08-14 23:00:21
 */
type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
}
