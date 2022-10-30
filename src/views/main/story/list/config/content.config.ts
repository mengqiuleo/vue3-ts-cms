/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-18 14:15:35
 * @LastEditTime: 2022-10-30 18:16:04
 */
export const contentTableConfig = {
  title: '故事列表',
  propList: [
    { prop: 'id', label: '文章ID', minWidth: '100' },
    { prop: 'title', label: '故事标题', minWidth: '120' },
    { prop: 'content', label: '故事内容', minWidth: '500' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
