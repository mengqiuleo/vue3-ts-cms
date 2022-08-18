<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:13:31
 * @LastEditTime: 2022-08-18 14:05:56
-->
<template>
  <div class="category">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <page-content
      ref="pageContentRef"
      pageName="category"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { usePageSearch } from '@/hooks/use-page-search'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style scoped></style>
