import { Box, Grid, Image } from '@mantine/core'
import { defaultComponentStyle } from 'src/utils/const'
import { useSidebarTypeStore } from 'src/store/sidebarStore'
import { addComponent } from 'src/store/editStore'
import React from 'react'
import { CompType } from 'src/types/const'

const defaultStyle: React.CSSProperties = {
  ...defaultComponentStyle,
}

const settings = [
  {
    value: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png',
    style: defaultStyle,
  },
]

const ImageSidebar = () => {
  const { type } = useSidebarTypeStore((state) => state)

  if (type !== CompType.IMAGE) return null
  return (
    <Grid columns={8} p={10} className="z-50 h-full shadow-xl">
      {settings.map((item) => (
        <Grid.Col
          span={4}
          key={item.value}
          onClick={() => addComponent({ ...item, type })}
          onDragStart={(e) => {
            e.dataTransfer.setData('drag-component', JSON.stringify({ ...item, type }))
          }}
        >
          <Box
            draggable={true}
            w={125}
            h={100}
            className="flex cursor-pointer 
                   items-center justify-center border border-solid
                    border-slate-300 hover:border-amber-300 hover:text-amber-300"
          >
            <Image src={item.value} w={125} h={100} />
          </Box>
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default ImageSidebar
