<script setup lang="ts">
  import {} from 'vue'
  defineProps({
    // 前缀
    prefix: {
      type: String,
      default: '#icon-'
    },
    // 图标名字
    name: {
      type: String,
      default: 'phone'
    },
    // 颜色
    color: {
      type: String,
      default: ''
    },
    // 大小
    width: {
      type: String,
      default: '16px'
    },
    height: {
      type: String,
      default: '16px'
    }
  })
</script>

<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style lang="scss" scoped></style>
