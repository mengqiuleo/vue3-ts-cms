<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 00:41:17
 * @LastEditTime: 2022-08-15 01:17:35
-->
<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadList" :key="item.name">
      <el-breadcrumb-item :to="{ path: item.path }">{{
        item.name
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../type/index'

export default defineComponent({
  props: {
    breadList: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped></style>
