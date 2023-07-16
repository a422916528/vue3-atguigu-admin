// 角色管理接口
import request from '@/utils/request'
import type { ResAllRoleData } from './type'

enum API {
  // 获取全部职位
  ALLROLE_URL = '/admin/acl/role/'
}

// 获取全部职位
export const reqAllRole = (page: number, limit: number, username: string) => {
  return request.get<any, ResAllRoleData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${username}`
  )
}
