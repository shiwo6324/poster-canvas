import { throttle } from 'lodash'
import React from 'react'
import { useEditStore } from 'src/store/editStore'

interface FlexDotsProps {
  zoom: number
  style: any
}

const FlexDots = ({ zoom, style }: FlexDotsProps) => {
  const { width, height, transform } = style
  const { updateSelectedComponentsPosition } = useEditStore()

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const divTarget = e.target as HTMLDivElement
    const direction = divTarget.dataset.direction
    if (!direction) return
    let startX = e.pageX
    let startY = e.pageY
    const move = throttle((e: React.MouseEvent) => {
      const x = e.pageX
      const y = e.pageY
      // 计算鼠标在水平和垂直方向上的移动距离。
      let disX = x - startX
      let disY = y - startY

      disX = disX * (100 / zoom)
      disY = disY * (100 / zoom)
      const newStyle: { top?: number; left?: number; width?: number; height?: number } = {}

      // 需要考虑什么方位的伸缩会改变 top 和 left，比如：右下角的伸缩不会修改 top 和 left
      if (direction.indexOf('top') >= 0) {
        //比喻一下，就好比你站在一个坐标系中，向上是正方向，而代码中的坐标系规定向上是负方向，为了适应这个规定，你需要告诉代码，你实际上是向上拉的，所以要把这个距离取反。这样代码处理的时候，无论坐标系怎么定义，最终效果都是符合用户预期的。
        // disY 是需要参与组件的 height 的运算,在向上拉伸的情况下,我们希望组件的高度变高,
        // 而此时的 disY 是负数,如果不使用 0 - disY，则 disY 是负值
        disY = 0 - disY // 等价  disY = disY = -(disY)
        // 确保了在应用到组件样式时，top 属性减小，而不是增加
        newStyle.top = -disY
      }
      if (direction.indexOf('left') >= 0) {
        disX = 0 - disX
        newStyle.left = -disX
      }
      Object.assign(newStyle, { width: disX, height: disY })
      updateSelectedComponentsPosition(newStyle)
      startX = x
      startY = y
    }, 20)
    const up = () => {
      document.removeEventListener('mouseup', up)
      document.removeEventListener('mousemove', move)
    }
    document.addEventListener('mouseup', up)
    document.addEventListener('mousemove', move)
  }
  return (
    <>
      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: -8,
          left: -8,
          transform,
          cursor: 'nwse-resize',
        }}
        data-direction="top, left"
        onMouseDown={onMouseDown}
      />

      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: -8,
          left: width / 2 - 8,
          transform,
          cursor: 'row-resize',
        }}
        data-direction="top"
        onMouseDown={onMouseDown}
      />

      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: -8,
          left: width - 12,
          transform,
          cursor: 'nesw-resize',
        }}
        data-direction="top right"
        onMouseDown={onMouseDown}
      />

      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: height / 2 - 8,
          left: width - 12,
          transform,
          cursor: 'col-resize',
        }}
        data-direction="right"
        onMouseDown={onMouseDown}
      />

      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: height - 10,
          left: width - 12,
          transform,
          cursor: 'nwse-resize',
        }}
        data-direction="bottom right"
        onMouseDown={onMouseDown}
      />

      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: height - 10,
          left: width / 2 - 8,
          transform,
          cursor: 'row-resize',
        }}
        data-direction="bottom"
        onMouseDown={onMouseDown}
      />

      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: height - 10,
          left: -8,
          transform,
          cursor: 'nesw-resize',
        }}
        data-direction="bottom left"
        onMouseDown={onMouseDown}
      />
      <div
        className="absolute z-50 h-4 w-4 rounded-full bg-[rgba(0,87,255,0.8)] "
        style={{
          top: height / 2 - 8,
          left: -8,
          transform,
          cursor: 'col-resize',
        }}
        data-direction="left"
        onMouseDown={onMouseDown}
      />
    </>
  )
}

export default FlexDots
