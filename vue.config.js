/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 05:57:16
 * @LastEditTime: 2022-08-13 03:49:14
 */
const path = require('path')

module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        target:
          'https://www.fastmock.site/mock/59cef99bcb55aa62075a94a7758d9a53/api',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // # 方式一：
  // configureWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@',path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // },

  // # 方式二：
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }
  }
}
