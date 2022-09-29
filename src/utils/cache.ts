/*
 * @Author: Pan Jingyi
 * @Date: 2022-06-25 15:49:22
 * @LastEditTime: 2022-09-29 18:52:19
 */
/**
 * 使用localStorage进行本地缓存
 */

class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
