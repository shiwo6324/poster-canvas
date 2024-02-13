import { CompType } from 'src/types/const'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const initSidebarState: SidebarStoreType = {
  type: CompType.EMPTY,
}

export const useSidebarTypeStore = create<SidebarStoreType>()(
  immer(() => {
    return {
      ...initSidebarState,
    }
  }),
)

export const setSidebarType = (type: CompType) => {
  useSidebarTypeStore.setState((state) => {
    state.type = type
  })
}
