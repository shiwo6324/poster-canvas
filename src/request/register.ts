import axios from 'axios'
import { common, end } from './index'

export function register(
  values: { name: string; password: string },
  successCallback: (data: any) => void,
  failedCallback?: () => void,
) {
  axios.post(end + '/api/register', values).then((res) => {
    common(res, successCallback, failedCallback)
  })
}
