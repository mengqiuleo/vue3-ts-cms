/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 05:57:16
 * @LastEditTime: 2022-10-29 20:26:00
 */
const path = require('path')

module.exports = {
  outputDir: './dist',
  devServer: {
    proxy: {
      '^/api': {
        // /api 表示拦截以/api开头的请求路径
        target: 'http://152.136.185.210:4000', // 跨域的域名
        pathRewrite: {
          '^/api': '' // 把/api变为空字符：'/' 这种接口配置出来   http://XX.XX.XX.XX:8083/login
        },
        changeOrigin: true // 是否开启跨域
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
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        view: '@/view',
        router: '@/router',
        components: '@/components',
        assets: '@/assets'
      }
    }
  },
  publicPath: './', // 注意 这里使用 /  如果不行的话  就 ./
  assetsDir: 'static'
}
