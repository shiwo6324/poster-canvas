import axios from 'axios'
import docCookies from '../utils/cookies'
export const end = '' // url:"//template.josephxia.com";

// 公共方法，处理响应，进行判断并调用相应的回调
export function common(
  res: any,
  successCallback: (data: any) => void,
  failedCallback?: () => void,
) {
  if (res.status === 200) {
    const code = res.data.code
    if (code === 200) {
      successCallback(res.data.result)
    } else if (code === 401) {
      typeof failedCallback === 'function' ? failedCallback() : alert('请先登录！')
    } else {
      typeof failedCallback === 'function'
        ? failedCallback()
        : alert(res.data.msg || '信息有误，失败！')
    }
  } else if (res.status === 500) {
    typeof failedCallback === 'function' ? failedCallback() : alert('失败！')
  }
}

// 为请求头设置授权信息，从cookie中获取sessionId
function getHeaders(): {
  headers: { Authorization: string }
} {
  return { headers: { Authorization: docCookies.getItem('sessionId') || '' } }
}

export const myAxios = {
  get: (url: string) => axios.get(url, getHeaders()),
  post: (url: string, values: any) => axios.post(url, values, getHeaders()),
}
