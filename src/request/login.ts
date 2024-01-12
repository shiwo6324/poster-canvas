import axios from 'axios'
import { common } from './index'
import docCookies from '../utils/cookies'

export function login(
  values: { name: string; password: string },
  successCallback: () => void,
  failedCallback?: () => void,
) {
  axios.post('/api/login', values).then((res) => {
    common(
      res,
      () => {
        // 在 cookie 中设置 sessionId 和 name ,以便跟踪用户
        docCookies.setItem('sessionId', res.data.result.sessionId)
        docCookies.setItem('username', res.data.result.name)
        successCallback()
      },
      failedCallback,
    )
  })
}
