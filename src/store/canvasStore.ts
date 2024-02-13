import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  canvasContainer: HTMLDivElement
  setCanvasContainer: (canvasContainer: HTMLDivElement) => void
}

const canvasStore = create<UserState>()(
  immer((set) => ({
    canvasContainer: {} as HTMLDivElement,
    setCanvasContainer: (canvasContainer) =>
      set((state) => {
        state.canvasContainer = canvasContainer as any
      }),
  })),
)

export default canvasStore
