// 用户管理相关接口
import request from '@/utils/request'
import type { ResUserData, User, ResponseData, ResAllRoleData, SetRoleData } from './type'

enum API {
  // 获取全部已有用户的账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部职位和当前账号拥有的职位
  ALLROLEURL = '/admin/acl/user/toAssign/',
  // 给已有的用户分配角色
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除账号
  DELETESELECTUSER_URL = '/admin/acl/user/remove/batchRemove'
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
// 获取全部职位和当前账号拥有的职位
export const reqAllRole = (userId: number) => {
  return request.get<any, ResAllRoleData>(API.ALLROLEURL + userId)
}
// 给已有的用户分配角色
export const reqSetRole = (data: SetRoleData) => {
  return request.post<any, ResponseData>(API.SETROLE_URL, data)
}
// 删除某一个账号
export const reqDelUser = (userId: number) => {
  return request.delete<any, ResponseData>(API.DELETEUSER_URL + userId)
}
// 批量删除账号
export const reqDelSelectUser = (idList: number[]) => {
  return request.delete<any, ResponseData>(API.DELETESELECTUSER_URL, { data: idList })
}
