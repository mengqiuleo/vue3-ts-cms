<!--
 * @Author: Pan Jingyi
 * @Date: 2022-06-24 22:36:11
 * @LastEditTime: 2022-10-31 20:51:43
-->
<template>
  <div class="login-account">
    <!-- 这里的rules是用来验证规则，account用来记录传入的绑定的账号密码的变量-->
    <el-form label-width="55px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input
          v-model="account.name"
          placeholder="请输入用户名"
          class="input-class"
        />
      </el-form-item>
      <!-- prop用来帮助验证规则匹配是账号还是密码的验证规则 -->
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
    // 账号相关
    const account = reactive({
      name: localCache.getCache('name') ?? 'coderwhy',
      password: localCache.getCache('password') ?? '123456'
    })
    // 获取整个表单(账号和密码)，一会儿用来验证规则
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 这个登录的函数会导出，在 login-panel组件中调用(通过ref来绑定当前组件使用)
    const loginAction = (isKeepPassword: boolean) => {
      // console.log('里面小组件收到消息，开始登录')
      // validate属性是组件自带的，判断账号密码通过后，会返回true(否则为false)
      formRef.value?.validate((valid) => {
        if (valid) {
          // console.log('表单验证通过，真正执行登录逻辑')
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
