// 用户接口数据相关类型

// 登录接口携带参数类型
export interface loginFromData {
  username: string
  password: string
}

// 所有接口返回的公有类型
interface responseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回的类型
export interface loginResponseData extends responseData {
  data: string
}

// 获取用户信息返回的类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

// 退出登录返回的类型
export interface logoutResponseData extends responseData {
  data: any
}
