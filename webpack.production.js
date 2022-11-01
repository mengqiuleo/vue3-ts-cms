/*
 * @Author: Pan Jingyi
 * @Date: 2022-11-01 10:49:27
 * @LastEditTime: 2022-11-01 11:03:19
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  entry: './src/main.ts',
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true // 自动将上次打包目录资源清空
  },
  // 加载器
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  // 插件
  plugins: [new HtmlWebpackPlugin()],
  // 模式
  mode: 'production'
}
