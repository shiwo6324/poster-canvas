import React from 'react'
import { useEditStore } from 'src/store/editStore'
import CanvasComponent from './canvas-component'

const Canvas = () => {
  const { canvas, addComponent } = useEditStore()
  const { style } = canvas
  const divRef = React.useRef<HTMLDivElement>(null)
  // React.useEffect(() => {
  //   console.log(divRef)
  // }, [divRef])
  // const onDrop = (e: React.DragEvent) => {
  //   const dragComponent = JSON.parse(e.dataTransfer.getData('drag-component'))

  //   const endX = e.pageX

  //   const endY = e.pageY
  //   const canvasDomPosition = {
  //     top: 100,
  //     left: (document.body.clientWidth - (style.width as number)) / 2,
  //   }
  //   console.log(canvasDomPosition)
  //   console.log(divRef)

  //   const disX = endX - canvasDomPosition.left
  //   const disY = endY - canvasDomPosition.top
  //   dragComponent.style.left = disX - dragComponent.style.width / 2
  //   dragComponent.style.top = disY - dragComponent.style.height / 2

  //   addComponent(dragComponent)
  // }
  const onDrop = (e: React.DragEvent) => {
    const dragComponent = JSON.parse(e.dataTransfer.getData('drag-component'))
    const x = e.pageX
    const y = e.pageY
    const rect = divRef.current?.getBoundingClientRect()
    // 如果 "container" 的 left 是 200，你在浏览器窗口的 x 坐标 250 的位置点击，
    // 那么点击的位置相对于 "container" 的 left 就是 50（250 - 200）。
    // 同样，如果 "container" 的 top 是 100，你点击的 y 坐标是 150，那么点击的位置相对于 "container"
    // 的 top 就是 50 （150 - 100）
    if (!rect) return null
    const offsetX = x - rect.left
    const offsetY = y - rect.top

    dragComponent.style.left = offsetX
    dragComponent.style.top = offsetY

    addComponent(dragComponent)
  }
  return (
    <div
      ref={divRef}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative ml-10 mt-10 self-start shadow-xl"
      style={canvas.style}
    >
      {canvas.components.map((component) => (
        <CanvasComponent key={component.key} component={component} index={2} />
      ))}
    </div>
  )
}

export default Canvas
