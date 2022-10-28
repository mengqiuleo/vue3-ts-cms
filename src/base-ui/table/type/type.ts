/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 00:03:37
 * @LastEditTime: 2022-10-01 08:59:11
 */
export interface ITabelTitle {
  // prop用来区分：你的数据应该放到哪一行（可以实现数据分类）
  prop: string
  // 标签名，就是最上面一行显示什么字
  label: string
  minWidth?: string
  // 插槽名字：比如你的创建时间需要进行修改后再显示，用这个插槽自定义
  slotName?: string
}
