<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  const chartsRef = ref(null)
  onMounted(() => {
    const myCharts = echarts.init(chartsRef.value)
    myCharts.setOption({
      legend: {
        top: '20%',
        orient: 'verticalAlign',
        right: 10,
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: [40, 120],
          label: {
            show: true,
            position: 'inside',
            color: '#fff'
          },
          labelLine: {
            show: false
          },
          center: ['50%', '40%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: '军事' },
            { value: 38, name: '新闻' },
            { value: 32, name: '直播' },
            { value: 30, name: '娱乐' },
            { value: 28, name: '财经' }
          ]
        }
      ]
    })
  })
</script>

<template>
  <div class="age">
    <div class="top">
      <p class="title">年龄比例</p>
      <p class="top_bg"></p>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<style lang="scss" scoped>
  .age {
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
      height: 100%;
    }
  }
</style>
