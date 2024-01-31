import { Image } from '@mantine/core'
import { IComponentWithKey } from 'src/types/editStoreTypes'
import { omit, pick } from 'lodash'
import classNames from 'classnames'
import { CompType } from 'src/types/const'
import { useEditStore } from 'src/store/editStore'
import React from 'react'

interface CanvasComponentProps {
  component: IComponentWithKey
  index: number
  isSelected: boolean
}

const CanvasItem = React.memo(({ component, isSelected, index }: CanvasComponentProps) => {
  const { setSelectedComponent, setSelectedComponents } = useEditStore()
  const { style } = component
  const outerStyle = pick(style, ['position', 'top', 'left', 'width', 'height'])
  const innerStyle = omit(style, ['position', 'top', 'left'])

  // TODO: 优化重新渲染
  const handleSelectComponent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      setSelectedComponents([index])
    } else {
      setSelectedComponent(index)
    }
  }

  return (
    <div
      className={classNames('cpm ', isSelected && ' ')}
      style={{ ...outerStyle, zIndex: isSelected ? 999 : index }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => handleSelectComponent(e)}
    >
      <div className="overflow-hidden " style={innerStyle}>
        {component.type === CompType.TEXT && (
          <div className="h-full w-full  whitespace-pre-wrap break-words">{component.value}</div>
          // <div className="h-full w-full whitespace-pre-wrap  text-wrap">{component.value}</div>
        )}

        {component.type === CompType.IMAGE && (
          <Image src={component.value} className="h-full w-full" fit="fill" />
        )}
        {/* {component.type === CompType.GRAPH && <div className="h-full w-full"></div>} */}
      </div>
    </div>
  )
})

export default CanvasItem
