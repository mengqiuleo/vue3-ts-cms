/*
 * @Author: Pan Jingyi
 * @Date: 2022-11-02 10:42:59
 * @LastEditTime: 2022-11-02 10:46:30
 */
module.exports = {
  // 是否使用cdn
  useCDN: true,
  // key是'包名', value是静态资源引入后全局的名称 import Vue from 'vue'
  externals: {
    echarts: 'echarts',
    // 必须是ELEMENT，否则会报‘elementUI is not defined’
    'element-plus': 'ELEMENT'
  },
  CDN: {
    // CDN链接地址：https://www.jsdelivr.com/
    css: [
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/theme-chalk/index.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11',
      'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/echarts@5.2.1/dist/echarts.min.js',
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/element-ui.common.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
    ]
  }
}
