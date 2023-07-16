<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { reqAllRole } from '@/api/acl/role/index'
  import type { AllRole } from '@/api/acl/role/type'
  // 当前页数
  const pageOn = ref(1)
  // 每页条数
  const limit = ref(10)
  // 总数
  const total = ref(100)
  // 搜索职位的关键词
  const keyWord = ref('')
  // 存储职位列表
  const roleArr = ref<AllRole>([])
  // 获取已有的职位列表
  const getRole = async () => {
    const res = await reqAllRole(pageOn.value, limit.value, keyWord.value)
    if (res.code === 200) {
      roleArr.value = res.data.records
      total.value = res.data.total
    }
  }
  // 每页条数发生改变的回调
  const handleSizeChange = () => {
    getRole()
  }
  // 当前页数发生改变的回调
  const handleCurrentChange = () => {
    getRole()
  }
  onMounted(() => {
    getRole()
  })
</script>

<template>
  <el-card shadow="hover">
    <el-form inline style="display: flex; justify-content: space-between">
      <el-form-item label="搜索职位：">
        <el-input placeholder="请输入职位" v-model="keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card shadow="hover" style="margin-top: 20px">
    <el-button type="primary" icon="Plus">添加职位</el-button>
    <!-- 表格 -->
    <el-table border style="margin-top: 20px" :data="roleArr">
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column label="id" align="center" width="80px" prop="id"></el-table-column>
      <el-table-column label="职位名称" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center" width="340px">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="User">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit">编辑角色</el-button>
          <el-popconfirm :title="`你确定要删除吗?`" width="240px">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除角色</el-button>
            </template>
          </el-popconfirm>
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
  .el-form-item {
    margin-bottom: 0;
  }
</style>
