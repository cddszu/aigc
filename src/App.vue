<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import NavigatorIndex from './components/navigator/navigatorIndex.vue'
</script>

<template>
  <h1 class="text-center text-lg">AIGC Demo. 仅供学习使用</h1>
  <div class="root">
    <n-message-provider>
      <RouterView />
      <NavigatorIndex />
    </n-message-provider>
  </div>
</template>

<style scoped>
.root {
  padding: 16px;
  padding-bottom: 32px;
}
</style>
