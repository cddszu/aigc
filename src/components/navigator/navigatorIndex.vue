<script lang="tsx" setup>
import { NGrid, NGi, NGridItem } from 'naive-ui'
import { ERouterName } from '@/router/type'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const NGList = computed(() => {
  return [
    { key: ERouterName.createTextVideo, label: '文本视频' },
    { key: ERouterName.createAudioVideo, label: '视频换脸' },
    { key: ERouterName.videoList, label: '视频列表' }
  ]
})
</script>
<template>
  <n-grid cols="3" :x-gap="12" class="w-[100%] text-center gap-1 navigator-root text-base">
    <n-grid-item
      v-for="item in NGList"
      :key="item.key"
      :class="{
        active: item.key === route.name
      }"
    >
      <router-link :to="{ name: item.key }">{{ item.label }}</router-link>
    </n-grid-item>
  </n-grid>
</template>
<style lang="less" scoped>
.navigator-root {
  background: #fff;
  border-top: 1px solid gray;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  color: #999;
  .active {
    color: rgb(115, 214, 100);
  }
}
</style>
