const path = require('path')

module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
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
