// 品牌管理接口数据相关类型

// 公共类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 已有品牌类型
interface Trademark {
  id?: number
  tmName: string
  logoUrl: string
}

// 包含所有品牌数据的类型
export type Records = Trademark[]

// 获取已有全部的品牌数据类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
