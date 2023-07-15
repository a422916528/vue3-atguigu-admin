// 用户管理相关接口
import request from '@/utils/request'
import type { ResUserData, User, ResponseData } from './type'

enum API {
  // 获取全部已有用户的账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update'
}

// 获取全部已有用户的账号信息
export const reqUserInfo = (page: number, limit: number) => {
  return request.get<any, ResUserData>(API.ALLUSER_URL + `${page}/${limit}`)
}
// 添加用户与修改用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    // 更新
    return request.post<any, ResponseData>(API.UPDATEUSER_URL, data)
  } else {
    // 添加
    return request.post<any, ResponseData>(API.ADDUSER_URL, data)
  }
}
