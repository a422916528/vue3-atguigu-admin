import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/user'
import type {
  loginFromData,
  loginResponseData,
  userInfoResponseData,
  logoutResponseData
} from '@/api/user/type'
import { asyncRoute, constantRoute, router } from '@/router/index.ts'
import cloneDeep from 'lodash/cloneDeep'

// 用于过滤用户拥有的异步路由
function filterAsyncRoutes(asyncRoutes: any, userRoutes: any) {
  return asyncRoutes.filter(item => {
    if (userRoutes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoutes(item.children, userRoutes)
      }
      return true
    }
  })
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户数据信息
    const userInfo = ref({
      token: '',
      username: '',
      avatar: '',
      // 用户需要展示的异步路由
      userMenuRoutes: [],
      // 过滤的异步路由
      asyncRoutes: [],
      // 按钮的权限
      buttonsArr: []
    })

    // 用户登录
    const userLogin = async (data: loginFromData) => {
      const res: loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        // 登录成功
        userInfo.value.token = res.data
        return Promise.resolve('登录成功')
      } else {
        return Promise.reject(new Error(res.data))
      }
    }
    // 获取用户信息
    const getUserInfo = async () => {
      const res: userInfoResponseData = await reqUserInfo()
      if (res.code == 200) {
        userInfo.value.avatar = res.data.avatar
        userInfo.value.username = res.data.name
        userInfo.value.buttonsArr = res.data.buttons
        // 过滤异步路由
        const userAsyncRoutes = filterAsyncRoutes(cloneDeep(asyncRoute), res.data.routes)
        userInfo.value.asyncRoutes = userAsyncRoutes
        // 添加动态路由
        userAsyncRoutes.forEach(route => router.addRoute('layout', route))
        userInfo.value.userMenuRoutes = [...constantRoute, ...userAsyncRoutes]
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    // 退出登录
    const userLogout = async () => {
      const res: logoutResponseData = await reqLogout()
      if (res.code === 200) {
        // 退出成功
        userInfo.value.token = ''
        userInfo.value.username = ''
        userInfo.value.avatar = ''
        userInfo.value.userMenuRoutes = []
        userInfo.value.asyncRoutes = []
        userInfo.value.buttonsArr = []
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
    // 用户登录
    return {
      userInfo,
      userLogin,
      getUserInfo,
      userLogout
    }
  },
  {
    persist: {
      paths: ['userInfo.token', 'userInfo.username', 'userInfo.avatar', 'userInfo.userMenuRoutes']
    }
  }
)
