import {
  type FormRules
} from 'naive-ui'
const localStorageKey = 'aigc_log'

export const rules: FormRules = {
  image: [
    {
      required: true,
      message: '请上传图片'
    }
  ],
  text: [
    {
      required: true,
      message: '请输入语音文本'
    }
  ]
}

export function getAiLogs(): Record<string, any> {
  const info = window.localStorage.getItem(localStorageKey) || '{}'
  return JSON.parse(info)
}

export function setInfo(key: string, info: Record<string, any>) {
  const existInfo = getAiLogs()
  existInfo[key] = info
  window.localStorage.setItem(localStorageKey, JSON.stringify(existInfo))
}

