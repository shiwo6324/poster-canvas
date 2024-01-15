import { create } from 'zustand'

type SidebarType = 0 | 1 | 2 | 3

interface sidebarTypeState {
  type: SidebarType
  setType: (type: SidebarType) => void
}

export const useSidebarTypeStore = create<sidebarTypeState>()((set) => ({
  type: 0,
  setType: (type) => set((state) => ({ type })),
}))
