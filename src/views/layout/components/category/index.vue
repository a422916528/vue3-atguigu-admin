<script setup lang="ts">
  import { ref } from 'vue'
  import { useCategoryStore } from '@/stores/category'
  const categoryStore = useCategoryStore()
  defineProps({
    // 一级分类数据
    category1: {
      type: Array,
      default: () => []
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  })
  // 存储一级分类的 id
  const category1Id = ref<number | string>('')
  // 存储二级分类的 id
  const category2Id = ref<number | string>('')
  // 存储三级分类的 id
  const category3Id = ref<number | string>('')
  // 一级分类下拉列表被选中时的回调
  const select1Change = (id: number) => {
    // 先清空二级的 id 和三级分类的 id 及数据
    category2Id.value = ''
    categoryStore.getCategory2Id('')
    category3Id.value = ''
    categoryStore.getCategory3Id('')
    categoryStore.clearCategory3Data()
    // 将 一级分类 id 存储到仓库中
    categoryStore.getCategory1Id(id)
    // 同时获取二级分类的数据
    categoryStore.getCategory2Data()
  }

  // 二级分类下拉列表被选中时的回调
  const select2Change = (id: number) => {
    // 先清空三级分类的 id
    category3Id.value = ''
    categoryStore.getCategory3Id('')
    // 将二级分类 id 存储到仓库中
    categoryStore.getCategory2Id(id)
    // 同时获取三级分类的数据
    categoryStore.getCategory3Data()
  }
  // 三级分类下拉列表被选中时的回调
  const select3Change = (id: number) => {
    // 将三级分类 id 存储到仓库中
    categoryStore.getCategory3Id(id)
  }
</script>

<template>
  <el-card shadow="hover">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          class="m-2"
          placeholder="请选择"
          size="large"
          v-model="category1Id"
          :disabled="!disabled"
          @change="select1Change"
        >
          <el-option
            v-for="c1 in (category1 as any)"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          class="m-2"
          placeholder="请选择"
          size="large"
          v-model="category2Id"
          :disabled="!disabled"
          @change="select2Change"
        >
          <el-option
            v-for="c2 in (categoryStore.category2Data as any)"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          class="m-2"
          placeholder="请选择"
          size="large"
          v-model="category3Id"
          :disabled="!disabled"
          @change="select3Change"
        >
          <el-option
            v-for="c3 in (categoryStore.category3Data as any)"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
