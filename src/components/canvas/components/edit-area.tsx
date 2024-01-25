import { useEventListener } from '@mantine/hooks'
import { throttle } from 'lodash'
import React from 'react'
import { useEditStore } from 'src/store/editStore'
import { useZoomStore } from 'src/store/zoom-store'
import FlexDots from './flex-dots'

const EditArea = () => {
  const { canvas, selectedComponents, updateSelectedComponentsPosition } = useEditStore()
  const { zoom } = useZoomStore()
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

  const handleMoveSelectedComponents = (e: React.MouseEvent<HTMLDivElement>) => {
    // 获取鼠标按下时的水平位置
    let startX = e.pageX
    let startY = e.pageY

    const move = throttle((e: any) => {
      // 计算鼠标移动的距离
      const x = e.pageX
      const y = e.pageY

      // 鼠标相对于初始位置向右（或向下）移动了多远，所以需要用当前位置减去初始位置
      let disX = x - startX // 计算水平方向的位移
      let disY = y - startY // 计算垂直方向的位移

      disX = disX * (100 / zoom)
      disY = disY * (100 / zoom)
      // 更新选定组件的位置, 不能直接赋值 disX/Y，因为组件的位置是相对于 canvas 的
      updateSelectedComponentsPosition({
        left: disX,
        top: disY,
      })

      // 更新鼠标 水平/垂直 位置，为下一次移动做准备
      startX = x
      startY = y
    }, 20)
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
  return (
    <div
      style={{ top, left, width, height, zIndex: 9999 }}
      className="absolute cursor-move border-4 border-solid border-rose-500"
      onMouseDown={handleMoveSelectedComponents}
    >
      <FlexDots zoom={zoom} style={{ width, height }} />
    </div>
  )
}

export default EditArea
