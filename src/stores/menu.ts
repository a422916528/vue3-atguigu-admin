// 菜单相关
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  // 菜单是否折叠
  const menuFold = ref(false)
  // 按钮点击回调
  const changeFold = (state: boolean) => {
    menuFold.value = state
  }
  return { menuFold, changeFold }
})
