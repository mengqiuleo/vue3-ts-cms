<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 20:13:59
 * @LastEditTime: 2022-09-30 19:54:43
-->
<template>
  <div class="nav-header">
    <template v-if="isFold">
      <el-icon class="fold-menu" @click="handleFoldClick"><expand /></el-icon>
    </template>
    <template v-else-if="!isFold">
      <el-icon class="fold-menu" @click="handleFoldClick"><fold /></el-icon>
    </template>
    <div class="content">
      <Breadcrumb :breadList="breadList" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import Breadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    UserInfo,
    Breadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus) //用户全部路由信息表
    const breadList = computed(() => {
      const route = useRoute()
      const currentPath = route.path //当前路径
      const useBreadList = pathMapBreadcrumbs(userMenus.value, currentPath) //拿到面包屑的数据
      return useBreadList
    })

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick,
      breadList
    }
  }
})
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
