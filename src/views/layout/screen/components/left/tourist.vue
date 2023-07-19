<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import 'echarts-liquidfill'
  const peopleNum = ref('216908')
  // 获取实例
  const chartsRef = ref(null)
  onMounted(() => {
    const myCharts = echarts.init(chartsRef.value)
    const option = {
      series: [
        {
          type: 'liquidFill',
          data: [0.6],
          name: '已预约人数占比',
          radius: '80%',
          center: ['50%', '50%']
        }
      ],
      tooltip: {
        show: true
      }
    }
    myCharts.setOption(option)
  })
</script>

<template>
  <div class="tourist">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="top_bg"></p>
      <p class="top_rt">
        可预约总量
        <span>999999</span>
        人
      </p>
    </div>
    <div class="content">
      <div class="people">
        <span v-for="(item, index) in peopleNum" :key="index">{{ item }}</span>
        <span>人</span>
      </div>
      <div class="charts" ref="chartsRef"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tourist {
    flex: 1.2;
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    .top {
      margin-left: 20px;
      .title {
        color: #fff;
        font-size: 20px;
        margin-top: 20px;
      }
      .top_bg {
        width: 68px;
        height: 7px;
        margin-top: 20px;
        background: url('@/assets/images/screen/dataScreen-title.png') no-repeat;
        background-size: 100% 100%;
      }
      .top_rt {
        float: right;
        color: #fff;
        margin-right: 40px;
        margin-top: -30px;
        & > span {
          color: orange;
        }
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .people {
        margin-top: 30px;
        span {
          display: inline-block;
          width: 47px;
          height: 40px;
          background: url('@/assets/images/screen/total.png') no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 40px;
          color: #29fcff;
          font-size: 20px;
        }
      }
      .charts {
        width: 100%;
        height: 245px;
      }
    }
  }
</style>
