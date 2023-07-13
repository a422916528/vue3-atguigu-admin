<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {
    reqSkuList,
    reqOnSaleSKu,
    reqCancelSaleSku,
    reqSkuInfo,
    reqDelSku
  } from '@/api/product/sku/index'
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
  // 商品的上架与下架
  const updateSale = async (row: SkuData) => {
    if (row.isSale === 0) {
      // 商品正在上架，点击更新为下架
      const res = await reqCancelSaleSku(row.id)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '下架成功'
        })
        getSku()
      }
    } else {
      // 商品已经下架，点击更新为上架
      const res = await reqOnSaleSKu(row.id)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '上架成功'
        })
        getSku()
      }
    }
  }
  // 点击删除按钮的回调
  const deleteSku = async (row: SkuData) => {
    const res = await reqDelSku(row.id)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      if (skuData.value.length === 1) {
        pageNo.value--
      }
      getSku()
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }
  // 点击编辑按钮的回调
  const toLook = () => {
    ElMessage({
      type: 'success',
      message: '此功能还在开发中~~~'
    })
  }
  // 控制商品详情抽屉的显示与隐藏
  const drawer = ref(false)
  // 存储 SKU 详情
  const skuInfo = ref<SkuData>({})
  // 点击详情按钮的回调
  const infoShow = async (skuId: number) => {
    drawer.value = true
    const res = await reqSkuInfo(skuId)
    skuInfo.value = res.data
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
          <el-button
            :type="row.isSale === 1 ? 'info' : 'primary'"
            size="small"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            :title="row.isSale === 1 ? '已下架，点击上架' : '已上架，点击下架'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="info" size="small" icon="Edit" title="编辑" @click="toLook"></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            title="详情"
            @click="infoShow(row.id)"
          ></el-button>
          <el-popconfirm title="你确定要删除吗?" width="200px" @confirm="deleteSku(row)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete" title="删除"></el-button>
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
    <!-- 抽屉组件，展示商品详情 -->
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>商品详情</span>
      <el-row>
        <el-col :span="8">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="item in skuInfo.skuAttrValueList"
            :key="item.id"
            style="margin: 0 10px 10px 0"
          >
            {{ item.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">销售属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="item in skuInfo.skuSaleAttrValueList"
            :key="item.id"
            style="margin: 0 10px 10px 0"
          >
            {{ item.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">商品图片</el-col>
        <el-col :span="16">
          <div class="block text-center">
            <el-carousel height="150px" trigger="click">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>

<style lang="scss" scoped>
  .el-row {
    margin-top: 20px;
  }
  .demonstration {
    color: var(--el-text-color-secondary);
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
