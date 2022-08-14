<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 20:13:59
 * @LastEditTime: 2022-08-14 01:02:47
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
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'

export default defineComponent({
  components: {
    UserInfo
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
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
