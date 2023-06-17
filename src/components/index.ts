// 暴露插件对象
import SvgIcon from './SvgIcon/index.vue'
export default {
	install(app: any) {
		app.component('SvgIcon', SvgIcon)
	}
}
