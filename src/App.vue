<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import NavigatorIndex from './components/navigator/navigatorIndex.vue'
</script>

<template>
  <n-message-provider>
    <RouterView />
    <NavigatorIndex />
  </n-message-provider>
</template>

<style scoped></style>
