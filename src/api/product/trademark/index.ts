//  品牌管理接口
import request from '@/utils/request'
enum API {
  // 获取已有的品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/'
}
// 获取已有的品牌接口
/**
 *
 * @param page 获取第几页，默认第一页
 * @param limit 获取几个已有品牌的数据
 */
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any>(API.TRADEMARK_URL + `${page}/${limit}`)
}
