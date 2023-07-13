// 公共类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// SKU 的对象类型
export interface SkuData {
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string //sku名字
  price: string | number //sku价格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList?: AttrValueListData[]
  skuSaleAttrValueList?: SaleAttrValueListData[]
  skuDefaultImg: string // sku 图片地址
}
// 平台属性的数据类型
interface AttrValueListData {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
}
// 销售属性的数据类型
interface SaleAttrValueListData {
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
}
// 获取 SKU 接口返回的类型
export interface ResSkuData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
