<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/permission/index'
  import type { MenuData, MenuParams } from '@/api/acl/permission/type'
  // #region 数据渲染
  const tableData = ref<MenuData[]>([])
  // 获取全部菜单数据
  const getPermission = async () => {
    const res = await reqAllPermission()
    if (res.code === 200) {
      tableData.value = res.data
    }
  }
  onMounted(() => {
    getPermission()
  })
  // #endregion

  // #region 添加或更新
  // 控制对话框显示或隐藏
  const dialogVisible = ref(false)
  // 点击添加按钮的回调
  const addPermission = (row: MenuData) => {
    dialogVisible.value = true
    // 收集新增菜单的 level
    menuParams.value.level = row.level + 1
    // 收集给那个菜单添加子菜单
    menuParams.value.pid = row.id
  }
  // 点击编辑按钮的回调
  const editPermission = (row: MenuData) => {
    dialogVisible.value = true
    Object.assign(menuParams.value, row)
  }
  // 添加或更新携带的参数
  const menuParams = ref<MenuParams>({
    level: '',
    name: '',
    pid: '',
    code: ''
  })
  // 对话框关闭时的回调
  const closeDialog = () => {
    Object.assign(menuParams.value, {
      level: '',
      name: '',
      pid: '',
      code: '',
      id: ''
    })
  }
  // 对话框点击确定按钮的回调
  const save = async () => {
    const res = await reqAddOrUpdateMenu(menuParams.value)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: menuParams.value.id ? '修改成功' : '添加成功'
      })
      getPermission()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
    }
    dialogVisible.value = false
  }
  // #endregion

  // #region 删除功能
  // 删除按钮的回调
  const delMenu = async (row: MenuData) => {
    const res = await reqRemoveMenu(row.id)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getPermission()
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }
  // #endregion
</script>

<template>
  <el-card shadow="hover">
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            size="small"
            type="primary"
            :disabled="row.level === 4 ? true : false"
            @click="addPermission(row)"
          >
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            size="small"
            type="primary"
            :disabled="row.level === 1 ? true : false"
            @click="editPermission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            width="200px"
            :title="`你确定要删除${row.name}吗?`"
            @confirm="delMenu(row)"
          >
            <template #reference>
              <el-button size="small" type="primary" :disabled="row.level === 1 ? true : false">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 对话框，添加或更新菜单 -->
  <el-dialog
    v-model="dialogVisible"
    :title="menuParams.id ? '修改菜单' : '添加菜单'"
    width="30%"
    @closed="closeDialog"
  >
    <el-form label-width="80px" style="padding-right: 60px">
      <el-form-item label="名称">
        <el-input placeholder="请输入名称" v-model="menuParams.name"></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input placeholder="请输入名称" v-model="menuParams.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
