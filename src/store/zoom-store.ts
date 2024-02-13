import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const initZoomState: ZoomStoreType = {
  zoom: 100,
}

export const useZoomStore = create<ZoomStoreType>()(
  immer(() => {
    return {
      ...initZoomState,
    }
  }),
)

export const resetZoom = () => {
  useZoomStore.setState((state) => {
    state.zoom = 100
  })
}

export const zoomIn = () => {
  useZoomStore.setState((state) => {
    state.zoom += 25
  })
}

export const setZoom = (_zoom: number) => {
  useZoomStore.setState((state) => {
    if (_zoom >= 1) {
      state.zoom = _zoom
    }
  })
}

export const zoomOut = () => {
  useZoomStore.setState((state) => {
    if (state.zoom - 25 < 1) {
      state.zoom -= 1
    } else {
      state.zoom -= 25
    }
  })
}
