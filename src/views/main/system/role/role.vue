<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:11:17
 * @LastEditTime: 2022-08-16 19:47:08
-->
<template>
  <div class="role">
    <pageSearch :searchFormConfig="searchFormConfig" />
    <PageContent :contentTableConfig="contentTableConfig" pageName="role" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    pageSearch
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
