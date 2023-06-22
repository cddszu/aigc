<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NUpload, type FormInst, NImage, NSpin } from 'naive-ui'
import DisplayList from './displayList.vue'
import { useCreateTalk } from '@/apis/aircode'
import { ref } from 'vue'

import { rules, setInfo } from './index'
const formRef = ref<FormInst | null>(null)
const listVisible = ref(true)
const { createHandle, loading } = useCreateTalk()

const formValue = ref({
  image: '',
  text: ''
})

async function handleValidateClick() {
  formRef.value?.validate?.(async (errors) => {
    if (errors) {
      console.log(errors)
    }

    const createResult = await createHandle(formValue.value)
    listVisible.value = false
    setInfo(createResult.result.id, {
      ...formValue.value,
      id: createResult.result.id
    })
    setTimeout(() => {
      listVisible.value = true
    })
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
      <h1>AICG Demo. 仅供学习使用</h1>
      <n-form ref="formRef" :label-width="80" :rules="rules" :model="formValue">
        <n-form-item label="人脸素材" path="image">
          <n-upload
            accept="jpeg,jpg"
            action="https://bk37frmw9e.hk.aircode.run/uploadImage"
            @finish="imageUploadFinish"
            :show-file-list="false"
          >
            <n-button>上传文件</n-button>
            <n-image width="300" style="margin-top: 10px" :src="formValue.image"></n-image>
          </n-upload>
        </n-form-item>
        <n-form-item label="视频文案" path="text">
          <n-input v-model:value="formValue.text" placeholder="" type="textarea" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" @click="handleValidateClick"> 提交 </n-button>
        </n-form-item>
      </n-form>
      <DisplayList v-if="listVisible" />
    </section>
  </n-spin>
</template>
<style lang="less" scoped>
.aigc-root {
  padding: 16px;
}
h1 {
  text-align: center;
}
</style>
