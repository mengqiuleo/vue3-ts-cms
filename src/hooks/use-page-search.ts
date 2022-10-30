/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-17 00:10:04
 * @LastEditTime: 2022-10-30 15:45:27
 */
import PageContent from '@/components/page-content'
import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    console.log('输出查询参数：', queryInfo)
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
