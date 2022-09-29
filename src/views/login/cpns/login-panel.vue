<!--
 * @Author: Pan Jingyi
 * @Date: 2022-06-24 21:50:52
 * @LastEditTime: 2022-09-29 19:05:30
-->
<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 这里的v-model用来判断选中的是哪个tab，因为我们会给两个tab都绑定名字(name) -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><user-filled class="icon-size" /> 账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <!-- 因为手机登录没有做，所以没写 -->
      <!-- <el-tab-pane name="phone">
        <template #label>
          <span><iphone class="icon-size" /> 手机登录</span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane> -->
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick()"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
//import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    // 定义属性
    const isKeepPassword = ref(true)
    // accountRef 用来绑定账号密码，并且拿到验证规则的那个函数(这个函数是在login-count组件中定义的)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    // 默认绑定account的tab
    const currentTab = ref<string>('account')

    //定义方法
    const handleLoginClick = () => {
      // 其实账号密码会传入到里面的小的login-count组件中，会在小组件中进行判断登录逻辑
      // 为什么不在当前的外面的大组件中进行登录逻辑判断呢？
      // 如果把逻辑放在外面，那么如果要使用手机登录，那么手机登录的逻辑也会放在外面的大组件中，代码太多了，所以进行抽离
      accountRef.value?.loginAction(isKeepPassword.value)
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab
    }
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .icon-size {
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
