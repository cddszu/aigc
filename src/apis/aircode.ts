import axios  from "axios";
import { ref } from "vue";
import { useMessage } from 'naive-ui'

function _post(url: string, data?: Record<string, any>) {
  return axios.post(url, data).then(data => {
    return data.data
  })
}

export function  useCreateTalk() {
  const loading = ref(false)
  const message = useMessage() 
  function createHandle(params: Record<string, any>) {
    loading.value = true
    return _post('https://bk37frmw9e.hk.aircode.run/createTalk', params)
    .catch(e => {
      message.error(e)
    }).
    finally(() => loading.value = false)
  }
  return {
    createHandle,
    loading
  }
}

export function useGetTalkUrl() {
  const loading = ref(false)
  const message = useMessage() 
  function fetchHandle(params: Record<string, any>) {
    loading.value = true
    return _post('https://bk37frmw9e.hk.aircode.run/getTalk', params)
    .then(({ msg, error, data}) => {
      if(!data) {
        return Promise.reject(msg || error)
      }
      return {
        url: data
      }
    })
    .catch(e => {

      message.error(String(e))
      return Promise.reject(e)
    }).
    finally(() => loading.value = false)
  }
  return {
    fetchHandle,
    loading
  }
}