/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-18 05:18:18
 * @LastEditTime: 2022-08-18 12:50:17
 */
import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称',
      rules: []
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导',
      placeholder: '请输入部门领导',
      rules: []
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px',
  itemLayout: { padding: '10px 40px' },
  colLayout: { span: 8 }
}
