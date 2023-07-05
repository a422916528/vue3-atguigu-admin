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

// 属性值对象的数据类型
export interface AttrData {
  id: number
  valueName: string
  attrId: number
}
// 存储每一个属性值的数据类型
export type AttrValueList = AttrData[]
// 属性的数据类型
interface Attr {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
}
// 存储每一个属性对象的数组类型
export type AttrList = Attr[]
// 属性接口返回的数据类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
