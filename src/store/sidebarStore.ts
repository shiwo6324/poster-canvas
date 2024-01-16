import { EMPTY_TYPE, GRAPHIC_TYPE, IMAGE_TYPE, TEXT_TYPE } from 'src/types/const'
import { create } from 'zustand'

type SidebarType = TEXT_TYPE | GRAPHIC_TYPE | IMAGE_TYPE | EMPTY_TYPE

interface sidebarTypeState {
  type: SidebarType
  setType: (type: SidebarType) => void
}

export const useSidebarTypeStore = create<sidebarTypeState>()((set) => ({
  type: 0,
  setType: (type) => set(() => ({ type })),
}))
