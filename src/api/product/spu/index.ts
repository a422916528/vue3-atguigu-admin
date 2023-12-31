// SPU 管理接口
import request from '@/utils/request'
import type {
  ResponseData,
  ResSPUData,
  ResAllTrademarkData,
  ResSpuImageData,
  ResSaleAttrData,
  ResHasSaleAttr,
  SPUData,
  ResSkuData,
  SkuInfoData
} from './type'

enum API {
  // 获取已有 SPU 数据
  HASSPU_URL = 'admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = 'admin/product/baseTrademark/getTrademarkList',
  // 获取 SPU 下品牌图片的数据
  IMAGE_URL = 'admin/product/spuImageList/',
  // 获取 SPU 下已有的销售属性数据
  SALEATTR_URL = 'admin/product/spuSaleAttrList/',
  // 获取全部的销售属性[颜色、版本、尺码]
  ALLSALEATTR_URL = 'admin/product/baseSaleAttrList/',
  // 追加新的 SPU
  ADDSPU_URL = 'admin/product/saveSpuInfo',
  // 更新已有的 SPU
  UPDATESPU_URL = 'admin/product/updateSpuInfo',
  // 添加一个 SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查看某一个已有的 SPU 下的全部 SKU
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除某一个 SPU
  DELETESPU_URL = 'admin/product/deleteSpu/'
}

// 获取某一个三级分类下已有的 SPU 数据
export const reqHasSPU = (page: number, limit: number, category3Id: number | string) => {
  return request.get<any, ResSPUData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  )
}
// 获取全部 SPU 品牌的数据
export const reqAllTrademark = () => {
  return request.get<any, ResAllTrademarkData>(API.ALLTRADEMARK_URL)
}
// 获取某一个 SPU 下全部商品的图片数据
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, ResSpuImageData>(API.IMAGE_URL + spuId)
}
// 获取 SPU 下已有的销售属性数据
export const reqSpuSaleAttr = (spuId: number) => {
  return request.get<any, ResSaleAttrData>(API.SALEATTR_URL + spuId)
}
// 获取全部的销售属性[颜色、版本、尺码]
export const reqAllSaleAttr = () => {
  return request.get<any, ResHasSaleAttr>(API.ALLSALEATTR_URL)
}
// 添加 | 更新 SPU
export const reqAddOrUpdateSpu = (data: SPUData) => {
  if (data.id) {
    // 更新
    return request.post<any, ResponseData>(API.UPDATESPU_URL, data)
  } else {
    // 添加
    return request.post<any, ResponseData>(API.ADDSPU_URL, data)
  }
}
// 添加一个 SKU
export const reqAddSku = (sku: any) => {
  return request.post<any, ResSkuData>(API.ADDSKU_URL, sku)
}
// 查看某一个已有的 SPU 下的全部 SKU
export const reqSkuList = (skuId: number) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
}
// 删除某一个 SPU
export const reqDelSpu = (spuId: number) => {
  return request.delete<any, ResponseData>(API.DELETESPU_URL + spuId)
}
