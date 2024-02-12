import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  isLogin: boolean
  name: string
}

const useUserStore = create<UserState>()(
  immer(() => ({
    isLogin: false as boolean,
    name: '',
  })),
)

export default useUserStore
