<template>
  <el-form label-width="55px">
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" placeholder="请输入验证码" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    return {
      phone
    }
  }
})
</script>
<style lang="less" scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
