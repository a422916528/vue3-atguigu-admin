<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { reqHasTrademark } from '@/api/product/trademark/index'
  import { TrademarkResponseData, Records } from '@/api/product/trademark/type'
  // 当前页数
  const pageOn = ref(1)
  // 每页展示多少条数据
  const limit = ref(5)
  // 已有品牌数据总数
  const total = ref(0)
  // 已有品牌数据
  const trademarkArr = ref<Records>([])
  // 获取已有品牌方法
  const getHasTrademark = async () => {
    const res: TrademarkResponseData = await reqHasTrademark(pageOn.value, limit.value)
    if (res.code === 200) {
      total.value = res.data.total
      trademarkArr.value = res.data.records
    }
  }
  // 条/页被点击时
  const sizeChange = (size: number) => {
    limit.value = size
    pageOn.value = 1
    getHasTrademark()
  }
  // 页面数被改变时
  const currentChange = (page: number) => {
    pageOn.value = page
    getHasTrademark()
  }
  onMounted(() => {
    getHasTrademark()
  })
</script>

<template>
  <el-card class="box-card" shadow="hover">
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格 -->
    <el-table border style="width: 100%; margin-top: 20px" :data="trademarkArr">
      <el-table-column prop="id" label="序号" width="150" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌logo">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="图片丢失" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageOn"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      layout=" prev, pager, next, ->, jumper, sizes, total"
      :total="total"
      style="margin-top: 20px"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </el-card>
</template>

<style lang="scss" scoped></style>
