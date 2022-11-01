/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 05:57:16
 * @LastEditTime: 2022-11-01 13:15:57
 */
const path = require('path')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

//* "build": "vue-cli-service build",
const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV) //判断是否是生产环境

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
  configureWebpack: {
    devtool: IS_PRODUCTION
      ? 'nosources-source-map'
      : 'eval-cheap-module-source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        view: '@/view',
        router: '@/router',
        components: '@/components',
        assets: '@/assets'
      }
    },
    plugins: [
      new BundleAnalyzerPlugin({}),
      new CleanWebpackPlugin(), //删除打包文件插件
      // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
      new ParallelUglifyPlugin({
        // 传递给 UglifyJS 的参数
        uglifyJS: {
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false
          },
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          }
        }
      }),
      new LodashModuleReplacementPlugin()
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(), // 去重压缩css
        new TerserPlugin({
          // 压缩JS代码
          terserOptions: {
            compress: {
              drop_console: true // 去除console
            }
          }
        }) // 压缩JavaScript
      ],
      splitChunks: {
        chunks: 'all', // 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
        maxInitialRequests: Infinity, // 按需加载时候最大的并行请求数，默认为5
        minSize: 30000, // 依赖包超过300000bit将被单独打包
        // 缓存组
        // priority: 缓存组打包的先后优先级
        // minChunks: 表示被引用次数，默认为1
        cacheGroups: {
          //公共模块
          commons: {
            name: 'chunk-commons',
            test: path.resolve('src'), // can customize your rules
            minSize: 100, //大小超过100个字节
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          // 第三方库
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
            reuseExistingChunk: true,
            enforce: true
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            chunks: 'all',
            priority: 12,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
  }
}

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
// }
