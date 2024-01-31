import { ICanvas, IComponent, IComponentWithKey, IContent } from 'src/types/editStoreTypes'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { enableMapSet } from 'immer'
import { CSSProperties } from 'react'
import { cloneDeep } from 'lodash'

enableMapSet()

interface EditStoreState {
  canvas: ICanvas
  setCanvas: (canvas: ICanvas) => void
  clearCanvas: () => void
  updateCanvasId: (id: number) => void
  addComponent: (component: IComponent) => void
  selectedComponents: Set<number>
  setSelectedComponents: (indexes: number[]) => void
  setSelectedComponent: (index: number) => void
  selectAllComponents: () => void
  updateSelectedComponentsPosition: (position: { top: number; left: number }) => void
  updateCanvasStyle: (style: CSSProperties) => void
  updateCanvasTitle: (title: string) => void
  updateSelectedComponentValue: (value: string) => void
  updateSelectedComponentStyle: (style: CSSProperties) => void
  updateSelectedComponentAttr: (name: string, value: string) => void
  editSelectedComponentsStyle: (style: CSSProperties) => void
  // 创建存储历史记录的数组， 之所以需要单独存，在上一步、下一步这个过程当中，数组里面的组件是有可能发生变化的，比如：原先选中 10 个组件，这次变了，变成选中 1 个组件了，那这个时候选中状态的 selectedComponents 不变的话会出错
  canvasChangeHistory: { canvas: ICanvas; selectedComponents: Set<number> }[]
  // 记录存储当前处于哪个历史记录的下标
  canvasChangeHistoryIndex: number
  maxHistory: number
  setChangeHistoryIndex: (index: number) => void
  resetCanvasChangeHistory: () => void
  recordCanvasHistory: (history: EditStoreState) => void
  recordCanvasPostionHistory: () => void
  getPrevCanvasHistory: () => void
  getNextCanvasHistory: () => void
  deleteComponents: () => void
  copyComponents: () => void
  bringToBack: () => void
  bringToFront: () => void
  addIndex: () => void
  minusIndex: () => void
}

