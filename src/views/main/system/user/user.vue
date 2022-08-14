<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:10:13
 * @LastEditTime: 2022-08-14 23:05:41
-->
<template>
  <div class="user">
    <my-form v-bind="searchFormConfig"></my-form>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import myForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    myForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
