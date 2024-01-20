import React from 'react'
import { addComponent, useEditStore } from 'src/store/editStore'
import CanvasItem from './components/canvas-item'
import { toast } from 'sonner'
import { getCanvas } from 'src/request/canvas'
import { useCanvasId } from 'src/hooks/useCanvasIdAndType'

const Canvas = () => {
  const { canvas, setCanvas, clearCanvas } = useEditStore()
  const id = useCanvasId()
  const divRef = React.useRef<HTMLDivElement>(null)
  const fetchCanvas = async () => {
    if (id) {
      await getCanvas(
        id,
        (res: any) => {
          setCanvas({
            ...JSON.parse(res.content),
            title: res.title,
          })
        },
        () => {
          toast.error('获取数据失败')
        },
      )
    }
    // clearCanvas()
  }

  React.useEffect(() => {
    fetchCanvas()
  }, [])

  const onDrop = (e: any) => {
    // 1. 读取被拖拽组件的信息
    const canvasDom = divRef.current?.getBoundingClientRect()
    let draggedElement = e.dataTransfer.getData('drag-component')
    draggedElement = JSON.parse(draggedElement)

    // 2、获取鼠标放置的位置
    const endX = e.pageX
    const endY = e.pageY

    if (!draggedElement || !canvasDom) {
      return
    }

    // 3、获取 canvas 在页面中的位置
    const canvasDOMPos = {
      top: canvasDom.top,
      left: canvasDom.left,
    }
    // 4、计算 draggedElement 相对于 canvas 的顶部和左侧的距离，
    // 注意，如果我们直接将此位置赋值给 draggedElement，那么元素的顶部和左侧将是鼠标的当前位置，元素将不会出现居中对齐鼠标的效果。

    const disX = endX - canvasDOMPos.left
    const disY = endY - canvasDOMPos.top

    // 5、通过从鼠标的位置中减去元素尺寸的一半来计算得出让 draggedElement 居中对齐鼠标的位置。
    // 这样做可以确保元素在被拖放时，是以其中心位置对齐鼠标的当前位置。

    draggedElement.style.left = disX - draggedElement.style.width / 2
    draggedElement.style.top = disY - draggedElement.style.height / 2

    addComponent(draggedElement)
  }

  return (
    <div
      ref={divRef}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative   self-start    shadow-xl "
      style={canvas.style}
    >
      {canvas.components.map((component, index) => (
        <CanvasItem key={component.key} component={component} index={index} />
      ))}
    </div>
  )
}

export default Canvas
