<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import Category from '@/views/layout/components/category/index.vue'
  import SpuForm from './components/SpuForm.vue'
  import SkuForm from './components/SkuForm.vue'
  import { ref, watch, onMounted } from 'vue'
  import { useCategoryStore } from '@/stores/category'
  import { reqHasSPU, reqSkuList, reqDelSpu } from '@/api/product/spu/index'
  import type { SPUListData, SPUData, ResSkuData } from '@/api/product/spu/type'

  // 场景切换变量
  const scene = ref(0) // 0: 显示已有的 SPU，1：添加 | 修改 SPU，2：添加 SKU
  // 分页器当前页面
  const pageNo = ref(1)
  // 分页器每页显示多少条数
  const pageSize = ref(3)
  // SPU数据总数
  const total = ref(0)
  // 监听三级分类 id 发生变化
  const categoryStore = useCategoryStore()
  watch(
    () => categoryStore.category3Id,
    () => {
      if (categoryStore.category3Id) {
        // 调接口获取 SPU 数据
        getHasSPU()
      }
    }
  )
  // 存储 SPU 列表数据
  const records = ref<SPUListData>([])
  // 获取某一个三级分类的 SPU 方法
  const getHasSPU = async () => {
    const res = await reqHasSPU(pageNo.value, pageSize.value, categoryStore.category3Id)
    if (res.code === 200) {
      records.value = res.data.records
      total.value = res.data.total
    }
  }
  // 当前页码发生变化
  const pageOnChange = () => {
    getHasSPU()
  }
  // 每页展示的条数发生变化
  const pageSizeChange = () => {
    pageNo.value = 1
    getHasSPU()
  }
  // 是否禁用分类下拉菜单
  const disabled = ref(true)
  // 子组件 Spu 通知场景变化自定义事件回调
  const changeScene = (val: number) => {
    scene.value = val
    getHasSPU()
  }
  // 获取子组件 SpuForm 实例
  const spuFormRef = ref(null)
  // 点击修改按钮的回调
  const update = (spu: SPUData) => {
    scene.value = 1
    disabled.value = false
    spuFormRef.value.initSpuData(spu)
  }
  // 点击添加 SPU 按钮的回调
  const addSpu = () => {
    spuFormRef.value.initAddSpu(categoryStore.category3Id)
    scene.value = 1
    pageNo.value = 1
  }
  // 获取子组件实例
  const skuFormRef = ref(null)
  // 点击添加 SKU 按钮的回调
  const addSku = (row: SPUData) => {
    // 切换场景2
    scene.value = 2
    // 调用子组件初始化方法
    skuFormRef.value.initSkuData(categoryStore.category1Id, categoryStore.category2Id, row)
  }

  // 存储 SPU 下 SKU 的数据
  const skuArr = ref<ResSkuData[]>([])
  // 点击查看 SKU 按钮的回调
  const findSku = async (row: SPUData) => {
    const res = await reqSkuList(row.id as number)
    console.log(res)
    if (res.code === 200) {
      skuArr.value = res.data
      // 显示 SKU 对话框
      show.value = true
    }
  }
  // 控制查看 SKU 详情显示或隐藏
  const show = ref(false)

  // 点击删除按钮的回调
  const deleteSpu = async (id: number) => {
    const res = await reqDelSpu(id)
    console.log(res)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getHasSPU()
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }
  onMounted(() => {
    // 获取一级分类的数据
    categoryStore.getCategory1Data()
  })
</script>

<template>
  <Category :category1="(categoryStore.category1Data as any)" :disabled="disabled"></Category>
  <el-card shadow="hover" style="margin-top: 20px">
    <div v-show="scene === 0">
      <el-button type="primary" icon="Plus" :disabled="!categoryStore.category3Id" @click="addSpu">
        添加SPU
      </el-button>
      <el-table border style="margin: 20px 0" :data="records">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="SPU操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"
              @click="addSku(row)"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="Edit"
              title="修改"
              @click="update(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="View"
              title="查看"
              @click="findSku(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确定要删除${row.spuName}吗?`"
              width="200px"
              @confirm="deleteSpu(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" title="删除"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="pageOnChange"
        @size-change="pageSizeChange"
      />
    </div>
    <!-- SPU 添加 | 修改子组件 -->
    <SpuForm v-show="scene === 1" ref="spuFormRef" @changeScene="changeScene"></SpuForm>
    <!-- SKU 子组件 -->
    <SkuForm v-show="scene === 2" ref="skuFormRef" @changeScene="changeScene"></SkuForm>
    <!-- 查看 SKU 详情 -->
    <el-dialog title="SKU列表" v-model="show">
      <el-table border :data="skuArr">
        <el-table-column label="SKU名字" prop="skuName"></el-table-column>
        <el-table-column label="SKU价格(元)" prop="price"></el-table-column>
        <el-table-column label="SKU重量(克)" prop="weight"></el-table-column>
        <el-table-column label="SKU图片">
          <template v-slot="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped></style>
