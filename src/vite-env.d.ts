/// <reference types="vite/client" />

type CanvasRefStoreType = {
  canvasContainer: HTMLDivElement
}

type EditStoreStoreType = {
  canvas: ICanvas
  selectedComponents: Set<number>
  canvasChangeHistory: {
    canvas: ICanvas
    selectedComponents: Set<number>
  }[]
  // 创建存储历史记录的数组， 之所以需要单独存，在上一步、下一步这个过程当中，数组里面的组件是有可能发生变化的，比如：原先选中 10 个组件，这次变了，变成选中 1 个组件了，那这个时候选中状态的 selectedComponents 不变的话会出错
  // 记录存储当前处于哪个历史记录的下标
  canvasChangeHistoryIndex: number
  maxHistory: number
  hasSaved: boolean
}
