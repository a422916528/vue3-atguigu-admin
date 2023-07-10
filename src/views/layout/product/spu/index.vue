<script setup lang="ts">
  import Category from '@/views/layout/components/category/index.vue'
  import SpuForm from './components/SpuForm.vue'
  import SkuForm from './components/SkuForm.vue'
  import { ref, watch, onMounted } from 'vue'
  import { useCategoryStore } from '@/stores/category'
  import { reqHasSPU } from '@/api/product/spu/index'
  import { SPUListData, SPUData } from '@/api/product/spu/type'

  // 场景切换变量
  const scene = ref(2) // 0: 显示已有的 SPU，1：添加 | 修改 SPU，2：添加 SKU
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
  // 点击添加 SKU 按钮的回调
  const addSku = () => {
    // 切换场景2
    scene.value = 2
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
              @click="addSku"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="Edit"
              title="修改"
              @click="update(row)"
            ></el-button>
            <el-button type="primary" size="small" icon="View" title="查看"></el-button>
            <el-button type="danger" size="small" icon="Delete" title="删除"></el-button>
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
    <SkuForm v-show="scene === 2"></SkuForm>
  </el-card>
</template>

<style lang="scss" scoped></style>
