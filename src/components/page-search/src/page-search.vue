<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 20:28:01
 * @LastEditTime: 2022-08-16 21:07:04
-->
<template>
  <my-form v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h3>高级检索</h3>
    </template>
    <template #footer>
      <div class="handle-btns">
        <el-button>
          <el-icon @click="handleResetClick"><refresh /></el-icon>
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
  setup(props) {
    // 双向绑定的属性是由配置文件的field来决定
    // 1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig.formItem ?? []
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.重置按钮
    const handleResetClick = () => {
      formData.value = formOriginData
    }
    return {
      formData,
      handleResetClick
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
