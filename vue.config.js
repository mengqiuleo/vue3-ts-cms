/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 05:57:16
 * @LastEditTime: 2022-11-02 11:06:52
 */
const path = require('path')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

//* "build": "vue-cli-service build"
const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV) //判断是否是生产环境
// cdn相关配置
// const cdnConfig = require('./cdn.config.js')

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
    plugins: IS_PRODUCTION
      ? [
          // new BundleAnalyzerPlugin({}), //在浏览器打开包大小
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
          new LodashModuleReplacementPlugin(),
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //对超过10k的数据进行压缩
            deleteOriginalAssets: false //是否删除原文件
          })
        ]
      : [],
    optimization: IS_PRODUCTION
      ? {
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
            minSize: 20000, // 依赖包超过300000bit将被单独打包
            maxSize: 150000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
            // 缓存组
            // priority: 缓存组打包的先后优先级
            // minChunks: 表示被引用次数，默认为1
            cacheGroups: {
              //公共组件
              commons: {
                name: 'chunk-commons',
                test: path.resolve('src/components'), // can customize your rules
                minSize: 100, //大小超过100个字节
                minChunks: 3, //  最小共用次数
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
              ui: {
                name: 'chunk-ui', // ui库
                priority: 20, // 切分的优先级，使 element-ui 不会被切分到 chuck-libs 中
                test: /[\\/]node_modules[\\/]_?element-plus(.*)/
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
      : {}
    // externals: IS_PRODUCTION ? externals : {}
  },
  // chainWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     var externals = {
  //       vue: 'Vue',
  //       axios: 'axios',
  //       'element-ui': 'ELEMENT',
  //       'vue-router': 'VueRouter',
  //       vuex: 'Vuex'
  //     }
  //     config.externals(externals)
  //     const cdn = {
  //       css: [
  //         // element-ui css
  //         'https://cdn.bootcdn.net/ajax/libs/element-plus/1.1.4/dist/index.css'
  //       ],
  //       js: [
  //         // vue
  //         'https://cdn.bootcdn.net/ajax/libs/vue/3.2.13/vue.min.js',
  //         // vue-router
  //         'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.3/vue-router.min.js',
  //         // vuex
  //         'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0/vuex.min.js',
  //         // axios
  //         'https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.min.js',
  //         // element-ui js
  //         'https://cdn.bootcdn.net/ajax/libs/element-plus/1.1.4/index.js',
  //         'https://cdn.bootcdn.net/ajax/libs/element-plus-icons-vue/1.1.4/index.min.js'
  //       ]
  //     }
  //     // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
  //     config.plugin('html').tap((args) => {
  //       args[0].cdn = cdn
  //       return args
  //     })
  //   }
  // },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      var externals = {
        // vue: 'Vue',
        // 'vue-router': 'VueRouter',
        // vuex: 'Vuex',
        // axios: 'axios',
        echarts: 'echarts',
        // 必须是ELEMENT，否则会报‘elementUI is not defined’
        'element-plus': 'ELEMENT'
      }
      config.externals(externals)
      const cdn = {
        css: [
          // element-ui css
          'https://cdn.bootcdn.net/ajax/libs/element-plus/1.1.4/dist/index.css'
        ],
        js: [
          // vue
          // 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.13/vue.min.js',
          // vue-router
          // 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.3/vue-router.min.js',
          // vuex
          // 'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0/vuex.min.js',
          // axios
          // 'https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.min.js',
          // element-ui js
          'https://cdn.bootcdn.net/ajax/libs/element-plus/1.1.4/index.js',
          'https://cdn.bootcdn.net/ajax/libs/element-plus-icons-vue/1.1.4/index.min.js',
          // echarts
          'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.0/echarts.min.js'
        ]
      }
      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  publicPath: './' // 注意 这里使用 /  如果不行的话  就 ./
}
