import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  isLogin: boolean
  name: string
}

const useUserStore = create<UserState>()(
  immer((set) => ({
    isLogin: false,
    name: '',
  })),
)

export default useUserStore
