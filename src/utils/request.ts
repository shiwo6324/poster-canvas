import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import useUserStore from '../store/userStore'

// import { getToken } from '@/utils/auth'

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_API, // url = base url + request url
  // withCredentials: true, // 在跨域请求时发送 cookies
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么

    if (useUserStore.getState().token) {
      // 每个请求都携带 token
      // ['X-Token'] 是自定义 headers 键
      // 请根据实际情况修改它
      config.headers['Authorization'] = useUserStore.getState().token
    }
    return config
  },
  (error: AxiosError) => {
    // 处理请求错误
    console.log(error) // 调试用
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data

    // 如果自定义的 code 不是 20000，则判断为错误。
    if (res.code !== 20000) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // });

      // 50008: 非法 token；50012: 其他客户端登录；50014: Token 过期；
      if (res.code === 401 || res.code === 500 || res.code === 50014) {
        // 重新登录
        // MessageBox.confirm(
        //   '您已登出，您可以取消停留在此页面，或重新登录',
        //   '确认登出',
        //   {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload();
        //   });
        // });
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // 调试用
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error)
  },
)

export default request
