/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 14:32:18
 * @LastEditTime: 2022-08-17 13:05:55
 */
export const contentTableConfig = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '12%', align: 'center' },
    {
      prop: 'oldPrice',
      label: '原价',
      minWidth: '6%',
      slotName: 'oldPrice',
      align: 'center'
    },
    { prop: 'newPrice', label: '现价', minWidth: '6%', align: 'center' },
    {
      prop: 'imgUrl',
      label: '商品展示',
      minWidth: '10%',
      slotName: 'image',
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '8%',
      slotName: 'status',
      align: 'center'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '20%',
      slotName: 'createAt',
      align: 'center'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '20%',
      slotName: 'updateAt',
      align: 'center'
    },
    { label: '操作', minWidth: '15%', slotName: 'handler', align: 'center' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
