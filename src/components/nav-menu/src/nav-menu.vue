<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 17:35:38
 * @LastEditTime: 2022-09-30 19:11:09
-->
<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <!-- 整个菜单的思路：其实这里所有的代码都只是一套模板，根本不是一些可折叠展开的菜单，只是一个！！！，
      然后通过for循环生成大量的可折叠展开的菜单 -->
    <!-- default-active是默认选中哪个菜单 -->
    <el-menu
      :collapse="collapse"
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 注意：下面的template是二选一的，if-else的： 一级菜单(可展开)和二级菜单(不可展开) -->
        <template v-if="item.type === 1">
          <!-- el-sub-menu: 可以展开折叠 -->
          <el-sub-menu :index="item.id + ''">
            <!-- title的template就是当前菜单的名字 -->
            <template #title>
              <el-icon
                ><component :is="getIcon(item.icon)"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- 下面是继续遍历当前菜单 -->
            <template v-for="childItem in item.children" :key="childItem.id">
              <el-menu-item
                :index="childItem.id + ''"
                @click="handleMenuItemClick(childItem)"
              >
                <el-icon
                  ><component :is="getIcon(childItem.icon)"></component
                ></el-icon>
                <span>{{ childItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- 不可展开的菜单：type为2 -->
        <template v-else-if="item.type === 2">
          <!-- el-menu-item: 不能展开折叠的 -->
          <el-menu-item :index="item.id + ''">
            <el-icon><component :is="getIcon(item.icon)"></component></el-icon>
            <span>{{ item.name }}</span>
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

    // 拿到login模块中存储的userMenus
    const userMenus = computed(() => store.state.login.userMenus)

    // 这里是实现：选中我们点击的菜单
    const currentPath = route.path
    console.log('currentPath: ', currentPath)
    console.log('userMenus.value: ', userMenus.value)
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '') //我们点击选中的菜单id
    console.log('menu: ', menu)
    console.log('menu.id: ', menu.id)
    // 上面具体的例子(打印结果)
    /**
     * currentPath:  /main/story/chat
     * userMenus.value: 里面是菜单，每个具体的路由有自己的id,name,url
     * 我们需要用路径匹配(路径与路径匹配)，拿到当前菜单的全部信息，然后拿出id(就是menu.id)
     * 然后设置为默认值
     */

    const getIcon = (icons: string) => {
      if (icons && icons.indexOf('el-icon') !== -1) {
        return icons.replace('el-icon-', '')
      }
    }
    const handleMenuItemClick = (item: any) => {
      console.log('点击那个路由：', item)
      // 点击对应的路由，跳转到指定页面
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
