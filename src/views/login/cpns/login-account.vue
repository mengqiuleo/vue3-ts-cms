<!--
 * @Author: Pan Jingyi
 * @Date: 2022-06-24 22:36:11
 * @LastEditTime: 2022-08-13 02:16:16
-->
<template>
  <div class="login-account">
    <el-form label-width="55px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input
          v-model="account.name"
          placeholder="请输入用户名"
          class="input-class"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          placeholder="请输入密码"
          class="input-class"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { useStore } from 'vuex'

import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      console.log('里面小组件收到消息，开始登录')
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('表单验证通过，真正执行登录逻辑')
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            //本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>
<style lang="less" scoped>
.input-class {
  width: 250px;
}
</style>
