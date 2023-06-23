<script setup lang="ts">
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
    :text-color="textColor"
    :default-active="$route.path"
    :router="true"
  >
    <template v-for="item in (menuList as any)" :key="item.path">
      <!-- 没有子路由 -->
      <el-menu-item v-if="!item.children" :index="item.path">
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有子路由且只有一个 -->
      <el-menu-item
        v-if="item.children && item.children.length == 1"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有子路由并且有多个 -->
      <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <el-menu-item-group v-for="sub in item.children" :key="sub.path">
          <el-menu-item :index="sub.path">
            <el-icon>
              <component :is="sub.meta?.icon"></component>
            </el-icon>
            {{ sub.meta?.title }}
          </el-menu-item>
        </el-menu-item-group>
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
