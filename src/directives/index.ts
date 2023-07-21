// 全局自定义指令
import { App } from 'vue'
import pinia from '@/stores/index'
import { useUserStore } from '@/stores/user'

export default {
  install(app: App) {
    app.directive('focus', {
      /**
       *
       * @param el 绑定的元素
       * @param bingding 对象
       */
      mounted(el: HTMLElement) {
        // 获得焦点
        el.focus()
      }
    })
    app.directive('hasBtn', {
      mounted(el: HTMLElement, bingding: any) {
        const userStore = useUserStore(pinia)
        if (!userStore.userInfo.buttonsArr.includes(bingding.value)) {
          el.style.display = 'none'
        }
      }
    })
  }
}
