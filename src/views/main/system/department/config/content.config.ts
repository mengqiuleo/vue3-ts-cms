/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-18 05:18:18
 * @LastEditTime: 2022-08-18 13:10:49
 */
export const contentTableConfig = {
  title: '部门列表',
  propList: [
    { prop: 'id', label: '部门id', minWidth: '8%' },
    { prop: 'name', label: '部门名称', minWidth: '12%' },
    { prop: 'leader', label: '部门领导', minWidth: '12%' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '20%',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '20%',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '15%', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
