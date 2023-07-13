<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { reqSkuList } from '@/api/product/sku/index'
  import type { SkuData } from '@/api/product/sku/type'
  // 分页器当前页
  const pageNo = ref(1)
  // 每一页展示几条数据
  const limit = ref(5)
  // 数据总条数
  const total = ref(100)
  // 存储 SKU 数据
  const skuData = ref<SkuData[]>([])
  // 当前页数发生改变回调
  const handleCurrentChange = () => {
    getSku()
  }
  // 条/页发送变化的回调
  const handleSizeChange = () => {
    pageNo.value = 1
    getSku()
  }
  // 获取 SKU 数据
  const getSku = async () => {
    const res = await reqSkuList(pageNo.value, limit.value)
    if (res.code === 200) {
      skuData.value = res.data.records
      total.value = res.data.total
    }
  }
  // 点击删除按钮的回调
  const deleteSku = (row: SkuData[]) => {
    console.log(row)
  }
  onMounted(() => {
    getSku()
  })
</script>

<template>
  <el-card>
    <el-table border :data="skuData" max-height="75vh">
      <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片">
        <template v-slot="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(克)" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" prop="price"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Top"></el-button>
          <el-button type="info" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="InfoFilled"></el-button>
          <el-popconfirm title="你确定要删除吗?" width="200px" @confirm="deleteSku(row)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[5, 10, 15, 20]"
      background
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      style="margin-top: 20px"
    />
  </el-card>
</template>

<style lang="scss" scoped></style>
