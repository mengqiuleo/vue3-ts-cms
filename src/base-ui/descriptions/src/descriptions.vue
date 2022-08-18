<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-18 04:37:56
 * @LastEditTime: 2022-08-18 05:04:24
-->
<template>
  <div class="description">
    <el-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="(itemData, index) in tableDatas" :key="index">
        <el-descriptions-item
          :label="itemData.name"
          label-align="left"
          align="left"
          width="1"
        >
          <template #label> {{ itemData.name }} </template>
          <el-tag size="small">{{ itemData.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DescriptionProp } from '../types/types'
export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 1
    },
    tableDatas: {
      type: Array as PropType<DescriptionProp[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.description {
  margin-bottom: 20px;
}
</style>
