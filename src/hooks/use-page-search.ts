/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-17 00:10:04
 * @LastEditTime: 2022-08-17 00:11:35
 */
import PageContent from '@/components/page-content'
import { ref } from 'vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick]
}
