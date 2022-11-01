/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 03:51:07
 * @LastEditTime: 2022-11-01 13:14:52
 */
// 存储项目发布阶段需要用到的插件
const productPlugins = []

// 如果用户运行的是打包命令(npm run build)则向数组中注入插件
if (process.env.NODE_ENV === 'production') {
  //发布阶段
  productPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: ['lodash', ...productPlugins]
}
