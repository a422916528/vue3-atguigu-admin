<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { reqAllRole, reqAddOrUpdate } from '@/api/acl/role/index'
  import type { AllRole, RoleData } from '@/api/acl/role/type'
  // #region 数据展示
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
    pageOn.value = 1
    getRole()
  }
  // 当前页数发生改变的回调
  const handleCurrentChange = () => {
    getRole()
  }
  // 点击搜索按钮的回调
  const searchRole = () => {
    getRole()
    keyWord.value = ''
  }
  // 点击重置按钮的回调
  const reset = () => {
    getRole()
  }
  // #endregion

  onMounted(() => {
    getRole()
  })

  // #region 添加和修改职位
  // 收集职位数据
  const roleParams = ref<RoleData>({
    roleName: ''
  })
  // 点击添加职位按钮的回调
  const addRole = () => {
    dialogVisible.value = true
  }
  // 控制对话框显示或隐藏
  const dialogVisible = ref(false)
  // 对话框取消按钮的回调
  const cancel = () => {
    dialogVisible.value = false
  }
  // 获取表单实例
  const formRef = ref(null)
  // 对话框确定按钮的回调
  const confirm = async () => {
    // 对表单进行校验
    await formRef.value.validate()
    const res = await reqAddOrUpdate(roleParams.value)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: roleParams.value.id ? '修改成功' : '添加成功'
      })
      pageOn.value = roleParams.value.id ? pageOn.value : 1
      getRole()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
    }
    dialogVisible.value = false
  }
  // 更新职位按钮的回调
  const editRole = (row: RoleData) => {
    dialogVisible.value = true
    Object.assign(roleParams.value, JSON.parse(JSON.stringify(row)))
  }
  // 对话框表单校验
  const rules = ref({
    roleName: [
      { required: true, trigger: 'blur', message: '职位名称不能为空' },
      { min: 2, message: '职位名称至少为2位', trigger: 'blur' }
    ]
  })
  // 对话框关闭时的回调
  const closeDialog = () => {
    // 清空数据
    roleParams.value.roleName = ''
    roleParams.value.id = ''
    // 取消表单校验
    formRef.value.resetFields()
  }
  //#endregion
</script>

<template>
  <el-card shadow="hover">
    <el-form inline style="display: flex; justify-content: space-between">
      <el-form-item label="搜索职位：">
        <el-input placeholder="请输入职位" v-model.trim="keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="keyWord ? false : true" @click="searchRole">
          搜索
        </el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card shadow="hover" style="margin-top: 20px">
    <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
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
          <el-button type="primary" size="small" icon="Edit" @click="editRole(row)">
            编辑角色
          </el-button>
          <el-popconfirm :title="`你确定要删除吗?`" width="240px">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除角色</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加和修改职位对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="roleParams.id ? '更新职位' : '添加职位'"
      width="30%"
      @closed="closeDialog"
    >
      <el-form :model="roleParams" :rules="rules" ref="formRef">
        <el-form-item label="职位名称" prop="roleName">
          <el-input placeholder="请输入职位名称" v-model.trim="roleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
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
