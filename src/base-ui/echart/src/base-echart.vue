<!--
 * @Author: Pan Jingyi
 * @Date: 2022-09-28 08:44:21
 * @LastEditTime: 2022-09-28 16:46:13
-->
<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  withDefaults,
  defineProps,
  onMounted,
  watchEffect,
  watch
} from 'vue'
import { EChartsCoreOption } from 'echarts'
import useEchart from '../hooks/useEchart'
const props = withDefaults(
  defineProps<{
    options: EChartsCoreOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '350px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })

  watch(
    props.options,
    () => {
      setOptions(props.options)
    },
    { deep: true }
  )
})
</script>

<style lang="scss" scoped></style>
