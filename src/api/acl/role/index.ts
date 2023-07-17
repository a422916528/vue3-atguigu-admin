// 角色管理接口
import request from '@/utils/request'
import type { ResAllRoleData, RoleData, ResponseData, ResMenuData } from './type'

enum API {
  // 获取全部职位
  ALLROLE_URL = '/admin/acl/role/',
  // 添加职位
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新职位
  UPDATE_URL = '/admin/acl/role/update',
  // 根据角色获取菜单
  ROLEPERMISSION = '/admin/acl/permission/toAssign/',
  // 给相应的职位分配权限
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/',
  // 删除职位
  DELPERMISSION_URL = '/admin/acl/role/remove/'
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
// 根据角色获取菜单
export const reqRolePermission = (roleId: number) => {
  return request.get<any, ResMenuData>(API.ROLEPERMISSION + roleId)
}
// 给相应的职位分配权限
export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, ResponseData>(
    API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`
  )
}
// 删除职位
export const reqRemovePermission = (id: number) => {
  return request.delete<any, ResponseData>(API.DELPERMISSION_URL + id)
}
