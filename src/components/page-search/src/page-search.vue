<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 20:28:01
 * @LastEditTime: 2022-08-15 20:44:36
-->
<template>
  <my-form v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h3>高级检索</h3>
    </template>
    <template #footer>
      <div class="handle-btns">
        <el-button>
          <el-icon><refresh /></el-icon>
          重置
        </el-button>
        <el-button type="primary">
          <el-icon><search /></el-icon>
          搜索
        </el-button>
      </div>
    </template>
  </my-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import myForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    myForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>
<style lang="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
