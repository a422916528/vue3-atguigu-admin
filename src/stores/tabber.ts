import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useTabbarStore = defineStore('tabbar', () => {
  // 接收刷新按钮变化
  const refresh = ref(false)
  // 刷新按钮变化回调
  const clickRefresh = (val: boolean) => {
    refresh.value = val
  }

  return {
    refresh,
    clickRefresh
  }
})
