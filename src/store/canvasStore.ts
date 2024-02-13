import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const initCanvasRefState: CanvasRefStoreType = {
  canvasContainer: {} as HTMLDivElement,
}

const useCanvasRefStore = create<CanvasRefStoreType>()(
  immer(() => {
    return {
      ...initCanvasRefState,
    }
  }),
)

export const setCanvasContainer = (canvasContainer: HTMLDivElement) => {
  useCanvasRefStore.setState((state) => {
    state.canvasContainer = canvasContainer as any
  })
}

export default useCanvasRefStore
