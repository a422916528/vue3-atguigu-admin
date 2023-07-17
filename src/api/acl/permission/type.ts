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
