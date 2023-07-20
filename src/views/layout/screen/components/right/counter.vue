<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'

  const chartsRef = ref(null)

  onMounted(() => {
    const mycharts = echarts.init(chartsRef.value)
    mycharts.setOption({
      title: {
        text: '游客消费统计',
        top: 20,
        textStyle: {
          color: '#fff'
        }
      },
      radar: {
        indicator: [
          { name: '美食', max: 6500 },
          { name: '出行', max: 16000 },
          { name: '爱好', max: 30000 },
          { name: '景点', max: 38000 },
          { name: '项目', max: 52000 }
        ]
      },
      tooltip: {
        show: true
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: '美食'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: '景点'
            }
          ]
        }
      ]
    })
  })
</script>

<template>
  <div class="counter">
    <div class="top">
      <p class="title">预约渠道统计</p>
      <p class="top_bg"></p>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<style lang="scss" scoped>
  .counter {
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
