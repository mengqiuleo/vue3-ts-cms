<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:10:13
 * @LastEditTime: 2022-08-15 23:59:07
-->
<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <div class="content">
      <my-table :listData="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import PageSearch from '@/components/page-search'
import MyTable from '@/base-ui/table'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    MyTable
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }
    ]
    return {
      searchFormConfig,
      userList,
      userCount,
      propList
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
