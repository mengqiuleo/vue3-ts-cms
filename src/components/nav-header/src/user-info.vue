<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-14 01:00:30
 * @LastEditTime: 2022-08-14 01:17:44
-->
<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          class="avatar"
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.replace('/login')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 5px;
  }
}
.icon-class {
  padding-left: 0px;
}
</style>
