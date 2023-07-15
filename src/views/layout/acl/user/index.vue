<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { nextTick, onMounted, ref } from 'vue'
  import { reqUserInfo, reqAddOrUpdateUser } from '@/api/acl/user/index'
  import type { Records, User } from '@/api/acl/user/type'
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
    if (res.code === 200) {
      userInfoArr.value = res.data.records
      total.value = res.data.total
    }
  }

  // 收集用户信息的数据
  const userParams = ref<User>({
    username: '',
    password: '',
    name: ''
  })
  // 控制抽屉的展示或隐藏
  const drawer = ref(false)
  // 点击添加按钮的回调
  const addUser = () => {
    // 显示抽屉
    drawer.value = true
  }
  // 点击确定按钮的回调
  const confirm = async () => {
    // 对表单进行校验
    await formRef.value.validate()
    // 添加或修改
    const res = await reqAddOrUpdateUser(userParams.value)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: userParams.value.id ? '更新成功' : '添加成功'
      })
      drawer.value = false
      userParams.value.id ? pageOn.value : (pageOn.value = 1)
      getUserInfo()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
      drawer.value = false
    }
  }
  // 点击取消按钮的回调
  const cancel = () => {
    // 关闭抽屉
    drawer.value = false
  }
  // 点击编辑按钮的回调
  const updateUser = (row: User) => {
    // 显示抽屉
    drawer.value = true
    Object.assign(userParams.value, row)
  }
  // 表单校验
  const rules = ref({
    // 用户名
    username: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: any, callback: any) => {
          if (value === '') {
            callback(new Error('用户名不能为空'))
          } else if (value.length < 5) {
            callback(new Error('长度至少为5位'))
          } else {
            callback()
          }
        }
      }
    ],
    // 昵称
    name: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: any, callback: any) => {
          if (value === '') {
            callback(new Error('昵称不能为空'))
          } else if (value.length < 5) {
            callback(new Error('长度至少为5位'))
          } else {
            callback()
          }
        }
      }
    ],
    // 密码
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: any, callback: any) => {
          if (value === '') {
            callback(new Error('密码不能为空'))
          } else if (value.length < 6) {
            callback(new Error('长度至少为6位'))
          } else {
            callback()
          }
        }
      }
    ]
  })
  // 获取表单实例
  const formRef = ref(null)
  // 抽屉关闭的回调
  const closeDrawer = () => {
    // 移除表单校验信息，同时清除表单数据
    formRef.value.resetFields()
    Object.assign(userParams.value, {
      id: '',
      username: '',
      password: '',
      name: ''
    })
  }
  onMounted(() => {
    getUserInfo()
  })
</script>

<template>
  <el-card shadow="hover">
    <el-form inline class="searUser-form">
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
    <el-button type="primary" @click="addUser">添加</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin-top: 20px" :data="userInfoArr">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" width="50px" align="center" type="index"></el-table-column>
      <el-table-column label="ID" width="80px" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="name"></el-table-column>
      <el-table-column label="用户角色" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" width="200px" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" width="200px" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="320px" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="User">分类角色</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">
            编辑角色
          </el-button>
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
  <!-- 抽屉，添加新用户和修改用户信息 -->
  <el-drawer
    v-model="drawer"
    :title="userParams.id ? '修改用户' : '添加用户'"
    @closed="closeDrawer"
  >
    <el-form label-width="80px" :model="userParams" :rules="rules" ref="formRef">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model.trim="userParams.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input placeholder="请输入用户昵称" v-model.trim="userParams.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!userParams.id">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model.trim="userParams.password"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
  .searUser-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
