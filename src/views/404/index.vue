<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>

<template>
  <div class="box">
    <el-button type="primary" style="margin: 40px" @click="router.push({ path: '/home' })">
      返回首页
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/error_images/404.png') no-repeat;
    background-position: center;
  }
</style>
