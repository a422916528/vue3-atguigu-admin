// 用户相关接口
import request from '@/utils/request'
import type {
  loginFromData,
  loginResponseData,
  userInfoResponseData,
  logoutResponseData
} from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}
// 登录接口
export const reqLogin = (data: loginFromData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL)
}

// 退出登录
export const reqLogout = () => {
  return request.post<any, logoutResponseData>(API.LOGOUT_URL)
}
