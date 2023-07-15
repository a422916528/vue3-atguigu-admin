// 公共类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 每条账号信息的类型
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: number
  roleName?: string
}
// 全部用户信息
export type Records = User[]
// 获取全部已有用户的账号信息接口返回的数据类型
export interface ResUserData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

// 每一个职位的类型
export interface RoleData {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
// 全部职位列表
export type AllRole = RoleData[]
// 获取全部职位接口返回的数据类型
export interface ResAllRoleData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

// 给用户分配职位携带参数类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
// 给已有的用户分配角色接口的数据类型
