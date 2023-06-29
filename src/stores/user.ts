import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/user'
import type {
  loginFromData,
  loginResponseData,
  userInfoResponseData,
  logoutResponseData
} from '@/api/user/type'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户数据信息
    const userInfo = ref({
      token: '',
      username: '',
      avatar: ''
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
    persist: true
  }
)
