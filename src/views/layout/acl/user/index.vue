<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { reqUserInfo } from '@/api/acl/user/index'
  import type { Records } from '@/api/acl/user/type'
  // 当前页码
  const pageOn = ref(1)
  // 每页条数
  const limit = ref(5)
  // 总数
  const total = ref(0)
  // 存储用户信息
  const userInfoArr = ref<Records>([])
  // 页码数发生改变的回调
  const handleCurrentChange = () => {
    getUserInfo()
  }
  // 每页条数发生改变的回调
  const handleSizeChange = () => {
    pageOn.value = 1
    getUserInfo()
  }
  // 获取所有已有的用户信息
  const getUserInfo = async () => {
    const res = await reqUserInfo(pageOn.value, limit.value)
    console.log(res)
    if (res.code === 200) {
      userInfoArr.value = res.data.records
      total.value = res.data.total
    }
  }
  onMounted(() => {
    getUserInfo()
  })
</script>

<template>
  <el-card shadow="hover">
    <el-form inline>
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card shadow="hover" style="margin-top: 20px">
    <el-button type="primary">添加</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin-top: 20px" :data="userInfoArr">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" width="50px" align="center" type="index"></el-table-column>
      <el-table-column label="ID" width="80px" prop="id"></el-table-column>
      <el-table-column label="用户名字" prop="username"></el-table-column>
      <el-table-column label="用户名称" prop="name"></el-table-column>
      <el-table-column label="用户角色" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" width="200px" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" width="200px" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="320px" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="User">分类角色</el-button>
          <el-button type="primary" size="small" icon="Edit">编辑角色</el-button>
          <el-button type="primary" size="small" icon="Delete">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageOn"
      v-model:page-size="limit"
      :page-sizes="[5, 7, 9, 10]"
      :background="true"
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px"
    />
  </el-card>
</template>

<style lang="scss" scoped>
  .el-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
