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


export const VoiceList = [
  {value: "zh-CN-YunyangNeural", label: "播音男声"},
  {value: "zh-CN-XiaochenNeural", label: "播音女声"},
  {value: "zh-CN-henan-YundengNeural", label: "河南男声"},
  {value: "zh-CN-liaoning-XiaobeiNeural", label: "东北女声"},
]