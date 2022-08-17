/*
 * @Author: Pan Jingyi
 * @Date: 2022-08-17 20:25:31
 * @LastEditTime: 2022-08-18 02:40:10
 */
import PageModal from '@/components/page-modal'
import { ref } from 'vue'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
