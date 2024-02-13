import React from 'react'
import {
  addComponent,
  clearCanvas,
  getNextCanvasHistory,
  getPrevCanvasHistory,
  initCanvas,
  resetCanvasChangeHistory,
  selectAllComponents,
  setCanvas,
  setSelectedComponent,
  useEditStore,
} from 'src/store/editStore'
import CanvasItem from './canvas/components/canvas-item'
import { toast } from 'sonner'
import { getCanvas } from 'src/request/canvas'
import { useCanvasId } from 'src/hooks/useCanvasIdAndType'
import { useClickOutside, useHotkeys } from '@mantine/hooks'
import EditArea from './canvas/components/edit-area'
import Zoom from './canvas/components/zoom'
import { useZoomStore } from 'src/store/zoom-store'
import { setCanvasContainer } from '../store/canvasStore'

const Canvas = () => {
  const { canvas, selectedComponents } = useEditStore()
  const { zoom, zoomOut, zoomIn, resetZoom } = useZoomStore()
  const id = useCanvasId()
  const divRef = useClickOutside(() => {
    // setSelectedComponent(-1)
  })
  React.useEffect(() => {
    setCanvasContainer(divRef.current)
  }, [])
  useHotkeys([
    ['ctrl+a', selectAllComponents],
    [
      'ctrl+equal',
      (e) => {
        e.preventDefault()
        zoomOut()
      },
    ],
    [
      'ctrl+Minus',
      (e) => {
        e.preventDefault()
        zoomIn()
      },
    ],
    ['ctrl+z', getPrevCanvasHistory],
    ['ctrl+shift+x', getNextCanvasHistory],
  ])
  const fetchCanvas = async () => {
    if (id) {
      await getCanvas(
        id,
        (res: any) => {
          const content = JSON.parse(res.content)

          setCanvas({
            ...content,
            title: res.title,
            type: res.type,
            id: res.id,
          })
          resetCanvasChangeHistory()
        },
        () => {
          toast.error('获取数据失败')
        },
      )
    }
    clearCanvas()
    resetZoom()
  }

  React.useEffect(() => {
    fetchCanvas()
    return () => {
      initCanvas()
    }
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
      top: canvasDom.top + window.scrollY, // 考虑垂直滚动的偏移量
      left: canvasDom.left + window.scrollX, // 考虑水平滚动的偏移量
    }
    // 4、计算 draggedElement 相对于 canvas 的顶部和左侧的距离，
    // 注意，如果我们直接将此位置赋值给 draggedElement，那么元素的顶部和左侧将是鼠标的当前位置，元素将不会出现居中对齐鼠标的效果。

    let disX = endX - canvasDOMPos.left
    let disY = endY - canvasDOMPos.top

    disX = disX * (100 / zoom)
    disY = disY * (100 / zoom)

    // 5、通过从鼠标的位置中减去元素尺寸的一半来计算得出让 draggedElement 居中对齐鼠标的位置。
    // 这样做可以确保元素在被拖放时，是以其中心位置对齐鼠标的当前位置。

    draggedElement.style.left = disX - draggedElement.style.width / 2
    draggedElement.style.top = disY - draggedElement.style.height / 2

    addComponent(draggedElement)
  }

  return (
    <>
      <div
        onContextMenu={(e) => {
          e.preventDefault()
        }}
        onClick={(e) => {
          const target = e.target as HTMLDivElement
          if (target.id === 'canvas') {
            setSelectedComponent(-1)
          }
        }}
        id="canvas"
        ref={divRef}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="org   relative    self-start  "
        style={{
          ...canvas.content.style,
          transformOrigin: '50% 0%',
          transform: `scale(${zoom / 100})`,
          boxShadow: '#C4D3ED 1px 1px 10px 5px',
        }}
      >
        <EditArea canvasStyle={canvas.content.style} />
        {canvas.content.components.map((component, index) => (
          <CanvasItem
            isSelected={selectedComponents.has(index)}
            key={component.key}
            component={component}
            index={index}
          />
        ))}
      </div>
      <Zoom />
    </>
  )
}

export default Canvas
