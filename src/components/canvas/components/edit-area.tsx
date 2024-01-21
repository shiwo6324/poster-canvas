import React from 'react'
import { useEditStore } from 'src/store/editStore'

const EditArea = () => {
  const { canvas, selectedComponents } = useEditStore()

  const size = selectedComponents.size
  if (size === 0) return
  let top = 9999
  let left = 9999
  let bottom = -9999
  let right = -9999

  selectedComponents.forEach((index) => {
    const component = canvas.components[index]
    top = Math.min(top, component.style.top as number)
    left = Math.min(left, component.style.left as number)
    bottom = Math.max(bottom, (component.style.top as number) + (component.style.height as number))
    right = Math.max(right, (component.style.left as number) + (component.style.width as number))
  })

  const width = right - left + 8
  const height = bottom - top + 8
  top -= 4
  left -= 4
  return (
    <div
      style={{ top, left, width, height }}
      className="pointer-events-none absolute border-4 border-solid border-rose-500"
    >
      编辑区域
    </div>
  )
}

export default EditArea
