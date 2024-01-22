import React from 'react'
import { useEditStore } from 'src/store/editStore'

const EditArea = () => {
  const { canvas, selectedComponents } = useEditStore()

  const size = selectedComponents.size
  if (size === 0) return

  // 初始化边界值
  let top = 9999
  let left = 9999
  let bottom = -9999
  let right = -9999

  // 计算选中组件的边界值
  selectedComponents.forEach((index) => {
    const component = canvas.components[index]
    top = Math.min(top, component.style.top as number)
    left = Math.min(left, component.style.left as number)
    // 需要 top/left 加上 height/width 的原因是，计算哪个组件在最下边/右边
    bottom = Math.max(bottom, (component.style.top as number) + (component.style.height as number))
    right = Math.max(right, (component.style.left as number) + (component.style.width as number))
  })

  // 需要加上红色的边框值和内层的的蓝色的边框
  const width = right - left + 8
  const height = bottom - top + 8
  // 减去蓝框和红框
  top -= 4
  left -= 4
  return (
    <div
      style={{ top, left, width, height }}
      className="pointer-events-none absolute border-4 border-solid border-rose-500"
    ></div>
  )
}

export default EditArea
