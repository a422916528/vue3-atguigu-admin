// SKU 相关接口
import request from '@/utils/request'
import type { ResSkuData } from './type'
enum API {
  // 获取已有的商品数据
  SKU_URL = '/admin/product/list/'
}

// 获取已有的商品数据
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, ResSkuData>(API.SKU_URL + `${page}/${limit}`)
}
