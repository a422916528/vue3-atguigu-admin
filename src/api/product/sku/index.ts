// SKU 相关接口
import request from '@/utils/request'
import type { ResSkuData, ResponseData } from './type'
enum API {
  // 获取已有的商品数据
  SKU_URL = '/admin/product/list/',
  // 上架商品
  ONSALE_URL = '/admin/product/onSale/',
  // 下架商品
  CANCELSALE_URL = '/admin/product/cancelSale/'
}

// 获取已有的商品数据
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, ResSkuData>(API.SKU_URL + `${page}/${limit}`)
}
// 上架商品
export const reqOnSaleSKu = (skuId: number) => {
  return request.get<any, ResponseData>(API.ONSALE_URL + skuId)
}
// 下架商品
export const reqCancelSaleSku = (skuId: number) => {
  return request.get<any, ResponseData>(API.CANCELSALE_URL + skuId)
}
