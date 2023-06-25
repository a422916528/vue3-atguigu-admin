import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user/user'
import type { loginForm } from '@/api/user/type'

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
    const userLogin = async (data: loginForm) => {
      const res = await reqLogin(data)
      if (res.code === 200) {
        // 登录成功
        userInfo.value.token = res.data.token
        return Promise.resolve('登录成功')
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }
    // 获取用户信息
    const getUserInfo = async () => {
      const { data: res } = await reqUserInfo()
      userInfo.value.avatar = res.checkUser.avatar
      userInfo.value.username = res.checkUser.username
    }
    // 用户登录
    return {
      userInfo,
      userLogin,
      getUserInfo
    }
  },
  {
    persist: true
  }
)
