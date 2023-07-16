// 角色管理接口
import request from '@/utils/request'
import type { ResAllRoleData, RoleData, ResponseData } from './type'

enum API {
  // 获取全部职位
  ALLROLE_URL = '/admin/acl/role/',
  // 添加职位
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新职位
  UPDATE_URL = '/admin/acl/role/update'
}

// 获取全部职位
export const reqAllRole = (page: number, limit: number, username: string) => {
  return request.get<any, ResAllRoleData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${username}`
  )
}
// 添加和更新职位
export const reqAddOrUpdate = (data: RoleData) => {
  if (data.id) {
    // 更新职位
    return request.put<any, ResponseData>(API.ADDROLE_URL, data)
  } else {
    // 添加职位
    return request.post<any, ResponseData>(API.ADDROLE_URL, data)
  }
}
