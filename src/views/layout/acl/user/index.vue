<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import {
    reqUserInfo,
    reqAddOrUpdateUser,
    reqAllRole,
    reqSetRole,
    reqDelUser,
    reqDelSelectUser
  } from '@/api/acl/user/index'
  import type { Records, User, AllRole, SetRoleData } from '@/api/acl/user/type'
  // #region 渲染页面
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
  // #endregion

  // #region 用户编辑或添加功能
  // 收集用户信息的数据
  const userParams = ref<User>({
    username: '',
    password: '',
    name: ''
  })
  // 控制添加或者修改用户抽屉的展示或隐藏
  const drawer = ref(false)
  // 点击添加按钮的回调
  const addUser = () => {
    // 显示抽屉
    drawer.value = true
  }
  // 编辑和修改用户点击确定按钮的回调
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
      pageOn.value = userParams.value.id ? pageOn.value : 1
      getUserInfo()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
      drawer.value = false
    }
  }
  //  编辑和修改用户点击取消按钮的回调
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
  // 编辑和修改用户抽屉关闭的回调
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
  // #endregion

  // #region 分配角色功能
  // 控制分配角色抽屉显示或隐藏
  const drawer1 = ref(false)
  // 获取职位方法
  const getAllRole = async (userId: number) => {
    const res = await reqAllRole(userId)
    if (res.code === 200) {
      allRole.value = res.data.allRolesList
      checkedCities.value = res.data.assignRoles
    }
  }
  // 点击分配角色按钮的回调
  const setRole = (row: User) => {
    drawer1.value = true
    // 存储已有的信息
    Object.assign(userParams.value, row)
    // 发起获取职位请求
    getAllRole(row.id)
  }
  // 是否全选收集
  const checkAll = ref(false)
  // 设置不确定选择状态
  const isIndeterminate = ref(false)
  // 已经勾选的职位
  const checkedCities = ref<AllRole>([])
  // 全部职位
  const allRole = ref<AllRole>([])
  // 全选按钮触发时的回调
  const handleCheckAllChange = (val: boolean) => {
    checkedCities.value = val ? allRole.value : []
    isIndeterminate.value = false
  }
  // 复选框列表发生变化时的回调
  const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === allRole.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
  }
  // 分配角色点击确定按钮的回调
  const save = async () => {
    // 收集参数
    const params: SetRoleData = {
      userId: userParams.value.id,
      roleIdList: checkedCities.value.map(item => item.id)
    }
    const res = await reqSetRole(params)
    if (res.code === 200) {
      getUserInfo()
      ElMessage({
        type: 'success',
        message: '分配成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: '分配失败'
      })
    }
    drawer1.value = false
  }
  // 分配角色点击取消按钮的回调
  const close = () => {
    drawer1.value = false
  }
  // 分配角色抽屉关闭的回调
  const closeDrawerRole = () => {
    Object.assign(userParams.value, {
      id: '',
      username: '',
      password: '',
      name: ''
    })
  }
  // #endregion

  // #region 删除功能
  // 点击删除角色按钮的回调
  const delUser = async (row: User) => {
    const res = await reqDelUser(row.id)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      pageOn.value = userInfoArr.value.length > 1 ? pageOn.value : pageOn.value--
      getUserInfo()
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }
  // 存储选择用户的 id
  let idList = ref<number[]>([])
  // table 复选框勾选时的回调
  const selectChange = (rowList: Records) => {
    // 存储选择用户的 id
    idList.value = rowList.map(item => item.id)
  }
  // table 全选按钮勾选时的回调
  const selectAllChange = (rowList: Records) => {
    idList.value = rowList.map(item => item.id)
  }
  // 批量删除按钮的回调
  const delSelectUser = async () => {
    const res = await reqDelSelectUser(idList.value)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getUserInfo()
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }
  // #endregion
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
    <el-popconfirm title="你确定要删除吗?" width="240px" @confirm="delSelectUser">
      <template #reference>
        <el-button type="danger" :disabled="idList.length ? false : true">批量删除</el-button>
      </template>
    </el-popconfirm>
    <el-table
      border
      style="margin-top: 20px"
      :data="userInfoArr"
      @select="selectChange"
      @select-all="selectAllChange"
    >
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
          <el-button type="primary" size="small" icon="User" @click="setRole(row)">
            分配角色
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">
            编辑角色
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.username}吗?`"
            width="240px"
            @confirm="delUser(row)"
          >
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
  <!-- 抽屉，用于职位分配 -->
  <el-drawer v-model="drawer1" title="分配用户角色" @closed="closeDrawerRole">
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="userParams.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色列表">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in allRole" :key="item.id" :label="item">
            {{ item.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">确定</el-button>
      <el-button @click="close">取消</el-button>
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
