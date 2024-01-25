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
      let disX = x - startX
      let disY = y - startY
      disX = disX * (100 / zoom)
      disY = disY * (100 / zoom)
      const newStyle: { top?: number; left?: number; width?: number; height?: number } = {}
      if (direction.indexOf('top') >= 0) {
        disY = 0 - disY
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
