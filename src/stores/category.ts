// 获取商品分类数据仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqCategory1, reqCategory2, reqCategory3 } from '@/api/product/attr/index'
import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'

export const useCategoryStore = defineStore('category', () => {
  // 一级分类的 id
  const category1Id = ref<number | string>('')
  // 一级分类的数据
  const category1Data = ref<CategoryObj>([])
  // 获取一级分类 id 的方法
  const getCategory1Id = (id: number) => {
    category1Id.value = id
  }
  // 获取一级分类数据的方法
  const getCategory1Data = async () => {
    const res: CategoryResponseData = await reqCategory1()
    if (res.code === 200) {
      category1Data.value = res.data
    }
  }
  // 二级分类的 id
  const category2Id = ref<number | string>('')
  // 二级分类的数据
  const category2Data = ref<CategoryObj>([])
  // 获取二级分类 id 的方法
  const getCategory2Id = (id: number | string) => {
    category2Id.value = id
  }
  // 获取二级分类数据的方法
  const getCategory2Data = async () => {
    const res: CategoryResponseData = await reqCategory2(category1Id.value as number)
    if (res.code === 200) {
      category2Data.value = res.data
    }
  }
  // 三级分类的 id
  const category3Id = ref<number | string>('')
  // 三级分类的数据
  const category3Data = ref<CategoryObj>([])
  // 获取三级分类 id 的方法
  const getCategory3Id = (id: number | string) => {
    category3Id.value = id
  }
  // 获取三级分类数据的方法
  const getCategory3Data = async () => {
    const res: CategoryResponseData = await reqCategory3(category2Id.value as number)
    if (res.code === 200) {
      category3Data.value = res.data
    }
  }
  // 清空三级分类数据的方法
  const clearCategory3Data = () => {
    category3Data.value = []
  }
  return {
    category1Id,
    category1Data,
    getCategory1Id,
    getCategory1Data,
    category2Id,
    category2Data,
    getCategory2Id,
    getCategory2Data,
    category3Id,
    category3Data,
    getCategory3Id,
    getCategory3Data,
    clearCategory3Data
  }
})
