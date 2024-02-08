import { Menu } from '@mantine/core'
import { defaultComponentStyle } from 'src/utils/const'
import { useSidebarTypeStore } from 'src/store/sidebarStore'
import { addComponent } from 'src/store/editStore'
import React from 'react'
import { LuHeading1 } from 'react-icons/lu'
import { PiParagraphDuotone } from 'react-icons/pi'

const defaultStyle: React.CSSProperties = {
  ...defaultComponentStyle,
  width: 170,
  height: 30,
  lineHeight: '30px',
  fontSize: 12,
  fontWeight: 'normal',
  textDecoration: 'none',
  color: '#AABBCC',
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

  return (
    <>
      {settings.map((item) => (
        <Menu.Item
          className=" px-14 py-4 text-white hover:bg-primary-grey-200"
          color="none"
          key={item.value}
          onClick={() => addComponent({ ...item, type })}
          onDragStart={(e) => {
            e.dataTransfer.setData('drag-component', JSON.stringify({ ...item, type }))
          }}
          draggable={true}
        >
          <div className="flex items-center gap-3">
            <LuHeading1 size={25} />
            {item.value.indexOf('双击编辑') > -1 ? item.value.slice(4) : item.value}
          </div>
        </Menu.Item>
      ))}
    </>

    // <Grid columns={8} p={10} className="z-50 h-full w-full   ">
    //   {settings.map((item) => (
    //     <Grid.Col
    //       span={4}
    //       key={item.value}
    //       onClick={() => addComponent({ ...item, type })}
    //       onDragStart={(e) => {
    //         e.dataTransfer.setData('drag-component', JSON.stringify({ ...item, type }))
    //       }}
    //     >
    //       <Box
    //         draggable={true}
    //         w={125}
    //         h={100}
    //         className="flex cursor-pointer
    //                items-center justify-center border border-solid
    //                 border-slate-300 hover:border-amber-300 hover:text-amber-300"
    //       >
    //         {item.value.indexOf('双击编辑') > -1 ? item.value.slice(4) : item.value}
    //       </Box>
    //     </Grid.Col>
    //   ))}
    // </Grid>
  )
}

export default TextSidebar
