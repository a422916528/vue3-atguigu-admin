<script setup lang="ts">
  import Category from '@/views/layout/components/category/index.vue'
  import { useCategoryStore } from '@/stores/category'
  import { onMounted, watch, ref, nextTick } from 'vue'
  import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr/index'
  import { AttrList, Attr } from '@/api/product/attr/type'
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
  const flag = ref(true)
  // 点击取消按钮的回调
  const cancel = () => {
    flag.value = true
    // 清空数据
    Object.assign(attrAddParams.value, {
      // 属性名称
      attrName: '',
      // 属性值列表
      attrValueList: [],
      // 属于哪一个三级分类
      categoryId: '',
      // 代表 3 级分类
      categoryLevel: 3
    })
  }
  // 收集新增属性的数据
  const attrAddParams = ref<Attr>({
    // 属性名称
    attrName: '',
    // 属性值列表
    attrValueList: [],
    // 属于哪一个三级分类
    categoryId: '',
    // 代表 3 级分类
    categoryLevel: 3
  })
  // 点击添加属性按钮的回调
  const addAttr = () => {
    // 如果输入的属性值为空，则不添加数据
    if (attrValueisEmpty())
      // eslint-disable-next-line no-undef
      return ElMessage({
        type: 'warning',
        message: '属性值不能为空'
      })
    // 点击添加向 attrValueList 添加数据
    attrAddParams.value.attrValueList.push({
      valueName: '',
      show: true
    })
    // input 获得焦点
    nextTick(() => {
      inputArr.value[attrAddParams.value.attrValueList.length - 1].focus()
    })
  }
  // 判断属性值中是否有为空的方法
  const attrValueisEmpty = () => {
    if (attrAddParams.value.attrValueList.length > 0) {
      if (attrAddParams.value.attrValueList.find(item => item.valueName === ''))
        // eslint-disable-next-line no-undef
        return true
    } else {
      return false
    }
  }
  // 点击保存按钮的回调
  const save = async () => {
    // 收集三级分类的 id
    attrAddParams.value.categoryId = categoryStore.category3Id
    // 不填写属性值
    if (attrAddParams.value.attrValueList.length === 0) {
      // eslint-disable-next-line no-undef
      return ElMessage({
        type: 'warning',
        message: '请填写属性值'
      })
    }
    // 属性值其中有空数据
    if (attrValueisEmpty())
      // eslint-disable-next-line no-undef
      return ElMessage({
        type: 'warning',
        message: '属性值不能为空'
      })
    // 发起接口请求
    const res = await reqAddOrUpdateAttr(attrAddParams.value)
    if (res.code === 200) {
      flag.value = true
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'success',
        message: attrAddParams.value.id ? '修改成功' : '添加成功'
      })
      getAttr()
    } else {
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
    }
    // 清空数据
    Object.assign(attrAddParams.value, {
      // 属性名称
      attrName: '',
      // 属性值列表
      attrValueList: [],
      // 属于哪一个三级分类
      categoryId: '',
      // 代表 3 级分类
      categoryLevel: 3
    })
  }
  // 添加属性值失去焦点的回调
  const toLook = row => {
    // 不能为空
    if (row.valueName === '') {
      // eslint-disable-next-line no-undef
      return ElMessage({
        type: 'warning',
        message: '属性值不能为空'
      })
    }
    // 属性值不能相同
    if (
      attrAddParams.value.attrValueList.find(item => {
        if (item !== row) {
          if (item.valueName === row.valueName) {
            return true
          } else {
            return false
          }
        }
      })
    ) {
      row.valueName = ''
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'warning',
        message: '属性值不能相同'
      })
      return
    }
    row.show = false
  }
  // 添加属性值点击进入编辑模式的回调
  const toEdit = (row, index: number) => {
    row.show = true
    // input 获得焦点
    nextTick(() => {
      inputArr.value[index].focus()
    })
  }
  // input 获得焦点的数组
  const inputArr = ref([])
  // 点击编辑按钮修改已有的属性的回调
  const updateAttr = (row: Attr) => {
    flag.value = false
    Object.assign(attrAddParams.value, JSON.parse(JSON.stringify(row)))
  }
  //点击删除按钮删除某一个已有的属性方法回调
  const deleteAttr = async (id: number) => {
    const res = await reqDeleteAttr(id)
    if (res.code === 200) {
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getAttr()
    }
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
            <el-popconfirm title="您确定要删除吗？" width="200" @confirm="deleteAttr(row.id)">
              <template #reference>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateAttr(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 属性添加或编辑结构 -->
    <div v-else>
      <el-form :inline="true" v-model="attrAddParams">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model.trim="attrAddParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" :disabled="attrAddParams.attrName ? false : true" @click="addAttr">
        添加属性值
      </el-button>
      <el-table style="margin: 10px 0" border :data="attrAddParams.attrValueList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="属性值">
          <template v-slot="{ row, $index }">
            <!-- 编辑属性值 -->
            <el-input
              placeholder="请输入属性值名称"
              v-model.trim="row.valueName"
              v-if="row.show"
              :ref="(el:HTMLElement) => inputArr[$index] = el"
              @blur="toLook(row)"
            ></el-input>
            <!-- 展示属性值 -->
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template v-slot="{ $index }">
            <el-button
              icon="Delete"
              type="danger"
              size="small"
              @click="attrAddParams.attrValueList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" icon="Plus" @click="save">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
  .el-popconfirm__main {
    font-size: 12px;
  }
</style>
