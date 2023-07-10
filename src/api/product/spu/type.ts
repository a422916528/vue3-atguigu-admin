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
export interface SPUData {
  id?: number | string
  spuName: string
  description: string
  category3Id: number | string
  // 对应的品牌 id
  tmId: number | string
  // 存储销售属性
  spuSaleAttrList: null | SaleAttrData[]
  // SPU 照片
  spuImageList: null | SpuImageData[]
}
// 获取 SPU 列表的数据类型
export type SPUListData = SPUData[]

// 每一个品牌数据的类型
export interface TrademarkData {
  id: number
  tmName: string
  logoUrl: string
}
// 品牌接口返回的数据类型
export interface ResAllTrademarkData extends ResponseData {
  data: TrademarkData[]
}
// 商品图片的商品类型
export interface SpuImageData {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
// 图片接口返回的数据类型
export interface ResSpuImageData extends ResponseData {
  data: SpuImageData[]
}
// SPU 已有销售属性的类型
export interface SaleAttrData {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  flag?: boolean
  saleAttrValue?: string
  spuSaleAttrValueList: SaleAttrValueData[]
}
// 销售属性中值的类型
export interface SaleAttrValueData {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
// SPU 已有销售属性接口返回的数据类型
export interface ResSaleAttrData extends ResponseData {
  data: SaleAttrData[]
}
// 已有的销售属性的类型
export interface HasSaleAttr {
  id: number
  name: string
}
// 获取全部的销售属性接口返回的数据类型
export interface ResHasSaleAttr extends ResponseData {
  data: HasSaleAttr[]
}
