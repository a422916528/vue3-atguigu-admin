// 菜单管理接口
import request from '@/utils/request'
import type { ResMenuData, MenuParams, ResponseData } from './type'

enum API {
  // 获取全部菜单
  ALLPERMISSION_URL = '/admin/acl/permission',
  // 给某一级新增子菜单
  ADDMENU_URL = '/admin/acl/permission/save',
  // 更新某一个已有的菜单
  UPDATE_URL = '/admin/acl/permission/update',
  // 删除菜单
  DELMENU_URL = '/admin/acl/permission/remove/'
}

// 获取全部菜单
export const reqAllPermission = () => {
  return request.get<any, ResMenuData>(API.ALLPERMISSION_URL)
}
// 添加与更新菜单
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    // 更新
    return request.put<any, ResponseData>(API.UPDATE_URL, data)
  } else {
    // 添加
    return request.post<any, ResponseData>(API.ADDMENU_URL, data)
  }
}
// 删除菜单
export const reqRemoveMenu = (id: number) => {
  return request.delete<any, ResponseData>(API.DELMENU_URL + id)
}
