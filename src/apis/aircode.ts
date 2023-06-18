import axios  from "axios";

function _post(url: string, data?: Record<string, any>) {
  return axios.post(url, data).then(data => {
    return data.data
  })
}


export function testHandle() {
  return _post('https://bk37frmw9e.hk.aircode.run/hello', {
    tst:123
  }).then(data => {
    console.log(data)
  })
}
export function createTalk(params: Record<string, any>) {
  return _post('https://bk37frmw9e.hk.aircode.run/createTalk', params)
}

export function getTalkUrl(params: Record<string, any>) {
  return _post('https://bk37frmw9e.hk.aircode.run/getTalk', params)
}