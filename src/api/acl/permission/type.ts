export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 每一个菜单的数据类型
export interface MenuData {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuData[]
  select: boolean
}
// 菜单权限返回的数据类型
export interface ResMenuData extends ResponseData {
  data: MenuData[]
}

// 添加与修改菜单携带参数类型
export interface MenuParams {
  id?: number
  level: number | string
  name: string
  pid: number | string
  code: string
}
