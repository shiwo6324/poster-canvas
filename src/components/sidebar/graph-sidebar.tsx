import { Box, Grid } from '@mantine/core'
import { defaultComponentStyle } from 'src/utils/const'
import { useSidebarTypeStore } from 'src/store/sidebarStore'
import { addComponent } from 'src/store/editStore'
import React from 'react'

const defaultStyle: React.CSSProperties = {
  ...defaultComponentStyle,
  width: 120,
  height: 120,
  borderColor: 'blue',
  backgroundColor: 'blue',
}

const settings = [
  {
    key: 'graph-0',
    value: '',
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: 'solid',
    },
  },
]

const GraphSidebar = () => {
  const { type } = useSidebarTypeStore((state) => state)

  if (type !== 3) return null
  return (
    <Grid columns={8} p={10} className="relative z-50 h-full shadow-xl">
      {settings.map((item) => (
        <Grid.Col
          span={4}
          key={item.value}
          onClick={() => addComponent({ ...item, type })}
          onDragStart={(e) => {
            e.dataTransfer.setData('drag-component', JSON.stringify({ ...item, type }))
          }}
        >
          <Box draggable={true} w={125} h={120} style={{ ...item.style }} />
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default GraphSidebar
