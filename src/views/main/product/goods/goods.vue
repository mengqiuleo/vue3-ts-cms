<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:14:08
 * @LastEditTime: 2022-08-17 13:34:32
-->
<template>
  <div class="goods">
    <PageContent
      class="content"
      :contentTableConfig="contentTableConfig"
      pageName="goods"
    >
      <template #image="scope">
        <el-image style="width: 60px; height: 60px" :src="scope.row.imgUrl">
        </el-image>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'goods',
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
