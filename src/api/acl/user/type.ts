// 公共类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 每条账号信息的类型
export interface User {
  id?: number
  createTime: string
  updateTime: string
  username?: string
  password?: string
  name?: string
  phone: null
  roleName: string
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
