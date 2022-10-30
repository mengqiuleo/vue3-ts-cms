<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:15:43
 * @LastEditTime: 2022-10-30 18:39:01
-->
<template>
  <div class="list">
    <PageContent :contentTableConfig="contentTableConfig" pageName="story">
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'list',
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
