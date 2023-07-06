// 属性管理相关接口
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr, ResponseData } from './type'
enum API {
  // 获取1级分类接口
  Category_1_URL = '/admin/product/getCategory1',
  // 获取2级分类接口
  Category_2_URL = '/admin/product/getCategory2/',
  // 获取3级分类接口
  Category_3_URL = '/admin/product/getCategory3/',
  // 获取分类下的属性值接口
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或者修改属性和属性值的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除某一个已有的属性
  DELETEATTR_URL = 'admin/product/deleteAttr/'
}

// 获取一级分类
export const reqCategory1 = () => request.get<any, CategoryResponseData>(API.Category_1_URL)
// 获取二级分类
export const reqCategory2 = (category1Id: number) =>
  request.get<any, CategoryResponseData>(API.Category_2_URL + category1Id)
// 获取三级分类
export const reqCategory3 = (category2Id: number) =>
  request.get<any, CategoryResponseData>(API.Category_3_URL + category2Id)
// 获取分类下已有的属性值
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) =>
  request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
// 添加或者修改属性和属性值
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, ResponseData>(API.ADDORUPDATEATTR_URL, data)
// 删除某一个已有属性
export const reqDeleteAttr = (id: number) =>
  request.delete<any, ResponseData>(API.DELETEATTR_URL + id)
