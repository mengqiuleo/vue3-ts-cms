<!--
 * @Author: Pan Jingyi
 * @Date: 2022-06-23 03:51:07
 * @LastEditTime: 2022-08-16 12:46:16
-->
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
