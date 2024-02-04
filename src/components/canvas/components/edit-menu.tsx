import { useEditStore } from '@/src/store/editStore'
import { IComponentWithKey } from '@/src/types/editStoreTypes'
import React from 'react'
import OverlayComponent from './overlay-component'
import { CompType } from '@/src/types/const'

interface EditMenuProps {
  style: React.CSSProperties
  selectedComponentsSize: number
  components: IComponentWithKey[]
  selectedIndex: number
}

const EditMenu = ({ style, selectedComponentsSize }: EditMenuProps) => {
  const {
    canvas,
    deleteComponents,
    selectedComponents,
    copyComponents,
    bringToFront,
    bringToBack,
    addIndex,
    minusIndex,
  } = useEditStore()

  if (selectedComponentsSize === 0) return null
  const components = canvas.content.components
  const selectedComponentIndex = [...selectedComponents][0]
  // 检查当前组件与选中的单个组件是否有重叠
  const selectedComponent = components[selectedComponentIndex]
  const isOverLay = (component: IComponentWithKey) => {
    const selectedComponentStyle = {
      top: selectedComponent.style?.top,
      bottom: selectedComponent.style?.height + selectedComponent.style?.top,
      left: selectedComponent.style?.left,
      right: selectedComponent.style.width + selectedComponent.style?.left,
    }

    const currentComponentStyle = {
      top: component.style?.top,
      bottom: component.style?.height + component.style?.top,
      left: component.style?.left,
      right: component.style.width + component.style?.left,
    }
    // 判断两个组件是否重叠
    if (
      // 如果被选中组件的顶部位置大于传入组件的底部位置，越往上的元素，其 top 值会越小，底部位置越高。
      selectedComponentStyle.top > currentComponentStyle.bottom ||
      // 如果被选中组件的右侧位置小于传入组件的左侧位置
      selectedComponentStyle.right < currentComponentStyle.left ||
      // 如果被选中组件的底部位置小于传入组件的顶部位置
      selectedComponentStyle.bottom < currentComponentStyle.top ||
      // 如果被选中组件的左侧位置大于传入组件的右侧位置
      selectedComponentStyle.left > currentComponentStyle.right
    ) {
      // 如果存在任何一种情况，说明两个组件不重叠，返回 false
      return false
    }

    return true
  }
  return (
    <div className="relative z-[9999] w-44 " style={style}>
      <ul className="absolute -right-32 max-h-[300px] w-full overflow-y-auto rounded-lg  border border-gray-300 bg-white  px-4 py-2 text-sm text-gray-500 shadow-lg">
        <li
          className="w-full cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
          onClick={copyComponents}
        >
          复制
        </li>
        <li
          className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
          onClick={deleteComponents}
        >
          删除组件
        </li>
        {selectedComponent.type !== CompType.GROUP && (
          <>
            <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100" onClick={addIndex}>
              上移一层
            </li>
            <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100" onClick={minusIndex}>
              下移一层
            </li>
          </>
        )}
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100" onClick={bringToFront}>
          置顶
        </li>
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100" onClick={bringToBack}>
          置底
        </li>
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">附近组件</li>

        {selectedComponentsSize === 1 && (
          <>
            {components.map((component, index) => {
              return index === selectedComponentIndex || !isOverLay(component) ? null : (
                <OverlayComponent
                  style={style}
                  key={component.key}
                  index={index}
                  component={component}
                />
              )
            })}
          </>
        )}
      </ul>
    </div>
  )
}

export default EditMenu
