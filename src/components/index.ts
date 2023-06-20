// 暴露插件对象
import SvgIcon from './SvgIcon/index.vue'
import type { App } from 'vue'
export default {
  install(app: App) {
    app.component('SvgIcon', SvgIcon)
  }
}
