// 属性管理相关接口
import request from '@/utils/request'
import type { CategoryResponseData } from './type'
enum API {
  // 获取1级分类接口
  Category_1_URL = '/admin/product/getCategory1',
  // 获取2级分类接口
  Category_2_URL = '/admin/product/getCategory2/',
  // 获取3级分类接口
  Category_3_URL = '/admin/product/getCategory3/'
}

// 获取一级分类
export const reqCategory1 = () => request.get<any, CategoryResponseData>(API.Category_1_URL)
// 获取二级分类
export const reqCategory2 = (category1Id: number) =>
  request.get<any, CategoryResponseData>(API.Category_2_URL + category1Id)
// 获取三级分类
export const reqCategory3 = (category2Id: number) =>
  request.get<any, CategoryResponseData>(API.Category_3_URL + category2Id)
