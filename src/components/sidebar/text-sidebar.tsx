import { Box, Grid } from '@mantine/core'
import { defaultComponentStyle } from 'src/utils/const'
import { useSidebarTypeStore } from 'src/store/sidebarStore'
import { addComponent } from 'src/store/editStore'
import React from 'react'

const defaultStyle: React.CSSProperties = {
  ...defaultComponentStyle,
  width: 170,
  height: 30,
  lineHeight: '30px',
  fontSize: 12,
  fontWeight: 'normal',
  textDecoration: 'none',
  color: '#000',
  backgroundColor: '#ffffff00',
  textAlign: 'left',
  wordSpacing: '10px',
}

const settings = [
  {
    value: '双击编辑标题',
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: '50px',
    },
  },
  {
    value: '双击编辑正文',
    style: defaultStyle,
  },
]

const TextSidebar = () => {
  const { type } = useSidebarTypeStore((state) => state)

  if (type !== 1) return null
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
            {item.value.indexOf('双击编辑') > -1 ? item.value.slice(4) : item.value}
          </Box>
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default TextSidebar
