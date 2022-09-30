/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-14 11:58:22
 * @LastEditTime: 2022-09-30 15:18:15
 */
type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  // 搜索框是什么类型：可以是输入框，下拉选择框，时间选择框，密码框
  type: IFormType
  // 标签名叫什么
  label: string
  // 验证规则
  rules?: any[]
  // 填空的空白处的默认值
  placeholder?: any
  // 针对select：就是下拉可选框的值
  options?: any[]
  // 针对特殊的属性：比如选择时间的
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  title?: string
  // 整个搜索框的长度
  labelWidth?: string
  colLayout?: any
  // 整个搜索界面中对于每个搜素框都应该出现的样式
  itemLayout?: any
}
