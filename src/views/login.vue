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
import { useLogin } from '@/apis/aircode'
import { computed, ref } from 'vue'
import { getUserFromWindow, setUserToWindow, VoiceList } from './index'

import { loginRules } from './index'
const formRef = ref<FormInst | null>(null)
const { loginHandle, loading } = useLogin()

const userKey = ref(getUserFromWindow())

const userName = computed(() => {
  if (userKey.value) {
    return atob(userKey.value)?.split?.(':')?.[0]
  }
  return ''
})

const formValue = ref({
  name: '',
  password: ''
})

async function handleValidateClick() {
  formRef.value?.validate?.(async (errors) => {
    if (errors) {
      console.log(errors)
    }
    const key = btoa(`${formValue.value.name}:${formValue.value.password}`)
    await loginHandle({
      user: key
    })
    setUserToWindow(key)
    window.location.reload()
  })
}
</script>

<template>
  <n-spin :show="loading">
    <section v-if="userKey">User: {{ userName }}</section>
    <section v-else class="aigc-root">
      <n-form ref="formRef" :label-width="80" :rules="loginRules" :model="formValue">
        <n-form-item label="用户名" path="name">
          <n-input v-model:value="formValue.name" placeholder="" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="formValue.password" :options="VoiceList" type="password" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" @click="handleValidateClick"> 提交 </n-button>
        </n-form-item>
      </n-form>
    </section>
  </n-spin>
</template>
<style lang="less" scoped></style>
