<script setup lang="ts">
  import { ref } from 'vue'
  // 分页器当前页
  const pageNo = ref(0)
  // 每一页展示几条数据
  const pageSize = ref(10)
  // 数据总条数
  const total = ref(100)
  // 当前页数发生改变回调
  const handleCurrentChange = () => {
    console.log(123)
  }
</script>

<template>
  <el-card>
    <el-table border>
      <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column label="默认图片">
        <template v-slot="{ row }">
          <img src="" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(克)"></el-table-column>
      <el-table-column label="价格(元)"></el-table-column>
      <el-table-column label="操作" fixed="right"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="handleCurrentChange"
      style="margin-top: 20px"
    />
  </el-card>
</template>

<style lang="scss" scoped></style>
