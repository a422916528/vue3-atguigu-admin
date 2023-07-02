//  品牌管理接口
import request from '@/utils/request'
import type { TrademarkResponseData, Trademark, ResponseData } from './type'
enum API {
  // 获取已有的品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_URL = 'admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_URL = `admin/product/baseTrademark/remove/`
}
// 获取已有的品牌接口
/**
 *
 * @param page 获取第几页，默认第一页
 * @param limit 获取几个已有品牌的数据
 */
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
}

// 添加与修改已有品牌接口方法
export const reqAddOrUpdataTrademark = (data: Trademark) => {
  if (data.id) {
    // 修改
    return request.put<any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 新增
    return request.post<any, ResponseData>(API.ADDTRADEMARK_URL, data)
  }
}
// 删除已有品牌
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, ResponseData>(API.DELETE_URL + id)
}
