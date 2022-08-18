/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-18 13:52:52
 * @LastEditTime: 2022-08-18 14:08:29
 */
export const contentTableConfig = {
  title: '类别列表',
  propList: [
    { prop: 'name', label: '角色名称', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
