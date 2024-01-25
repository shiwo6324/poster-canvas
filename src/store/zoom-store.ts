import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  zoom: number
}

type Actions = {
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
  setZoom: (zoom: number) => void
}

export const useZoomStore = create<State & Actions>()(
  immer((set) => ({
    zoom: 100,
    zoomOut: () =>
      set((state) => {
        if (state.zoom - 25 < 1) {
          state.zoom -= 1
        } else {
          state.zoom -= 25
        }
      }),
    zoomIn: () =>
      set((state) => {
        state.zoom += 25
      }),
    setZoom: (_zoom) =>
      set((state) => {
        if (_zoom >= 1) {
          state.zoom = _zoom
        }
      }),
    resetZoom: () =>
      set((state) => {
        state.zoom = 100
      }),
  })),
)
