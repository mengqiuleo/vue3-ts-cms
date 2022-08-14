<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 17:35:38
 * @LastEditTime: 2022-08-15 00:39:52
-->
<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :collapse="collapse"
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon
                ><component :is="getIcon(item.icon)"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="childItem in item.children" :key="childItem.id">
              <el-menu-item
                :index="childItem.id + ''"
                @click="handleMenuItemClick(childItem)"
              >
                <el-icon
                  ><component :is="getIcon(childItem.icon)"></component
                ></el-icon>
                <template #title>{{ childItem.name }}</template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon><component :is="getIcon(item.icon)"></component></el-icon>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    const userMenus = computed(() => store.state.login.userMenus)
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')

    const getIcon = (icons: string) => {
      if (icons && icons.indexOf('el-icon') !== -1) {
        return icons.replace('el-icon-', '')
      }
    }
    const handleMenuItemClick = (item: any) => {
      console.log(item)
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      getIcon,
      handleMenuItemClick,
      defaultValue,
      currentPath
    }
  }
})
</script>
<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
