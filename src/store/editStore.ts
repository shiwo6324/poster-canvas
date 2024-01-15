import { ICanvas, IComponent } from 'src/types/editStore'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

interface EditStoreState {
  canvas: ICanvas
  addComponent: (component: IComponent) => void
}

export const useEditStore = create<EditStoreState>()(
  devtools(
    immer((set) => ({
      canvas: getDefaultCanvas(),
      addComponent: (component) =>
        set((state) => {
          state.canvas.components.push({ ...component, key: crypto.randomUUID() })
        }),
    })),
  ),
)

// 避免物料选项栏重新渲染
export const addComponent = (component: IComponent) => {
  useEditStore.setState((state) => {
    state.canvas.components.push({ ...component, key: crypto.randomUUID() })
  })
}
function getDefaultCanvas(): ICanvas {
  return {
    title: '未命名',
    // 页面样式
    style: {
      width: 320,
      height: 568,
      backgroundColor: '#ffffff',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      boxSizing: 'border-box',
    },
    // 组件
    components: [],
  }
}
