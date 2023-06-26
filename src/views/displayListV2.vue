<script setup lang="ts">
import { useGetTalks, useGetTalkUrl } from '@/apis/aircode'
import { NSpin, NList, NListItem } from 'naive-ui'
import { onMounted, ref } from 'vue'

const { loading, fetchListHandle } = useGetTalks()
const { loading: downloadLoading, fetchHandle } = useGetTalkUrl()

const logs = ref<Record<string, any>[]>()

const videoUrl = ref('')

async function refreshLog() {
  logs.value = await fetchListHandle()
}

onMounted(() => {
  refreshLog()
})

async function downloadVideo(id: string) {
  const { url } = await fetchHandle({
    id
  })
  if (url) {
    videoUrl.value = url
  }
}
</script>
<template>
  <n-spin :show="loading">
    <div class="flex flex-between">
      <h1 class="text-lg">已生成的视频</h1>
    </div>
    <NList>
      <n-list-item v-for="item in logs" class="" :key="item.id">
        <div class="flex flex-between">
          <span>{{ item.text }}</span>
          <span @click="downloadVideo(item.id)">打开视频</span>
        </div>
      </n-list-item>
    </NList>
    <video class="mt-10" v-if="videoUrl" :src="videoUrl" controls></video>
  </n-spin>
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
