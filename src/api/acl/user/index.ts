// 用户管理相关接口
import request from '@/utils/request'
import type { ResUserData } from './type'

enum API {
  // 获取全部已有用户的账号信息
  ALLUSER_URL = '/admin/acl/user/'
}

// 获取全部已有用户的账号信息
export const reqUserInfo = (page: number, limit: number) => {
  return request.get<any, ResUserData>(API.ALLUSER_URL + `${page}/${limit}`)
}
