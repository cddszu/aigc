import axios  from "axios";
import { ref } from "vue";
import { useMessage } from 'naive-ui'
import { getUserFromWindow } from "@/views";

function _post(url: string, data?: Record<string, any>) {
  return axios.post(url, data).then(data => {
    return data.data
  })
}

export function  useLogin() {
  const loading = ref(false)
  const message = useMessage() 
  function loginHandle(params: Record<string, any>) {
    loading.value = true
    return _post('https://bk37frmw9e.hk.aircode.run/user', params)
    .catch(e => {
      message.error("账号或者密码不正确")
    }).
    finally(() => loading.value = false)
  }
  return {
    loginHandle,
    loading
  }
}

export function  useCreateTalk() {
  const loading = ref(false)
  const message = useMessage() 
  function createHandle(params: Record<string, any>) {
    loading.value = true
    return _post('https://bk37frmw9e.hk.aircode.run/createTalk', {
      ...params,
      user: getUserFromWindow()
    })
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
    return _post('https://bk37frmw9e.hk.aircode.run/getTalk', {
      ...params,
      user: getUserFromWindow()
    })
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

export function useGetTalks() {
  const loading = ref(false)
  const message = useMessage() 
  function fetchListHandle() {
    loading.value = true
    return _post('https://bk37frmw9e.hk.aircode.run/queryList', {
      user: getUserFromWindow()
    })
    .then(({ msg, error, result}) => {
      if(!result) {
        return Promise.reject(msg || error)
      }
      return result
    })
    .catch(e => {

      message.error(String(e))
      return Promise.reject(e)
    }).
    finally(() => loading.value = false)
  }
  console.log(123)
  return {
    fetchListHandle,
    loading
  }
}