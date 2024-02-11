import { defaultComponentStyle } from './../utils/const'
import { ICanvas, IComponent, IComponentWithKey, IContent } from 'src/types/editStoreTypes'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { enableMapSet } from 'immer'
import { CSSProperties } from 'react'
import { cloneDeep, set } from 'lodash'
import { CompType } from '../types/const'
import { useEditAreaStyle } from '../hooks/useEditAreaStyle'

// enableMapSet()

interface EditStoreState {
  canvas: ICanvas
  selectedComponents: Set<number>
  canvasChangeHistory: { canvas: ICanvas; selectedComponents: Set<number> }[]
  // 创建存储历史记录的数组， 之所以需要单独存，在上一步、下一步这个过程当中，数组里面的组件是有可能发生变化的，比如：原先选中 10 个组件，这次变了，变成选中 1 个组件了，那这个时候选中状态的 selectedComponents 不变的话会出错
  // 记录存储当前处于哪个历史记录的下标
  canvasChangeHistoryIndex: number
  maxHistory: number
  // hasSaved: any
  hasSaved: boolean
  setCanvas: (canvas: ICanvas) => void
  clearCanvas: () => void
  updateCanvasId: (id: number) => void
  addComponent: (component: IComponent) => void
  setSelectedComponents: (indexes: number[]) => void
  setSelectedComponent: (index: number) => void
  selectAllComponents: () => void
  updateSelectedComponentsPosition: (position: { top: number; left: number }) => void
  updateCanvasStyle: (style: CSSProperties) => void
  updateCanvasTitle: (title: string) => void
  updateSelectedComponentValue: (value: string) => void
  updateSelectedComponentRotateStyle: (style: CSSProperties) => void
  updateSelectedComponentAttr: (name: string, value: string) => void
  editSelectedComponentsStyle: (style: CSSProperties) => void
  updateSelectedComponentStyle: (style: React.CSSProperties) => void
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
  alignToCanvas: (style: React.CSSProperties, component: IComponentWithKey) => void
  addTemplateToCanvas: (canvas: ICanvas) => void
  setSaveCanvas: (flag: boolean) => void
}

