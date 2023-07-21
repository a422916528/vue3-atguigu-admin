<script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import { useTabbarStore } from '@/stores/tabber'
  const tabbarStore = useTabbarStore()
  // 组件刷新控制
  const flag = ref(true)
  watch(
    () => tabbarStore.refresh,
    () => {
      flag.value = false
      nextTick(() => {
        flag.value = true
      })
    }
  )
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" v-if="flag"></component>
  </RouterView>
</template>

<style lang="scss" scoped></style>
