## 难点

1、 解决 tailwind 和 mantine 的样式冲突
2、 开始拖拽和结束拖拽 2 个事件分别处于不同组件，如何传递被拖拽组件的信息
3、 如何把组件拖拽到画布，在画布中记录组件被拖放入的位置下标，此时需要注意这里得到的位置下标是相对网页的，但是我们最后需要的是相对画布的位置下标。还需要考虑到元素本身的宽度和高度。假设 item 是正方形，则拖动时鼠标位于 item 的中心则需要减去元素宽/高的一半。也就是说，要将鼠标在元素中的位置设置为元素的中心，需要再减去元素自身宽度和高度的一半。

## 后续优化

1、点击左侧物料添加到画布的时候，避免物料的重新渲染：把 addComponent 放到外部, 不要过度使用 zustand 自定义 hooks

```// 避免物料选项栏重新渲染
export const addComponent = (component: IComponent) => {
  useEditStore.setState((state) => {
    state.canvas.components.push({ ...component, key: crypto.randomUUID() })
  })
}
``

```
