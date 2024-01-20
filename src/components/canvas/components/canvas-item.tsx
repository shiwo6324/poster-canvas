import { Box, Image } from '@mantine/core'
import { IComponentWithKey } from 'src/types/editStoreTypes'
import { omit, pick } from 'lodash'
import classNames from 'classnames'
import { CompType } from 'src/types/const'
import { useEditStore } from 'src/store/editStore'

interface CanvasComponentProps {
  component: IComponentWithKey
  index: number
}

const CanvasItem = ({ component, index }: CanvasComponentProps) => {
  const { selectedComponents, setSelectedComponent } = useEditStore()
  const isSelected = selectedComponents.has(index)
  const { style } = component
  const outerStyle = pick(style, ['position', 'top', 'left', 'width', 'height'])
  const innerStyle = omit(style, ['position', 'top', 'left'])

  const handleSelectComponent = () => {
    setSelectedComponent(index)
  }
  return (
    <div
      className={classNames(isSelected && 'ring ring-offset-2')}
      style={outerStyle}
      onClick={handleSelectComponent}
    >
      <div className="!border-4 !border-solid !border-black  " style={innerStyle}>
        {component.type === CompType.TEXT && <div>{component.value}</div>}

        {component.type === CompType.IMAGE && (
          <Image src={component.value} className="h-full w-full" fit="fill" />
        )}
      </div>
    </div>
  )
}

export default CanvasItem
