import { Box, Image } from '@mantine/core'
import { IComponentWithKey } from 'src/types/editStoreTypes'

interface CanvasComponentProps {
  component: IComponentWithKey
  index: number
}

const CanvasItem = ({ component, index }: CanvasComponentProps) => {
  const { style } = component

  return (
    <>
      {component.type === 1 && (
        <div style={{ ...style, zIndex: index, position: 'absolute' }}>{component.value}</div>
      )}
      {component.type === 2 && (
        <Image
          style={{ ...style, zIndex: index, position: 'absolute' }}
          src={component.value}
          w={90}
          h={90}
          fit="contain"
        />
      )}
      {component.type === 3 && (
        <Box w={120} h={120} style={{ ...style, zIndex: index, position: 'absolute' }} />
      )}
    </>
  )
}

export default CanvasItem
