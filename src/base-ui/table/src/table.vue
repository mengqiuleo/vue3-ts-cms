<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 23:16:44
 * @LastEditTime: 2022-08-16 00:06:52
-->
<template>
  <div>
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITabelTitle } from '../type/type'
export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<ITabelTitle[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped></style>
