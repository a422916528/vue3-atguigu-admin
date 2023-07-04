<script setup lang="ts">
  import Category from '@/views/layout/components/category/index.vue'
  import { useCategoryStore } from '@/stores/category'
  import { onMounted } from 'vue'
  const categoryStore = useCategoryStore()
  onMounted(() => {
    // 获取一级分类的数据
    categoryStore.getCategory1Data()
  })
</script>

<template>
  <Category :category1="(categoryStore.category1Data as any)"></Category>
  <el-card shadow="hover" style="margin: 20px 0">
    <el-button type="primary" icon="Plus" :disabled="categoryStore.category3Id ? false : true">
      添加属性
    </el-button>
    <el-table border style="margin-top: 20px">
      <el-table-column label="序号" width="90px"></el-table-column>
      <el-table-column label="属性名称"></el-table-column>
      <el-table-column label="属性值名称"></el-table-column>
      <el-table-column label="操作" width="160px">
        <el-popconfirm title="您确定要删除吗？">
          <template #reference>
            <el-button type="danger" icon="Delete"></el-button>
          </template>
        </el-popconfirm>
        <el-button type="primary" icon="Edit"></el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
