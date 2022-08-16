/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 19:23:41
 * @LastEditTime: 2022-08-16 19:30:36
 */
export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '角色名', minWidth: '12%' },
    { prop: 'intro', label: '权限', minWidth: '10%' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '24%',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '24%',
      slotName: 'updateAt'
    },
    { prop: 'handler', label: '操作', minWidth: '16%', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
