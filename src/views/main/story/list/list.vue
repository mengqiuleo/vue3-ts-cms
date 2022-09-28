<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:15:43
 * @LastEditTime: 2022-09-28 07:55:13
-->
<template>
  <div class="list">
    <pageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="story"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'list',
  components: {
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
