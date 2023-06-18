<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NUpload } from 'naive-ui'
import { testHandle, createTalk, getTalkUrl } from '@/apis/aircode'
import { ref } from 'vue'

const formRef = ref(null)
const videoId = ref('tlk_eg-FhWyIV8UVXxbFSfOo0')

const formValue = ref({
  image: '',
  text: ''
})

async function handleValidateClick() {
  const createResult = await createTalk(formValue.value)
  videoId.value = createResult.result.id

  console.log(createResult)
}

function imageUploadFinish(params: any) {
  const { event } = params

  const target = event.target as XMLHttpRequest

  formValue.value.image = JSON.parse(target.response).url
}

async function downloadVideo() {
  const { url } = await getTalkUrl({
    id: videoId.value
  })
  window.open(url, '_blank')
}
</script>

<template>
  <n-form ref="formRef" :label-width="80" :model="formValue">
    <n-form-item label="人脸素材" path="image">
      <n-upload
        accept="jpeg,jpg"
        action="https://bk37frmw9e.hk.aircode.run/uploadImage"
        @finish="imageUploadFinish"
      >
        <n-button>上传文件</n-button>
      </n-upload>
    </n-form-item>
    <n-form-item label="视频文案" path="text">
      <n-input v-model:value="formValue.text" placeholder="" type="textarea" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick"> 提交 </n-button>
      <n-button attr-type="button" @click="downloadVideo"> 获取视频 </n-button>
    </n-form-item>
  </n-form>
</template>
