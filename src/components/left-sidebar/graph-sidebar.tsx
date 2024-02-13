import { Menu } from '@mantine/core'
import { defaultComponentStyle } from 'src/utils/const'
import { useSidebarTypeStore } from 'src/store/sidebarStore'
import { addComponent } from 'src/store/editStore'
import React from 'react'
import { CompType } from 'src/types/const'
import { PiRectangleLight } from 'react-icons/pi'

const defaultStyle: React.CSSProperties = {
  ...defaultComponentStyle,
  width: 120,
  height: 120,
  borderColor: 'none',
  backgroundColor: 'none',
}

const settings = [
  {
    key: 'graph-0',
    name: '矩形',
    value: '',
    style: {
      ...defaultStyle,
      borderWidth: 0,
      borderStyle: 'solid',
      backgroundColor: '#AABBCC',
    },
  },
  {
    key: 'graph-1',
    name: '圆形',
    value: '',
    style: {
      ...defaultStyle,
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: '50%', // 添加圆角半径以实现圆形
      backgroundColor: '#AABBCC',
    },
  },
  // {
  //   key: 'graph-2',
  //   name: '三角形',
  //   value: '',
  //   style: {
  //     ...defaultStyle,
  //     width: '0',
  //     height: '0',
  //     borderLeft: '50px solid transparent',
  //     borderRight: '50px solid transparent',
  //     borderBottom: '100px solid #f00',
  //   },
  // },
]

const GraphSidebar = () => {
  const { type } = useSidebarTypeStore((state) => state)

  return (
    <>
      {settings.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={() => addComponent({ ...item, type })}
          onDragStart={(e) => {
            e.dataTransfer.setData(
              'drag-component',
              JSON.stringify({ ...item, type }),
            )
          }}
          className=" px-14 py-4 text-white hover:bg-primary-grey-200"
          color="none"
        >
          <div
            draggable={true}
            className="flex h-full w-full items-center gap-3"
          >
            <PiRectangleLight size={25} />
            {item.name}
          </div>
        </Menu.Item>
      ))}
    </>
  )
}

export default GraphSidebar
