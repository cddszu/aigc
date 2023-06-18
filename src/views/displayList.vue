<script setup lang="ts">
import { getTalkUrl } from '@/apis/aircode'
import { getAiLogs } from './index'
import { onMounted, ref } from 'vue'

const logs = ref<Record<string, any>[]>()

function refreshLog() {
  logs.value = Object.values(getAiLogs())
}

onMounted(() => {
  refreshLog()
})

async function downloadVideo(id: string) {
  const { url } = await getTalkUrl({
    id
  })
  window.location.href = url
  // window.open(url)
}
</script>
<template>
  <div class="flex flex-between">
    <p>已生成的视频</p>
    <span @click="refreshLog">刷新</span>
  </div>
  <div>
    <div v-for="item in logs" class="flex flex-between" :key="item.id">
      <span>{{ item.text }}</span>
      <span @click="downloadVideo(item.id)">打开视频</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
p {
  margin: 0;
}
.flex {
  display: flex;
  &-between {
    justify-content: space-between;
  }
}
</style>
