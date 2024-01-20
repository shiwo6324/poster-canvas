import { create } from 'zustand'

interface UserState {
  isLogin: boolean
  name: string
}

const useUserStore = create<UserState>()((set) => ({
  isLogin: false,
  name: '',
}))

export default useUserStore
