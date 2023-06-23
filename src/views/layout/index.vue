<script setup>
  import {} from 'vue'
  import Menu from './components/menu/index.vue'
  import { menuRoutes } from '@/router/index.ts'
  import Tabbar from './tabbar/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside width="260px">
        <!-- 标题logo区 -->
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
          <h1 class="title">硅谷甄选运营平台</h1>
        </div>
        <!-- 菜单 -->
        <Menu :menuList="menuRoutes"></Menu>
      </el-aside>
      <el-container>
        <!-- 顶部 -->
        <el-header>
          <Tabbar></Tabbar>
        </el-header>
        <!-- 主要区域 -->
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  // 左侧菜单
  .el-aside {
    background-color: #00152b;
    .logo {
      display: flex;
      padding: 10px 0;
      align-items: center;
      .title {
        color: #fff;
        font-size: 24px;
      }
      img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }
    }
    .el-menu {
      border-right: 0;
    }
  }
  .el-header {
    height: 50px;
    padding: 0;
  }
  .el-main {
    height: calc(100vh - 50px);
  }
</style>
