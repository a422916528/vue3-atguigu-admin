// 返回的公共的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 返回已有的 SPU 的数据类型
export interface ResSPUData extends ResponseData {
  data: {
    records: SPUListData
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
// 每一条 SPU 的数据类型
interface SPUData {
  id?: number | string
  spuName: string
  description: string
  category3Id: number | string
  // 对应的品牌 id
  tmId: number | string
  // 存储销售属性
  spuSaleAttrList: null
  // SPU 照片
  spuImageList: null
}
// 获取 SPU 列表的数据
export type SPUListData = SPUData[]
