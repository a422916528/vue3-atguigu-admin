<script setup lang="ts">
  import { ref } from 'vue'
  import { useMenuStore } from '@/stores/menu'
  import { useTabbarStore } from '@/stores/tabber'
  import { useUserStore } from '@/stores/user'
  const menuStore = useMenuStore()
  // 点击图标回调
  const changeIcon = () => {
    menuFold.value = !menuFold.value
    menuStore.changeFold(menuFold.value)
  }
  // 菜单折叠控制变量
  const menuFold = ref(false)

  // 刷新按钮功能
  const tabbarStore = useTabbarStore()
  const refreshVal = ref(false)
  // 点击刷新按钮的回调
  const refresh = () => {
    refreshVal.value = !refreshVal.value
    // 通知 main 销毁并重新创建组件
    tabbarStore.clickRefresh(refreshVal.value)
  }

  //全屏功能
  const fullScreen = () => {
    // 判断是否为全屏
    let full = document.fullscreenElement
    if (!full) {
      // 全屏
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  // 获取用户信息
  const userStore = useUserStore()
</script>

<template>
  <div class="tabbar">
    <!-- 左侧 -->
    <div class="tabbar_left">
      <el-icon
        style="margin-right: 10px; cursor: pointer; transform: translateY(2px)"
        @click="changeIcon"
      >
        <component :is="menuFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator=">">
        <el-breadcrumb-item
          v-for="item in $route.matched.slice(1)"
          :key="item.path"
          :to="{ path: item.path }"
        >
          <el-icon style="margin-right: 5px; transform: translateY(2px)">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧 -->
    <div class="tabbar_right">
      <el-button circle icon="Refresh" @click="refresh"></el-button>
      <el-button circle icon="FullScreen" @click="fullScreen"></el-button>
      <el-button circle icon="Setting"></el-button>
      <img
        :src="userStore.userInfo.avatar"
        alt=""
        style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
      />
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.userInfo.username }}
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
