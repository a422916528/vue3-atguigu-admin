<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'

  const chartsRef = ref(null)

  onMounted(() => {
    const mycharts = echarts.init(chartsRef.value)
    mycharts.setOption({
      xAxis: {
        type: 'category'
      },
      yAxis: {},
      series: [{ type: 'scatter', data: [33, 44, 123, 54, 24, 54, 23, 65, 54, 98] }],
      grid: {
        bottom: 20,
        left: 40,
        right: 20
      },
      tooltip: {
        show: true
      }
    })
  })
</script>

<template>
  <div class="year">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="top_bg"></p>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<style lang="scss" scoped>
  .year {
    flex: 1;
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    .top {
      margin-left: 20px;
      .title {
        color: #fff;
        font-size: 20px;
        margin-top: 10px;
      }
      .top_bg {
        width: 68px;
        height: 7px;
        margin-top: 15px;
        background: url('@/assets/images/screen/dataScreen-title.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .charts {
      width: 100%;
      height: 220px;
    }
  }
</style>
