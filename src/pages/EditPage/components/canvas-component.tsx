import React from 'react'
import { IComponentWithKey } from 'src/types/editStore'

interface CanvasComponentProps {
  component: IComponentWithKey
  index: number
}

const CanvasComponent = ({ component, index }: CanvasComponentProps) => {
  const { style } = component

  return (
    <div style={{ ...style, zIndex: index, position: 'absolute' }}>
      {component.type === 1 && <div>text</div>}
    </div>
  )
}

export default CanvasComponent
