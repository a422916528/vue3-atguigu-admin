import axios from 'axios'
// 引入用户信息仓库
import { useUserStore } from '@/stores/user.ts'
// 创建axios实例
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 响应时间
  timeout: 5000
})

let loadingInstance: any = null
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // Loading 加载
    loadingInstance = ElLoading.service({ fullscreen: true })
    // 请求头添加 token
    const userStore = useUserStore()
    if (userStore.userInfo.token) {
      config.headers.token = userStore.userInfo.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 关闭 Loading 加载
    loadingInstance.close()
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // ElMessage.error('xxx')
    switch (error.response.status) {
      case 404:
        ElMessage.error('请求地址错误')
        break
      case 400:
        ElMessage.error(error.message)
        break
    }
    return Promise.reject(error)
  }
)

export default request
