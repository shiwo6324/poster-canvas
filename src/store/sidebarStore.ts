import { CompType } from 'src/types/const'
import { create } from 'zustand'

type SidebarType = CompType.IMAGE | CompType.TEXT | CompType.GRAPH | CompType.EMPTY

interface sidebarTypeState {
  type: SidebarType
  setType: (type: CompType) => void
}

export const useSidebarTypeStore = create<sidebarTypeState>()((set) => ({
  type: CompType.EMPTY,
  setType: (type) => set(() => ({ type })),
}))
