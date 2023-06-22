<script setup lang="ts">
  import { useRouter } from 'vue-router'
  defineProps({
    // 菜单路由
    menuList: {
      require: true,
      type: Array
    },
    // 背景颜色
    bgc: {
      type: String,
      default: '#00152b'
    },
    // 选中文本颜色
    activeTextColor: {
      type: String,
      default: '#ffd04b'
    },
    // 文本颜色
    textColor: {
      type: String,
      default: '#fff'
    }
  })
  const router = useRouter()
  const toRouter = path => {
    router.push(path)
  }
</script>
<script lang="ts">
  export default {
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Menu'
  }
</script>
<template>
  <el-menu
    :active-text-color="activeTextColor"
    :background-color="bgc"
    class="el-menu-vertical-demo"
    default-active="2"
    :text-color="textColor"
  >
    <template v-for="item in (menuList as any)" :key="item.path">
      <!-- 没有子路由 -->
      <el-menu-item v-if="!item.children" :index="item.path" @click="toRouter(item.path)">
        <span>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
        </span>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>
      <!-- 有子路由且只有一个 -->
      <el-menu-item
        v-if="item.children && item.children.length == 1"
        :index="item.children[0].path"
        @click="toRouter(item.path)"
      >
        <span>
          <el-icon>
            <component :is="item.children[0].meta?.icon"></component>
          </el-icon>
        </span>
        <span>{{ item.children[0].meta.title }}</span>
      </el-menu-item>
      <!-- 有子路由并且有多个 -->
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
  .el-sub-menu .el-menu {
    border: none;
    margin-left: 10px;
  }
</style>
