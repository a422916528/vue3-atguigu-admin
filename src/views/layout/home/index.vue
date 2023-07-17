<script setup>
  import { onMounted } from 'vue'
  import { useUserStore } from '@/stores/user.ts'
  import { getTime } from '@/composable/useTime.ts'
  const userStore = useUserStore()
  const useGetTime = getTime()
  onMounted(() => {
    // 获取用户信息并存储到 pinia 中
    userStore.getUserInfo()
  })
</script>

<template>
  <el-card shadow="hover">
    <div class="box">
      <img :src="userStore.userInfo.avatar" alt="" />
      <div>
        <h3 class="title">{{ useGetTime + ' ' + userStore.userInfo.username }}</h3>
        <p class="sbutitle">硅谷甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <SvgIcon name="welcome" width="800px" height="600px"></SvgIcon>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    & > div {
      margin-left: 20px;
      padding: 20px 0;
      .title {
        font-size: 30px;
        margin-bottom: 10px;
        font-weight: 700;
      }
      .sbutitle {
        font-style: italic;
        color: #666;
      }
    }
  }
  .bottom {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
</style>
