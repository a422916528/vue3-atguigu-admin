// 全局自定义指令
import { App, nextTick } from 'vue'
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
  }
}
