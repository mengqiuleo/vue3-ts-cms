<!--
 * @Author: Pan Jingyi
 * @Date: 2022-10-31 21:27:48
 * @LastEditTime: 2022-10-31 21:28:05
-->
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      class="toolBar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 440px"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { defineComponent, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default defineComponent({
  name: 'MyEditor',
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //   }, 1500)
    // })

    const toolbarConfig = {
      excludeKeys: [
        /* 隐藏哪些菜单 */
        'group-image',
        'group-video'
      ]
    }

    // 编辑器配置
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    }
  }
})

export interface IClearExposed {
  clearAllErrors: () => void
}
</script>

<style scoped>
.toolBar {
  border-bottom: 1px solid #ccc;
  /* font-size: 15px; */
}
</style>
