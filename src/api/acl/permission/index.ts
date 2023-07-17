// 菜单管理接口
import request from '@/utils/request'
import type { ResMenuData } from './type'

enum API {
  // 获取全部菜单
  ALLPERMISSION_URL = '/admin/acl/permission'
}

// 获取全部菜单
export const reqAllPermission = () => {
  return request.get<any, ResMenuData>(API.ALLPERMISSION_URL)
}
