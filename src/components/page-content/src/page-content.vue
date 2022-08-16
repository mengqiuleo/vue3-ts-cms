<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 14:36:27
 * @LastEditTime: 2022-08-16 20:48:38
-->
<template>
  <div class="content">
    <my-table :listData="dataList" v-bind="contentTableConfig">
      <template #headerHandler>
        <el-button>新建用户</el-button>
      </template>

      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" type="primary" text
            ><el-icon><edit /></el-icon>编辑</el-button
          >
          <el-button size="small" type="primary" text
            ><el-icon><delete /></el-icon>删除</el-button
          >
        </div>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MyTable from '@/base-ui/table'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    MyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const userCount = computed(() => store.state.system.usersCount)

    return {
      dataList,
      userCount
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
