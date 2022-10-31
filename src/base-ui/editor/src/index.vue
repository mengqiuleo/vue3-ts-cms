<!--
 * @Author: Pan Jingyi
 * @Date: 2022-10-30 18:47:16
 * @LastEditTime: 2022-10-31 19:57:39
-->
<!-- <template>
  <div class="my-editor">
    <div ref="editorRef" class="editor"></div>
    <div :innerHTML="content.html" class="content" ref="contentRef"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  nextTick
} from 'vue'
import WangEditor from 'wangeditor'

export default defineComponent({
  name: 'MyEditor',
  setup() {
    const editorRef = ref<HTMLDivElement>()
    const content = reactive({
      html: '',
      text: ''
    })
    let instance: any
    onMounted(() => {
      instance = new WangEditor(editorRef.value)
      Object.assign(instance.config, {
        onchange() {
          syncHTML()
        }
      })
      instance.config.menuTooltipPosition = 'down'
      instance.config.showFullScreen = true
      instance.create()
      // 监听屏幕大小时间
      window.onresize = () => {
        setEditorBoxSize()
      }
    })

    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })

    const syncHTML = () => {
      content.html = instance.txt.html()
    }
    // 设置高度
    const contentRef = ref<HTMLDivElement>()
    contentRef.value?.setAttribute
    function setEditorBoxSize() {
      const [navMenu, bodyContent]: any = editorRef.value!.children
      const height = contentRef.value!.offsetHeight - navMenu.offsetHeight
      bodyContent.style.height = height + 'px'
    }

    nextTick(() => {
      setEditorBoxSize()
    })
    return {
      editorRef,
      contentRef,
      content
    }
  }
})
</script>

<style lang="less" scoped>
.my-editor {
  display: flex;
  width: 100%;
  height: 100%;

  .editor {
    flex: 1;
    margin-right: 10px;
    height: 100%;
  }
  .content {
    flex: 1;
    height: 100%;
    padding: 10px 15px;
    background-color: #fff;
    border: 1px solid #c9d8db;
  }
}
</style> -->

<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar
      class="toolBar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <!-- 编辑器 -->
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
