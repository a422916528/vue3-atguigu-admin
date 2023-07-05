<script setup lang="ts">
  import Category from '@/views/layout/components/category/index.vue'
  import { useCategoryStore } from '@/stores/category'
  import { onMounted, watch, ref } from 'vue'
  import { reqAttr } from '@/api/product/attr/index'
  import { AttrList } from '@/api/product/attr/type'
  const categoryStore = useCategoryStore()
  // 监听三级分类 id, 发起获取属性请求
  watch(
    () => categoryStore.category3Id,
    () => {
      const { category3Id } = categoryStore
      // 当三级分类 id 不为 '' 才发请求
      if (category3Id !== '') {
        getAttr()
      }
      // 三级分类 id 发生变化情况已有的属性和属性值
      attrArr.value = []
    }
  )
  // 获取已有的属性与属性值方法
  const getAttr = async () => {
    const { category1Id, category2Id, category3Id } = categoryStore
    const res = await reqAttr(category1Id, category2Id, category3Id)
    if (res.code === 200) {
      attrArr.value = res.data
    }
  }
  // 储存已有属性与属性值
  const attrArr = ref<AttrList>([])

  // 切换属性查看和属性添加或编辑控制变量
  const flag = ref(false)
  // 点击取消按钮的回调
  const cancel = () => {
    flag.value = true
  }
  onMounted(() => {
    // 获取一级分类的数据
    categoryStore.getCategory1Data()
  })
</script>

<template>
  <Category :category1="(categoryStore.category1Data as any)" :disabled="flag"></Category>
  <el-card shadow="hover" style="margin: 20px 0">
    <!-- 属性查看结构 -->
    <div v-if="flag">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.category3Id ? false : true"
        @click="flag = false"
      >
        添加属性
      </el-button>
      <el-table border style="margin-top: 20px" :data="attrArr">
        <el-table-column label="序号" width="90px" type="index"></el-table-column>
        <el-table-column label="属性名称" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template v-slot="{ row }">
            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin-left: 10px">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template v-slot="{ row }">
            <el-popconfirm title="您确定要删除吗？">
              <template #reference>
                <el-button type="danger" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" icon="Edit" @click="flag = false"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 属性添加或编辑结构 -->
    <div v-else>
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary">添加属性值</el-button>
      <el-table style="margin: 10px 0" border>
        <el-table-column label="序号" width="80px" align="center"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="属性值操作"></el-table-column>
      </el-table>
      <el-button type="primary" icon="Plus">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
  .el-popconfirm__main {
    font-size: 12px;
  }
</style>
