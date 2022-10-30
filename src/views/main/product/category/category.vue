<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:13:31
 * @LastEditTime: 2022-10-30 18:39:38
-->
<template>
  <div class="category">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <pageContent
      ref="pageContentRef"
      pageName="category"
      :contentTableConfig="contentTableConfig"
    >
      <template #headerHandler>
        <el-button>编辑</el-button>
      </template>
    </pageContent>
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
