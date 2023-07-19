<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Top from './components/top/index.vue'
  // #region scale 适配
  const screenRef = ref<HTMLElement>(null)
  function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
  }
  onMounted(() => {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  })
  window.addEventListener('resize', () => {
    screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  })
  // #endregion
</script>

<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <Top></Top>
      <div class="main">
        <div class="left">左</div>
        <div class="center">中</div>
        <div class="right">右</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/screen/bg.png') no-repeat;
    background-size: cover;
    .screen {
      width: 1920px;
      height: 1080px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform-origin: left top;
      .main {
        display: flex;
        .left {
          flex: 1;
        }
        .center {
          flex: 2;
        }
        .right {
          flex: 1;
        }
      }
    }
  }
</style>
