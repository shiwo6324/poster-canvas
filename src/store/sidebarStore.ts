import { CompType } from 'src/types/const'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type SidebarType =
  | CompType.IMAGE
  | CompType.TEXT
  | CompType.GRAPH
  | CompType.TEMPLATE
  | CompType.EMPTY

interface SidebarTypeState {
  type: SidebarType
  setType: (type: SidebarType) => void // 将参数类型改为 SidebarType
}

export const useSidebarTypeStore = create<SidebarTypeState>()(
  immer((set) => ({
    type: CompType.EMPTY as SidebarType,
    setType: (type) => set(() => ({ type })),
  })),
)
