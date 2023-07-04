// 属性管理相关接口的 ts 类型

// 公共数据类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类中 data 的数据类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id: number
}

// 分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
