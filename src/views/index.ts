import {
  type FormRules
} from 'naive-ui'
import { saveAs } from 'file-saver';
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



export async function downloadFile(url: string) {
  try {
    // 使用fetch获取文件内容
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 将文件内容转换为Blob
    const blob = await response.blob();

    // 从URL中获取文件名
    const fileName = url.split('/').pop();

    // 使用FileSaver库保存文件
    saveAs(blob, fileName);
  } catch (error) {
    console.error('下载文件出错:', error);
  }
}