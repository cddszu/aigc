<script setup lang="ts">
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NUpload,
  type FormInst,
  NImage,
  NSpin,
  NSelect,
  useMessage
} from 'naive-ui'
import { useCreateTalk } from '@/apis/aircode'
import { ref } from 'vue'
import { VoiceList } from './index'
const router = useRouter()

import { rules, setInfo } from './index'
import { useRouter } from 'vue-router'
import { ERouterName } from '@/router/type'
const formRef = ref<FormInst | null>(null)
const { createHandle, loading } = useCreateTalk()
const message = useMessage()

const formValue = ref({
  image: '',
  text: '',
  voice_id: 'zh-CN-YunyangNeural'
})

async function handleValidateClick() {
  formRef.value?.validate?.(async (errors) => {
    if (errors) {
      console.log(errors)
    }

    const createResult = await createHandle(formValue.value)
    if (createResult.result.id) {
      setInfo(createResult.result.id, {
        ...formValue.value,
        id: createResult.result.id
      })
      router.push({
        name: ERouterName.videoList
      })
    }
    if (createResult.result.description) {
      message.error(createResult.result.description)
    }
  })
}

function imageUploadFinish(params: any) {
  const { event } = params

  const target = event.target as XMLHttpRequest

  formValue.value.image = JSON.parse(target.response).url
}
</script>

<template>
  <n-spin :show="loading">
    <section class="aigc-root">
      <n-form ref="formRef" :label-width="80" :rules="rules" :model="formValue">
        <n-form-item label="人脸素材" path="image">
          <n-upload
            accept="jpeg,jpg"
            action="https://bk37frmw9e.hk.aircode.run/uploadImage"
            @finish="imageUploadFinish"
            :show-file-list="false"
          >
            <div
              v-if="!formValue.image"
              style="width: calc(100vw - 32px)"
              class="w-[100%] h-20 bg-[gray] text-center leading-10"
            >
              点击上传人脸
            </div>
            <img v-else class="w-[100%]" style="margin-top: 10px" :src="formValue.image" />
          </n-upload>
        </n-form-item>
        <n-form-item label="视频文案" path="text">
          <n-input v-model:value="formValue.text" placeholder="" type="textarea" />
        </n-form-item>
        <n-form-item label="选择声音" path="voice_id">
          <n-select v-model:value="formValue.voice_id" :options="VoiceList" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" @click="handleValidateClick"> 提交 </n-button>
        </n-form-item>
      </n-form>
    </section>
  </n-spin>
</template>
<style lang="less" scoped>
h1 {
  text-align: center;
}
</style>
