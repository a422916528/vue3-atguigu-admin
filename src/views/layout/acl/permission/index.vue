<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { reqAllPermission } from '@/api/acl/permission/index'
  import type {} from '@/api/acl/permission/type'
  // #region 数据渲染
  const tableData = ref([])
  // 获取全部菜单数据
  const getPermission = async () => {
    const res = await reqAllPermission()
    console.log(res)
    if (res.code === 200) {
      tableData.value = res.data
    }
  }
  onMounted(() => {
    getPermission()
  })
  // #endregion
</script>

<template>
  <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button size="small" type="primary" :disabled="row.level === 4 ? true : false">
          {{ row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button size="small" type="primary" :disabled="row.level === 1 ? true : false">
          编辑
        </el-button>
        <el-button size="small" type="primary" :disabled="row.level === 1 ? true : false">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped></style>
