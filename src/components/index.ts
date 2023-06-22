// 暴露插件对象
import SvgIcon from './SvgIcon/index.vue'
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  install(app: App) {
    app.component('SvgIcon', SvgIcon)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
