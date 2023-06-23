<script setup lang="ts">
  import {} from 'vue'
</script>

<template>
  <div class="tabbar">
    <!-- 左侧 -->
    <div class="tabbar_left">
      <el-icon style="margin-right: 10px">
        <Expand></Expand>
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧 -->
    <div class="tabbar_right">
      <el-button circle icon="Refresh"></el-button>
      <el-button circle icon="FullScreen"></el-button>
      <el-button circle icon="Setting"></el-button>
      <img src="@/assets/logo.png" alt="" style="width: 24px; height: 24px; margin: 0 10px" />
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .tabbar_left {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
    }
    .tabbar_right {
      display: flex;
      align-items: center;
    }
  }
</style>
