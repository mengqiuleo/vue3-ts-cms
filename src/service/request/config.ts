/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 17:14:56
 * @LastEditTime: 2022-10-29 21:21:56
 */
let BASE_URL = ''
const TIME_OUT = 10000

// 根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

// http://123.207.32.32:8000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }
