/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 14:32:18
 * @LastEditTime: 2022-08-16 14:33:32
 */
export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '10%' },
    { prop: 'realname', label: '真实姓名', minWidth: '8%' },
    { prop: 'cellphone', label: '手机号码', minWidth: '12%' },
    { prop: 'enable', label: '状态', minWidth: '8%', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '21%',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '21%',
      slotName: 'updateAt'
    },
    { prop: 'handler', label: '操作', minWidth: '16%', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
