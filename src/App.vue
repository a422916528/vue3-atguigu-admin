<script setup lang="ts">
  // 读取本地存储中的颜色主题
  const localColor = JSON.parse(localStorage.getItem('color'))
  const el = document.documentElement
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  el.style.setProperty('--el-color-primary', localColor?.color || '#409EFF')
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss" scoped></style>
