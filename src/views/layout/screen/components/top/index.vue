<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import dayjs from 'dayjs'
  const router = useRouter()

  const time = ref('')
  let timer = null
  onMounted(() => {
    time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    timer = setInterval(() => {
      time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
</script>

<template>
  <div class="top">
    <div class="left">
      <span class="lf-btn" @click="router.push({ path: '/home' })">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rt_btn">统计报告</span>
      <span class="rt_time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .top {
    width: 100%;
    height: 40px;
    display: flex;
    .left {
      flex: 1;
      background: url('@/assets/images/screen/dataScreen-header-left-bg.png') no-repeat;
      background-size: cover;
      .lf-btn {
        width: 150px;
        height: 40px;
        float: right;
        background: url('@/assets/images/screen/dataScreen-header-btn-bg-l.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 40px;
        color: #29fcff;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .center {
      flex: 2;
      .title {
        width: 100%;
        height: 74px;
        background: url('@/assets/images/screen/dataScreen-header-center-bg.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 74px;
        font-size: 36px;
        color: #29fcff;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: url('@/assets/images/screen/dataScreen-header-left-bg.png') no-repeat;
      background-size: cover;
      .rt_btn {
        width: 150px;
        height: 40px;
        background: url('@/assets/images/screen/dataScreen-header-btn-bg-r.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 40px;
        color: #29fcff;
        font-size: 20px;
        cursor: pointer;
      }
      .rt_time {
        color: #29fcff;
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
</style>
