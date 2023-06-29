// 用户相关接口
import request from '@/utils/request'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}
// 登录接口
export const reqLogin = (data: any) => {
  return request.post<any, any>(API.LOGIN_URL, data)
}

// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, any>(API.USERINFO_URL)
}

// 退出登录
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
