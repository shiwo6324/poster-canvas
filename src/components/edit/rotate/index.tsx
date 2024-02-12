import {
  recordCanvasPostionHistory,
  updateSelectedComponentRotateStyle,
} from '@/src/store/editStore'
import { CompType } from '@/src/types/const'
import { IComponentWithKey } from '@/src/types/editStoreTypes'
import { throttle } from 'lodash'
import React from 'react'
import { TbRotate360 } from 'react-icons/tb'

const Rotate = ({
  zoom,
  component,
}: {
  zoom: number
  component: IComponentWithKey
}) => {
  if (component.type === CompType.GROUP) return
  const rotate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const angle =
      (((Number(component.style.transform) || 0) + 90) * Math.PI) / 180
    const radius = (Number(component.style.height) || 0) / 2
    const [offsetX, offsetY] = [
      -Math.cos(angle) * radius,
      -Math.sin(angle) * radius,
    ]
    const startX = e.pageX + offsetX
    const startY = e.pageY + offsetY
    const move = throttle((e) => {
      const x = e.pageX
      const y = e.pageY
      let disX = x - startX
      let disY = y - startY
      disX = disX * (100 / zoom)
      disY = disY * (100 / zoom)
      let deg = (180 / Math.PI) * Math.atan2(disY, disX) - 90

      deg = Math.ceil(deg)

      updateSelectedComponentRotateStyle({ transform: deg as any })
    }, 50)
    const up = () => {
      recordCanvasPostionHistory()
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  return (
    <div
      className="absolute -bottom-11 left-1/2 z-[9999] h-6 w-6 cursor-grab "
      onMouseDown={rotate}
    >
      <TbRotate360 className="text-sky-300" />
    </div>
  )
}

export default Rotate
