<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'

  const chartsRef = ref(null)

  onMounted(() => {
    const mycharts = echarts.init(chartsRef.value)
    mycharts.setOption({
      // 标题
      title: {
        text: '景区排行',
        left: '50%',
        // 样式
        textStyle: {
          color: '#fff',
          fontSize: 20
        },
        // 子标题
        subtext: '各大景区排行',
        // 子标题样式
        subtextStyle: {
          color: 'yellowgreen',
          fontSize: 14
        }
      },
      // x | y
      xAxis: {
        type: 'category'
      },
      yAxis: {},
      grid: {},
      series: [
        {
          type: 'bar',
          data: [10, 20, 30, 40, 50, 60, 70],
          label: {
            show: true,
            position: 'top',
            color: '#fff'
          }
        }
      ],
      tooltip: {
        show: true
      }
    })
  })
</script>

<template>
  <div class="rank">
    <div class="top">
      <p class="title">热门景区排行</p>
      <p class="top_bg"></p>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<style lang="scss" scoped>
  .rank {
    flex: 1.5;
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    .top {
      margin-left: 20px;
      transform: translateY(20px);
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
      height: 388px;
    }
  }
</style>
