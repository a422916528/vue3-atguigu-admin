import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// svg插件配置
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入全局组件注册
import globalCom from '@/components/index.ts'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
	locale: zhCn
})
app.use(globalCom)

app.mount('#app')
