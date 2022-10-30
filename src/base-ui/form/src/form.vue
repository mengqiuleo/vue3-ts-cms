<!-- eslint-disable vue/no-mutating-props -->
<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-14 11:52:25
 * @LastEditTime: 2022-10-30 14:50:06
-->
<template>
  <div class="my-form">
    <div class="header">
      <!-- 这里设置插槽，名字为header，那么到时候引用的时候就是template #header -->
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <!-- el-form-item 相当于每一项,里面的三个template只能三选一 -->
            <!-- label是指这个东西叫什么名字，比如叫：id,用户名，用户状态，创建时间... -->
            <el-form-item
              :label="item.label"
              :rules="item.rules ?? []"
              :prop="item.field"
              v-if="!item.isHidden"
              :style="itemLayout"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <!-- 如果是下拉选择框  这里的:model-value只涉及到值的绑定，和v-model没有任何联系 -->
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  v-bind="item.otherOptions"
                >
                  <!-- 上面的otherOptions是针对于日历选择框的 -->
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <!-- v-bind可以实现将一些属性不管啥样的都绑定到组件上面 -->
                <!-- model-value 用来实现双向数据绑定:因为传了这么多值,我们怎么知道哪个对应哪个空 -->
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../type'

export default defineComponent({
  props: {
    // 通过v-model实现组件之间的数据双向绑定：并且传给子组件的值叫：modelValue，并不叫formData
    // 可以去父组件看一下，使用过v-model进行绑定的，并且绑定的值就是formData, 但是这里要叫modelValue
    modelValue: {
      type: Object,
      required: true
    },
    // 每个搜索框的相关信息
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    // 每个搜索框的长度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 整个搜索页面的每个搜索框都有的样式
    itemLayout: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue })

    // // watch(
    // //   () => props.modelValue,
    // //   (newValue) => {
    // //     formData.value = { ...newValue }
    // //   }
    // // )

    // watch(formData, (newValue) => emit('update:modelValue', newValue), {
    //   deep: true
    // })
    // return {
    //   formData
    // }
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>
<style lang="less" scoped>
.my-form {
  padding-top: 22px;
}
</style>
