// 公共类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 每一个职位的类型
export interface RoleData {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
// 全部职位的数组
export type AllRole = RoleData[]
// 获取全部职位接口返回的数据类型
export interface ResAllRoleData extends ResponseData {
  data: {
    records: AllRole
    total: number
    size: number
    current: number
    page: number
  }
}