export const useEditStore = create<EditStoreState>()(
  immer(
    devtools((set) => ({
      canvas: {
        id: undefined,

        title: '未命名',
        type: 'content',
        content: getDefaultCanvasContent(),
      },
      canvasChangeHistory: [
        {
          canvas: {
            id: undefined,
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
      hasSaved: true,
      updateCanvasId: (id) =>
        set((state) => {
          state.canvas.id = id

          state.hasSaved = false
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
            id: undefined,

            title: '未命名',
            type: 'content',

            content: getDefaultCanvasContent(),
          }
          // state.selectedComponents = new Set()
          state.hasSaved = false

          state.selectedComponents.clear()
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

          state.hasSaved = false
        }),
      // 组件多选功能
      // 如果再次点击已经选中的组件，则取消选中
      setSelectedComponents: (indexes) =>
        set((state) => {
          const components = state.canvas.content.components
          // 如果此时已经有组合子组件被选中，不允许和其它组件一起选中
          if (state.selectedComponents.size === 1) {
            const selectedIndex = [...state.selectedComponents][0]
            const selectedComponent = components[selectedIndex]
            if (selectedComponent.groupKey) {
              state.selectedComponents = new Set()
            }
          }
          if (indexes) {
            indexes.forEach((index) => {
              if (state.selectedComponents.has(index)) {
                state.selectedComponents.delete(index)
              } else {
                state.selectedComponents.add(index)
              }
            })
          }
        }),

      // 全部选中
      selectAllComponents: () =>
        set((state) => {
          const components = state.canvas.content.components
          const newSelectedComponents: Set<number> = new Set()
          for (let index = 0; index < components.length; index++) {
            // 把组合组件的子组件排除
            if (components[index].groupKey) {
              continue
            }
            newSelectedComponents.add(index)
          }
          state.selectedComponents = newSelectedComponents
          // new Set(Array.from({ length }, (_, index) => index))
        }),
      // 修改选中组件在画布中的位置
      // 根据改变的量来修改

      updateSelectedComponentsPosition: (position) =>
        set((state) => {
          const { components } = state.canvas.content
          const map = getComponentsMap(state.canvas.content.components)
          // 存储下标，组合组件的子组件、组合组件的父组件、普通组件
          const newSelectedComponents: Set<number> = new Set()
          state.selectedComponents.forEach((index) => {
            const component = components[index]

            if (component.type === CompType.GROUP) {
              component.groupComponentKeys?.forEach((key) => {
                newSelectedComponents.add(map.get(key))
              })
            }
            newSelectedComponents.add(index)
          })

          newSelectedComponents.forEach((index) => {
            const component = components[index]
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
            if (newSelectedComponents.size === 1) {
              state.alignToCanvas(state.canvas.content.style, component)
            }
            // 如果没有无效更新，则将更新后的组件替换回原来的位置
            if (!invalid) {
              state.canvas.content.components[index] = component
            }
            // 移动或者拉伸单个子组件之后，父组件的宽高和位置也会发生变化
            // 重新计算组合组件的位置和宽高

            if (newSelectedComponents.size === 1 && component.groupKey) {
              // 找到父组件
              const groupIndex = map.get(component.groupKey)
              const group = components[groupIndex]
              const newSelectedComponents: Set<number> = new Set()
              group.groupComponentKeys?.forEach((key) => {
                newSelectedComponents.add(map.get(key))
              })
              Object.assign(group.style, useEditAreaStyle(components, newSelectedComponents))
            }
            state.canvas.content.components = components
            state.hasSaved = false
          })
        }),
      // 修改画布的样式
      updateCanvasStyle: (style) =>
        set((state) => {
          Object.assign(state.canvas.content.style, style)

          state.recordCanvasHistory(state)
          state.hasSaved = false
        }),
      // 修改画布的标题
      updateCanvasTitle: (title) =>
        set((state) => {
          state.canvas.title = title
          state.recordCanvasHistory(state)
          state.hasSaved = false
        }),
      // 修改组件的 value
      updateSelectedComponentValue: (value) =>
        set((state) => {
          state.canvas.content.components[0].value = value

          state.hasSaved = false
        }),
      // 修改组件的样式
      updateSelectedComponentStyle: (style) =>
        set((state) => {
          const componentIndex = [...state.selectedComponents][0]
          if (!(typeof componentIndex === 'number' && componentIndex > -1)) return
          Object.assign(state.canvas.content.components[componentIndex].style, style)
          state.recordCanvasHistory(state)
          state.hasSaved = false
        }),
      updateSelectedComponentRotateStyle: (style) =>
        set((state) => {
          const componentIndex = [...state.selectedComponents][0]
          if (!(typeof componentIndex === 'number' && componentIndex > -1)) return

          Object.assign(state.canvas.content.components[componentIndex].style, style)
          state.hasSaved = false

          // state.recordCanvasHistory(state)
        }),
      // 修改组件的属性
      updateSelectedComponentAttr: (name, value) =>
        set((state) => {
          // 获取已选择组件的index
          const componentIndex = [...state.selectedComponents][0]

          state.canvas.content.components[componentIndex][name] = value
          state.recordCanvasHistory(state)
          state.hasSaved = false
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
            state.hasSaved = false

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
          state.hasSaved = false
        }),
      setChangeHistoryIndex: (index) =>
        set((state) => {
          state.canvasChangeHistoryIndex = index
          state.hasSaved = false
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
          state.hasSaved = false
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
          state.hasSaved = false
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
          state.hasSaved = false
        }),
      // 删除选中组件
      deleteComponents: () =>
        set((state) => {
          const selectedComponents = state.selectedComponents
          // 存储组合组件中待删除的子组件
          const newSelectedComponents: Set<number> = new Set()
          const map = getComponentsMap(state.canvas.content.components)
          state.selectedComponents.forEach((index) => {
            const component = state.canvas.content.components[index]
            if (component.type === CompType.GROUP) {
              component.groupComponentKeys?.forEach((key) => {
                newSelectedComponents.add(map.get(key))
              })
            }
            newSelectedComponents.add(index)
          })
          // 当删除单个组合组件的子节点之后，需要调整父组件的位置和宽高
          // 为在删除单个之后，cmpsIndex会发生变化，为了复用map和cmps，我们在这里先调整父组件的位置和宽高
          if (newSelectedComponents.size === 1) {
            const child = state.canvas.content.components[[...newSelectedComponents][0]]
            // child 是要被删除的组件
            // 所以接下来要调整矩形，这个矩形的位置和宽高根据除 child 之外的组合子组件来计算
            if (child.groupKey) {
              const groupIndex = map.get(child.groupKey)
              const group = state.canvas.content.components[groupIndex]
              const newSelectedComponents: Set<number> = new Set()
              group.groupComponentKeys?.forEach((key) => {
                if (key !== child.key) {
                  newSelectedComponents.add(map.get(key))
                }
              })
              Object.assign(
                group.style,
                useEditAreaStyle(state.canvas.content.components, newSelectedComponents),
              )
            }
          }
          state.canvas.content.components = state.canvas.content.components.filter(
            (component, index) => {
              const del = newSelectedComponents.has(index)
              if (del) {
                // 如果这个组件是组合子组件
                const groupKey = component.groupKey
                if (groupKey) {
                  const groupChildComponentIndex = map.get(groupKey)
                  if (!newSelectedComponents.has(groupChildComponentIndex)) {
                    const group = state.canvas.content.components[groupChildComponentIndex]
                    const set = new Set(group.groupComponentKeys)
                    set.delete(component.key)
                    group.groupComponentKeys = [...set]
                  }
                }
              }
              if (component.type === CompType.GROUP) {
                const { groupComponentKeys } = component
                const length = groupComponentKeys!.length
                if (length < 2) {
                  if (length === 1) {
                    const singleComponentIndex = map.get(groupComponentKeys[0])
                    state.canvas.content.components[singleComponentIndex].groupKey = undefined
                  }
                  return false
                }
              }
              return !del
            },
          )

          // state.canvas.content.components = state.canvas.content.components.filter(
          //   (_, index) => !selectedComponents.has(index),
          // )

          state.hasSaved = false
          selectedComponents.clear()
          state.recordCanvasHistory(state)
        }),
      // 复制选中组件
      copyComponents: () =>
        set((state) => {
          const selectedComponents = state.selectedComponents
          const newComponents: IComponentWithKey[] = []
          const map = getComponentsMap(state.canvas.content.components)

          // 获取当前画布组件的长度, 用于获取新复制组件的下标
          let componentsLength = state.canvas.content.components.length
          // 存储新的选中组件索引集合
          const newSelectedComponents: Set<number> = new Set()
          selectedComponents.forEach((index) => {
            const component = state.canvas.content.components[index]
            const componentToCopy = setCopiedComponentPosition(component)
            // 组合组件
            if (componentToCopy.type === CompType.GROUP) {
              componentToCopy.groupComponentKeys = []
              component.groupComponentKeys?.forEach((key) => {
                const childIndex = map.get(key)
                const childComponent = setCopiedComponentPosition(
                  state.canvas.content.components[childIndex],
                )
                childComponent.groupKey = componentToCopy.key
                componentToCopy.groupComponentKeys?.push(childComponent.key)
                newComponents.push(childComponent)
                componentsLength++
              })
            }

            newComponents.push(componentToCopy)
            // 将新组件的索引添加到新的选中组件集合中
            newSelectedComponents.add(componentsLength++)
          })
          state.canvas.content.components = state.canvas.content.components.concat(newComponents)
          // 更新选中组件索引集合为新的选中组件集合
          state.selectedComponents = newSelectedComponents
          state.hasSaved = false
        }),
      // 组件置顶
      // 置顶，把组件放到数组最后
      // 如果是组合组件 N，包含 n 个子组件，则组件顺序如下：
      // 0...m，n0，nl，n2...，N 则把组合组件放到最后，
      // m+n+1=len
      bringToFront: () =>
        set((state) => {
          const selectedComponentIndex = [...state.selectedComponents][0]
          const selectedComponent = state.canvas.content.components[selectedComponentIndex]

          const length = state.canvas.content.components.length
          if (selectedComponent.type === CompType.GROUP) {
            // 组合组件
            const set = new Set(selectedComponent.groupComponentKeys)
            // m 是其他组件，n 是子组件
            let m = 0
            // 组合组件的子组件的起始索引
            let n = length - set.size - 1
            // 复制组件数组，以便在循环中修改数组
            const components = [...state.canvas.content.components]
            for (let index = 0; index < length; index++) {
              const component = components[index]
              if (component.key === selectedComponent.key) {
                // 如果是父组件，将其移到数组的最后

                state.canvas.content.components[length - 1] = component
              } else if (set.has(component.key)) {
                // 如果是子组件，将其移到数组的子组件区域

                state.canvas.content.components[n++] = component
              } else {
                // 如果是其他组件，将其移到数组的非子组件区域

                state.canvas.content.components[m++] = component
              }
            }
          } else {
            if (selectedComponentIndex === state.canvas.content.components.length - 1) {
              // 如果选中的组件不是组合组件，且已经在数组的最后，则不进行任何操作
              return
            }
            state.canvas.content.components = state.canvas.content.components
              .slice(0, selectedComponentIndex)
              .concat(state.canvas.content.components.slice(selectedComponentIndex + 1))
              .concat(state.canvas.content.components[selectedComponentIndex])
          }

          state.selectedComponents = new Set([state.canvas.content.components.length - 1])
          state.hasSaved = false
          state.recordCanvasHistory(state)
        }),
      // 组件置底
      bringToBack: () =>
        set((state) => {
          const selectedComponentIndex = [...state.selectedComponents][0]
          const selectedComponent = state.canvas.content.components[selectedComponentIndex]

          if (selectedComponent.type === CompType.GROUP) {
            const set = new Set(selectedComponent.groupComponentKeys)
            let m = 1
            let n = set.size + 1
            // 复制组件数组，以便在循环中修改数组
            const length = state.canvas.content.components.length

            const components = [...state.canvas.content.components]
            for (let index = 0; index < length; index++) {
              const component = components[index]
              if (component.key === selectedComponent.key) {
                // 如果是父组件，将其移到数组的前面

                state.canvas.content.components[0] = component
              } else if (set.has(component.key)) {
                // 如果是子组件，将其移到数组的子组件区域
                state.canvas.content.components[m++] = component
              } else {
                // 如果是其他组件，将其移到数组的非子组件区域

                state.canvas.content.components[n++] = component
              }
            }
          } else {
            if (selectedComponentIndex === 0) {
              return
            }
            state.canvas.content.components = [
              state.canvas.content.components[selectedComponentIndex],
            ]
              .concat(state.canvas.content.components.slice(0, selectedComponentIndex))
              .concat(state.canvas.content.components.slice(selectedComponentIndex + 1))
          }

          state.selectedComponents = new Set([0])
          state.recordCanvasHistory(state)
          state.hasSaved = false
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
          state.hasSaved = false
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
          state.hasSaved = false
        }),
      alignToCanvas: (canvaStyle, component) =>
        set((state) => {
          if (state.selectedComponents.size > 1) return
          const componentStyle = component.style
          state.hasSaved = false

          // 中心 X 轴，组件距离中心点的距离小于 12 显示吸附线，距离小于 3 自动吸附组件到中心点
          // 组件距离画布的 top + 组件的高度/2 - 画布的高度/2 得到组件中心点距离画布中间的距离
          autoAlign(
            componentStyle.top + componentStyle.height / 2 - canvaStyle.height / 2,
            'centerXLine',
            () => {
              component.style.top = canvaStyle.height / 2 - component.style.height / 2
            },
          )
          // 中心 Y 轴
          autoAlign(
            componentStyle.left + componentStyle.width / 2 - canvaStyle.width / 2,
            'centerYLine',
            () => {
              component.style.left = canvaStyle.width / 2 - component.style.width / 2
            },
          )
          // 对齐画布 top
          autoAlign(componentStyle.top, 'canvasLineTop', () => {
            component.style.top = 0
          })
          // 对齐画布 bottom
          autoAlign(
            componentStyle.top + componentStyle.height - canvaStyle.height,
            'canvasLineBottom',
            () => {
              component.style.top = canvaStyle.height - componentStyle.height
            },
          )
          // 对齐画布 left
          autoAlign(componentStyle.left, 'canvasLineLeft', () => {
            component.style.left = 0
          })
          // 对齐画布 right
          autoAlign(
            componentStyle.left + componentStyle.width - canvaStyle.width,
            'canvasLineRight',
            () => {
              component.style.left = canvaStyle.width - componentStyle.width
            },
          )
        }),
      addTemplateToCanvas: (canvas) =>
        set((state) => {
          const content = JSON.parse(canvas.content)

          state.canvas.content = content
          state.canvas.content.components = content.cmps
          state.canvas.title = canvas.title + '副本'
          state.canvas.type = 'content'
          state.selectedComponents.clear()
          state.recordCanvasHistory(state)
          state.hasSaved(false)
        }),
      setSaveCanvas: (flag) =>
        set((state) => {
          state.hasSaved = flag
        }),
    })),
  ),
)

function autoAlign(_distance: number, domId: string, handleAlign: () => void) {
  const showDistance = 12
  const adjustDistance = 3
  const distance = Math.abs(_distance)
  const line = document.getElementById(domId)
  if (distance < showDistance) {
    // 显示参考线
    line.style.display = 'block'
  }
  if (distance < adjustDistance) {
    // 自动吸附
    handleAlign()
  }
}

// 避免物料选项栏重新渲染
export const addComponent = (component: IComponent) => {
  useEditStore.setState((state) => {
    state.canvas.content.components.push({ ...component, key: crypto.randomUUID() })
    // 添加组件自动进入编辑状态
    state.selectedComponents = new Set([state.canvas.content.components.length - 1])
    state.recordCanvasHistory(state)
    state.hasSaved = false
    // state.canvasChangeHistory.push({
    //   canvas: state.canvas,
    //   selectedComponents: state.selectedComponents,
    // })
    // state.canvasChangeHistoryIndex++
  })
}

// 初始化/卸载 画布
export const initCanvas = () => {
  useEditStore.setState((state) => {
    state.canvas = {
      id: null,
      title: '未命名',
      type: 'content',
      content: getDefaultCanvasContent(),
    }
    state.hasSaved = true
    state.selectedComponents = new Set()
    state.canvasChangeHistory = [
      {
        canvas: {
          id: null,
          title: '未命名',
          type: 'content',
          content: getDefaultCanvasContent(),
        },
        selectedComponents: new Set(),
      },
    ]
    state.canvasChangeHistoryIndex = 0
  })
}
// 组合组件
// 多个子组件组合到一个组合组件里
// 如果子组件本身就是组合组件，那么需要把这个组合组件的子组件筛选取出来，
// 最后再把所有子组件放到一个组合组件里。最后不要忘记把原先的组合组件删除
export const groupSelectedComponents = () => {
  useEditStore.setState((state) => {
    const { components } = state.canvas.content
    const map = getComponentsMap(components)
    const { top, left, width, height } = useEditAreaStyle(components, state.selectedComponents)
    // 生成一个父组件
    const groupComponent: IComponentWithKey = {
      type: CompType.GROUP,
      key: crypto.randomUUID(),
      style: {
        ...defaultComponentStyle,
        top,
        left,
        width,
        height,
      },
      groupComponentKeys: [],
    }

    state.selectedComponents.forEach((index) => {
      const component = components[index]
      // 如果组件本身是组合组件，遍历查找该组合组件的子组件
      if (component.type === CompType.GROUP) {
        component.groupComponentKeys?.forEach((key) => {
          const childIndex = map.get(key)
          const child = components[childIndex]
          groupComponent.groupComponentKeys?.push(child.key)
          child.groupKey = groupComponent.key
          map.delete(key)
        })
      } else {
        // 组合所有子组件

        groupComponent.groupComponentKeys?.push(component.key)
        component.groupKey = groupComponent.key
      }
    })
    // 删除老的组合组件
    components.filter(
      (component, index) =>
        !(state.selectedComponents.has(index) && component.type === CompType.GROUP),
    )

    components.push(groupComponent)
    state.canvas.content.components = components
    state.hasSaved = false
    state.selectedComponents = new Set([components.length - 1])
    state.recordCanvasHistory(state)
  })
}
// 根据组合组件的子组件 index，返回父组件的 index
export const getComponentGroupIndex = (childIndex: number) => {
  const store = useEditStore.getState()
  const components = store.canvas.content.components
  const map = getComponentsMap(components)
  const groupIndex = map.get(components[childIndex].groupKey)
  return groupIndex
}
export const cancelGroupSelectedComponents = () => {
  useEditStore.setState((state) => {
    // 1. 拆分子组件
    // 2. 删除父组件
    // 3. 选中子组件
    let { components } = state.canvas.content
    const map = getComponentsMap(components)
    const newSelectedComponents: Set<number> = new Set()
    const selectedComponentIndex = [...state.selectedComponents][0]
    const selectedGroup = components[selectedComponentIndex]
    selectedGroup.groupComponentKeys?.forEach((key) => {
      const componentIndex = map.get(key)
      const component = components[componentIndex]
      component.groupKey = undefined
      newSelectedComponents.add(componentIndex)
    })
    // 删除父组件
    components = components
      .slice(0, selectedComponentIndex)
      .concat(components.slice(selectedComponentIndex + 1))
    state.canvas.content.components = components
    state.hasSaved = false
    state.selectedComponents = newSelectedComponents
    state.recordCanvasHistory(state)
  })
}

function getComponentsMap(components: IComponentWithKey[]) {
  const map = new Map()
  components.forEach((component, index) => {
    map.set(component.key, index)
  })
  return map
}

function setCopiedComponentPosition(_componentToCopy: IComponentWithKey) {
  const componentToCopy = cloneDeep(_componentToCopy)
  componentToCopy.key = crypto.randomUUID()
  componentToCopy.style.top += 40
  componentToCopy.style.left += 40
  return componentToCopy
}

// 初始化画布
function getDefaultCanvasContent(): IContent {
  return {
    // 页面样式
    style: {
      width: 320,
      height: 568,
      backgroundColor: '#202731',
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
