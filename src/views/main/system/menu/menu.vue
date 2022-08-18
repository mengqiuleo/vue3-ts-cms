<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:12:18
 * @LastEditTime: 2022-08-18 13:00:46
-->
<template>
  <div class="menu">
    <PageContent :contentTableConfig="contentTableConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
