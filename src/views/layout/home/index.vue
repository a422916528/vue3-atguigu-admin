<script setup>
  import { onMounted } from 'vue'
  import { useUserStore } from '@/stores/user.ts'
  const userStore = useUserStore()

  onMounted(() => {
    // 获取用户信息并存储到 pinia 中
    userStore.getUserInfo()
  })
</script>

<template>
  <h1>home 路由</h1>
</template>

<style lang="scss" scoped></style>