export const useEditStore = create<EditStoreState>()(
  devtools(
    immer((set) => ({
      canvas: {
        id: null,
        title: '未命名',
        type: 'content',
        content: getDefaultCanvasContent(),
      },
      canvasChangeHistory: [
        {
          canvas: {
            id: null,
            title: '未命名',
            type: 'content',
            content: getDefaultCanvasContent(),
          },
          selectedComponents: new Set(),
        },
      ],
      canvasChangeHistoryIndex: 0,
      selectedComponents: new Set(),
      maxHistory: 100,
      updateCanvasId: (id) =>
        set((state) => {
          state.canvas.id = id
        }),
      addComponent: (component) =>
        set((state) => {
          state.canvas.content.components.push({ ...component, key: crypto.randomUUID() })
          // state.recordCanvasHistory(state)
        }),
      setCanvas: (canvas) =>
        set((state) => {
          state.canvas = canvas
        }),
      // 清空画布
      clearCanvas: () =>
        set((state) => {
          state.canvas = {
            id: null,
            title: '未命名',
            type: 'content',
            content: getDefaultCanvasContent(),
          }
          state.selectedComponents = new Set()
          state.recordCanvasHistory(state)
        }),
      // 选中单个， 如果 index 为 -1，则取消选中
      // 大于-1的下标，只选中一个组件
      setSelectedComponent: (index) =>
        set((state) => {
          if (index > -1) {
            state.selectedComponents = new Set([index])
          }
          if (index === -1) {
            if (state.selectedComponents.size > 0) {
              state.selectedComponents.clear()
            }
          }
        }),
      // 组件多选功能
      // 如果再次点击已经选中的组件，则取消选中
      setSelectedComponents: (indexes) =>
        set((state) => {
          if (indexes) {
            indexes.forEach((index) => {
              if (state.selectedComponents.has(index)) {
                // 取消选中
                state.selectedComponents.delete(index)
              } else {
                // 选中
                state.selectedComponents.add(index)
              }
            })
          }
        }),

      // 全部选中
      selectAllComponents: () =>
        set((state) => {
          const length = state.canvas.content.components.length
          state.selectedComponents = new Set(Array.from({ length }, (_, index) => index))
        }),
      // 修改选中组件在画布中的位置
      // 根据改变的量来修改
      updateSelectedComponentsPosition: (position) =>
        set((state) => {
          // 遍历编辑区域中的组件
          state.selectedComponents.forEach((index) => {
            // 制作组件的副本
            const component = { ...state.canvas.content.components[index] }

            // 用于标记是否存在无效的更新
            let invalid = false

            // 遍历传入的位置对象
            for (const key in position) {
              // 检查是否更新宽度或高度，并且更新后的值小于 2
              if (
                (key === 'width' || key === 'height') &&
                component.style[key] + position[key] < 2
              ) {
                // 存在无效的更新
                invalid = true
                break
              }

              // 更新组件的样式属性
              component.style[key] += position[key]
            }

            // 如果没有无效更新，则将更新后的组件替换回原来的位置
            if (!invalid) {
              state.canvas.content.components[index] = component
            }
          })
        }),
      // 修改画布的样式
      updateCanvasStyle: (style) =>
        set((state) => {
          Object.assign(state.canvas.content.style, style)
          state.recordCanvasHistory(state)
        }),
      // 修改画布的标题
      updateCanvasTitle: (title) =>
        set((state) => {
          state.canvas.title = title
          state.recordCanvasHistory(state)
        }),
      // 修改组件的 value
      updateSelectedComponentValue: (value) =>
        set((state) => {
          state.canvas.content.components[0].value = value
        }),
      // 修改组件的样式
      updateSelectedComponentStyle: (style) =>
        set((state) => {
          const componentIndex = [...state.selectedComponents][0]
          Object.assign(state.canvas.content.components[componentIndex].style, style)
          state.recordCanvasHistory(state)
        }),
      // 修改组件的属性
      updateSelectedComponentAttr: (name, value) =>
        set((state) => {
          // 获取已选择组件的index
          const componentIndex = [...state.selectedComponents][0]

          state.canvas.content.components[componentIndex][name] = value
          state.recordCanvasHistory(state)
        }),
      // 修改多个组件的样式
      editSelectedComponentsStyle: (style) =>
        set((state) => {
          state.selectedComponents.forEach((index) => {
            const componentStyle = { ...state.canvas.content.components[index].style }
            const canvasStyle = state.canvas.content.style

            if (style.right === 0) {
              // 如果选择右对齐，计算 left
              componentStyle.left = canvasStyle.width - componentStyle.width
            } else if (style.bottom === 0) {
              // 如果选择下对齐，计算 top
              componentStyle.top = canvasStyle.height - componentStyle.height
            } else if (style.left === 'center') {
              // 如果选择水平对齐，计算 left
              componentStyle.left = (canvasStyle.width - componentStyle.width) / 2
            } else if (style.top === 'center') {
              // 如果选择垂直居中，计算 top
              componentStyle.top = (canvasStyle.height - componentStyle.height) / 2
            } else {
              // 其他情况，直接应用选择的样式
              Object.assign(componentStyle, style)
            }
            state.canvas.content.components[index].style = componentStyle
            state.recordCanvasHistory(state)
          })
        }),
      resetCanvasChangeHistory: () =>
        set((state) => {
          state.canvasChangeHistory = [
            {
              canvas: state.canvas,
              selectedComponents: state.selectedComponents,
            },
          ]
        }),
      setChangeHistoryIndex: (index) =>
        set((state) => {
          state.canvasChangeHistoryIndex = index
        }),

      // 记录画布的操作历史
      // 该函数中需要操作的 状态 是函数调用处的 状态(history)，而不是该函数中的 state
      recordCanvasHistory: (history) =>
        set((state) => {
          // 在撤销回退过程中，此时历史下标为 currentIndex，如果此时用户又去修改画布或者组件属性,
          // 重新插入了新的历史进来，那么把 currentIndex 之后的记录全部删除，再把新的画布数据插入进来
          // 历史记录：0 1 2 3 4 5 ，如果回退到下标 index 2，并且修改了该历史记录的内容，则从 2 开始删除后面的历史记录

          history.canvasChangeHistory = history.canvasChangeHistory.slice(
            0,
            history.canvasChangeHistoryIndex + 1,
          )
          history.canvasChangeHistory.push({
            canvas: history.canvas,
            selectedComponents: history.selectedComponents,
          })
          history.canvasChangeHistoryIndex++
          // 如果历史记录超过了最大允许数量，删除最旧的记录并相应调整下标
          if (history.canvasChangeHistory.length >= history.maxHistory) {
            history.canvasChangeHistory.shift()
            history.canvasChangeHistoryIndex--
          }
        }),
      // 涉及拖拽、拉伸、旋转等更新频繁操作的时候，没有必要时刻记录操作的痕迹，可以在松手移除事件后再记录
      recordCanvasPostionHistory: () =>
        set((state) => {
          // 如果用户再拖拽或者拉伸过程中的位置状态和上一次历史记录的位置状态对比没有变化，则不记录
          if (state.canvas === state.canvasChangeHistory[state.canvasChangeHistoryIndex]?.canvas) {
            return
          }
          state.recordCanvasHistory(state)
        }),
      // 获取上一个画布历史记录
      getPrevCanvasHistory: () =>
        set((state) => {
          // 计算新的历史记录索引
          let newIndex = state.canvasChangeHistoryIndex - 1

          // 确保新索引不小于 0
          if (newIndex < 0) {
            newIndex = 0
          }
          // 如果新索引与当前索引相同，则无需执行更改
          if (state.canvasChangeHistoryIndex === newIndex) {
            return
          }
          // 获取新索引处的历史记录项
          const item = state.canvasChangeHistory[newIndex]
          // 应用历史记录中的画布和选定组件到当前状态
          state.canvas = item.canvas
          state.selectedComponents = item.selectedComponents
          // 更新当前历史记录索引为新索引
          state.canvasChangeHistoryIndex = newIndex
        }),
      // 获取下一个画布历史记录
      getNextCanvasHistory: () =>
        set((state) => {
          let newIndex = state.canvasChangeHistoryIndex + 1
          // 确保新索引不超过历史记录数组的最大索引
          if (newIndex >= state.canvasChangeHistory.length) {
            newIndex = state.canvasChangeHistory.length - 1
          }
          // 如果新索引与当前索引相同，则无需执行更改
          if (state.canvasChangeHistoryIndex === newIndex) {
            return
          }
          // 获取新索引处的历史记录项
          const item = state.canvasChangeHistory[newIndex]
          // 应用历史记录中的画布和选定组件到当前状态
          state.canvas = item.canvas
          state.selectedComponents = item.selectedComponents
          // 更新当前历史记录索引为新索引
          state.canvasChangeHistoryIndex = newIndex
        }),
      // 删除选中组件
      deleteComponents: () =>
        set((state) => {
          const selectedComponents = state.selectedComponents
          state.canvas.content.components = state.canvas.content.components.filter(
            (_, index) => !selectedComponents.has(index),
          )
          selectedComponents.clear()
          state.recordCanvasHistory(state)
        }),
      // 复制选中组件
      copyComponents: () =>
        set((state) => {
          const selectedComponents = state.selectedComponents
          const newComponents: IComponentWithKey[] = []
          // 获取当前画布组件的长度, 用于获取新复制组件的下标
          let componentsLength = state.canvas.content.components.length - 1
          // 存储新的选中组件索引集合
          const newSelectedComponents: Set<number> = new Set()
          selectedComponents.forEach((index) => {
            const componentToCopy = cloneDeep(state.canvas.content.components[index])
            if (componentToCopy.style) {
              componentToCopy.style.top += 40
              componentToCopy.style.left += 40
            }
            componentToCopy.key = crypto.randomUUID()
            newComponents.push(componentToCopy)
            componentsLength++
            // 将新组件的索引添加到新的选中组件集合中
            newSelectedComponents.add(componentsLength)
          })
          state.canvas.content.components = state.canvas.content.components.concat(newComponents)
          // 更新选中组件索引集合为新的选中组件集合
          state.selectedComponents = newSelectedComponents
        }),
      // 组件置顶
      bringToFront: () =>
        set((state) => {
          const selectedComponentIndex = [...state.selectedComponents][0]
          if (selectedComponentIndex === state.canvas.content.components.length - 1) {
            return
          }
          state.canvas.content.components = state.canvas.content.components
            .slice(0, selectedComponentIndex)
            .concat(state.canvas.content.components.slice(selectedComponentIndex + 1))
            .concat(state.canvas.content.components[selectedComponentIndex])
          state.selectedComponents = new Set([state.canvas.content.components.length - 1])
          state.recordCanvasHistory(state)
        }),
      // 组件置底
      bringToBack: () =>
        set((state) => {
          const selectedComponentIndex = [...state.selectedComponents][0]
          if (selectedComponentIndex === 0) {
            return
          }
          state.canvas.content.components = [
            state.canvas.content.components[selectedComponentIndex],
          ]
            .concat(state.canvas.content.components.slice(0, selectedComponentIndex))
            .concat(state.canvas.content.components.slice(selectedComponentIndex + 1))

          state.selectedComponents = new Set([0])
          state.recordCanvasHistory(state)
        }),
      // 组件上移一个层级
      // 和后一个元素交换位置
      addIndex: () =>
        set((state) => {
          const selectedComponentIndex = [...state.selectedComponents][0]

          // 检查选定组件索引是否有效
          if (
            selectedComponentIndex < 0 ||
            selectedComponentIndex >= state.canvas.content.components.length - 1
          ) {
            // 无效索引，不执行任何操作
            return
          }

          // 交换选定组件与下一个组件的位置，实现置顶效果
          ;[
            state.canvas.content.components[selectedComponentIndex],
            state.canvas.content.components[selectedComponentIndex + 1],
          ] = [
            state.canvas.content.components[selectedComponentIndex + 1],
            state.canvas.content.components[selectedComponentIndex],
          ]

          // 更新选定组件集合，将置顶的组件设为唯一选定组件
          state.selectedComponents = new Set([selectedComponentIndex + 1])

          // 记录操作历史
          state.recordCanvasHistory(state)
        }),
      // 组件下移一个层级
      // 和前一个元素交换位置
      minusIndex: () =>
        set((state) => {
          const selectedComponentIndex = [...state.selectedComponents][0]

          // 检查选定组件索引是否有效
          if (selectedComponentIndex === 0) {
            // 无效索引，不执行任何操作
            return
          }

          // 交换选定组件与下一个组件的位置，实现置顶效果
          ;[
            state.canvas.content.components[selectedComponentIndex],
            state.canvas.content.components[selectedComponentIndex - 1],
          ] = [
            state.canvas.content.components[selectedComponentIndex - 1],
            state.canvas.content.components[selectedComponentIndex],
          ]

          // 更新选定组件集合，将置顶的组件设为唯一选定组件
          state.selectedComponents = new Set([selectedComponentIndex - 1])

          // 记录操作历史
          state.recordCanvasHistory(state)
        }),
    })),
  ),
)

// 避免物料选项栏重新渲染
export const addComponent = (component: IComponent) => {
  useEditStore.setState((state) => {
    state.canvas.content.components.push({ ...component, key: crypto.randomUUID() })
    // 添加组件自动进入编辑状态
    state.selectedComponents = new Set([state.canvas.content.components.length - 1])
    state.recordCanvasHistory(state)
    // state.canvasChangeHistory.push({
    //   canvas: state.canvas,
    //   selectedComponents: state.selectedComponents,
    // })
    // state.canvasChangeHistoryIndex++
  })
}
// 初始化画布
function getDefaultCanvasContent(): IContent {
  return {
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
