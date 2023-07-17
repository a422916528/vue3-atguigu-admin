import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores/index'
import { router } from './router'
// svg插件配置
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入全局组件注册
import globalCom from '@/components/index'
// 引入全局自定义指令注册
import globalDirective from '@/directives/index'
// 引入全局样式
import '@/styles/index.scss'
// 暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(globalCom)
app.use(globalDirective)

app.mount('#app')
