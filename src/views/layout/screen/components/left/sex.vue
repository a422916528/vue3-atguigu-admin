<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  const chartsRef = ref(null)
  onMounted(() => {
    const myCharts = echarts.init(chartsRef.value)
    myCharts.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 0,
        top: 0
      },
      xAxis: {
        show: false
      },
      yAxis: {
        type: 'category',
        data: ['男女占比'],
        show: false
      },
      series: [
        {
          name: '男',
          type: 'bar',
          barWidth: 20,
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [58],
          itemStyle: {
            color: '#3573fd',
            borderRadius: [20, 0, 0, 20]
          }
        },
        {
          name: '女',
          type: 'bar',
          barWidth: 20,
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [42],
          itemStyle: {
            color: '#fa5f78',
            borderRadius: [0, 20, 20, 0]
          }
        }
      ]
    })
  })
</script>

<template>
  <div class="sex">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="top_bg"></p>
    </div>
    <div class="content">
      <div class="content-img">
        <div class="man">
          <span>男士</span>
          <img src="@/assets/images/screen/man.png" alt="" />
        </div>
        <div class="woman">
          <span>女士</span>
          <img src="@/assets/images/screen/woman.png" alt="" />
        </div>
      </div>
      <div class="bottom">
        <div class="rate">
          <span>男士 60%</span>
          <span>女士 40%</span>
        </div>
        <div class="charts" ref="chartsRef"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .sex {
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
    .content {
      .content-img {
        display: flex;
        justify-content: center;
        .man {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 111px;
          height: 115px;
          margin: 20px;
          padding: 2px 0 20px 0;
          background: url('@/assets/images/screen/man-bg.png') no-repeat;
          & > span {
            color: #fff;
          }
        }
        .woman {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          align-items: center;
          width: 111px;
          height: 115px;
          margin: 20px;
          padding: 2px 0 20px 0;
          background: url('@/assets/images/screen/woman-bg.png') no-repeat;
          & > span {
            color: #fff;
          }
        }
      }
      .bottom {
        .rate {
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          color: #fff;
          font-size: 14px;
          transform: translateY(20px);
        }
        .charts {
          width: 100%;
          height: 90px;
        }
      }
    }
  }
</style>
