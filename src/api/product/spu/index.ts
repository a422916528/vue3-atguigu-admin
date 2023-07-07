// SPU 管理接口
import request from '@/utils/request'
import type { ResSPUData } from './type'

enum API {
  HASSPU_URL = 'admin/product/'
}
// 获取某一个三级分类下已有的 SPU 数据
export const reqHasSPU = (page: number, limit: number, category3Id: number | string) =>
  request.get<any, ResSPUData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
