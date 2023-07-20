<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'

  const chartsRef = ref(null)

  onMounted(() => {
    const mycharts = echarts.init(chartsRef.value)
    mycharts.setOption({
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // 分割线
        splitLine: {
          show: false
        },
        // 轴线
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        boundaryGap: false,
        // 分割线
        splitLine: {
          show: false
        },
        // 轴线
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        },
        // 刻度
        axisTick: {
          show: true
        }
      },
      grid: {
        left: 80,
        bottom: 30
      },
      series: [
        {
          type: 'line',
          data: [120, 1240, 66, 698, 21, 1678, 435, 600],
          // 平滑曲线
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#3578fc' // 顶点颜色
                },
                {
                  offset: 1,
                  color: '#fa4a7a' // 底点颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    })
  })
</script>

<template>
  <div class="line">
    <div class="top">
      <p class="title">未来7天游客数量趋势图</p>
      <p class="top_bg"></p>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<style lang="scss" scoped>
  .line {
    flex: 1;
    background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin: 0 20px;
    .top {
      margin-left: 20px;
      transform: translateY(-10px);
      .title {
        color: #fff;
        font-size: 20px;
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
      height: 210px;
    }
  }
</style>
