<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 20:28:01
 * @LastEditTime: 2022-11-01 09:52:53
-->
<template>
  <!-- 通过v-model实现组件之间的数据双向绑定：并且传给子组件的值叫：modelValue，并不叫formData -->
  <my-form v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h3>高级检索</h3>
    </template>
    <template #footer>
      <div class="handle-btns">
        <el-button @click="handleResetClick">
          <el-icon><refresh /></el-icon>
          重置
        </el-button>
        <el-button @click="handleQuery" type="primary">
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
  emit: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性是由配置文件的field来决定
    //?? 1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig.formItem ?? [] //formItems是从父组件收过来的各个选项值
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData) //formData是我们传给子组件的值

    // 2.重置按钮
    const handleResetClick = () => {
      console.log('重置')
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.搜索
    const handleQuery = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQuery
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
