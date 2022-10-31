<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-13 21:15:16
 * @LastEditTime: 2022-10-31 21:27:10
-->
<template>
  <div class="chat">
    <div class="header">
      <el-input
        style="width: 300px"
        v-model="title"
        placeholder="请输入文章标题"
      ></el-input>
      <el-button @click="publishArticlesClic">发布文章</el-button>
    </div>
    <div class="content">
      <MyEditor ref="editRef"></MyEditor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import MyEditor from '@/base-ui/editor/src/index.vue'
import { ElMessage } from 'element-plus'

import { publishArticlesData } from '@/service/main/story'
export default defineComponent({
  name: 'chat',
  components: { MyEditor },
  setup() {
    const editRef = ref<InstanceType<typeof MyEditor>>()
    const title = ref<string>()
    const publishArticlesClic = () => {
      publishArticlesData({
        title: title.value!,
        content: editRef.value!.content.html
      })
        .then(() => {
          ElMessage.success({
            message: '文章发布成功',
            type: 'success'
          })
        })
        .catch(() => {
          ElMessage.error('文章发布失败')
        })
    }
    return { editRef, publishArticlesClic, title }
  }
})
</script>

<style lang="less" scoped>
.chat {
  height: 580px;
  display: flex;
  flex-direction: column;
  .header {
    text-align: right;
    height: 40px;
    padding-top: 8px;
    padding-left: 15px;
  }
  .content {
    height: 500px;
  }
}
</style>
