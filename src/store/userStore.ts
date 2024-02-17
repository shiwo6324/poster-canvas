import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

interface UserState {
  isLogin: boolean
  token: string | null
}

// const useUserStore = create<UserState>()(
//   immer(() => ({
//     isLogin: false as boolean,
//     token: null as any,
//   })),
// )
const useUserStore = create<UserState>()(
  immer(
    // 3. 简化变更数据操作的 immer 中间件
    devtools(
      // 2. 调试 Store 数据的中间件
      persist(
        // 1. 持久化数据的中间件
        () => {
          return {
            // store 中的数据
            isLogin: false as boolean,
            token: null as any,
          }
        },
        {
          name: 'user-store', // 数据的存储名称
        },
      ),
    ),
  ),
)
export const setUserToken = (token: string) => {
  useUserStore.setState((state) => {
    state.token = `Bearer ${token}`
  })
}

export default useUserStore
