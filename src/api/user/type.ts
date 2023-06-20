// 登录接口携带参数类型
export interface loginForm {
  username: string
  password: string
}
interface dataType {
  token?: string
  message?: string
}
// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}
//用户信息返回类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  router: string
}
interface user {
  checkUser: userInfo
}
export interface userResponseData {
  code: number
  data: user
}
