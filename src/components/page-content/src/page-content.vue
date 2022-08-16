<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-16 14:36:27
 * @LastEditTime: 2022-08-17 00:42:45
-->
<template>
  <div class="content">
    <my-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
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
import { computed, defineComponent, ref, watch } from 'vue'
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
  setup(props) {
    const store = useStore()
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageUrl: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const userCount = computed(() => store.state.system.usersCount)
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    return {
      dataList,
      userCount,
      getPageData,
      dataCount,
      pageInfo
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
