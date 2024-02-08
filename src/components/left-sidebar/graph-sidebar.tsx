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
    value: '',
    style: {
      ...defaultStyle,
      borderWidth: 0,
      borderStyle: 'solid',
      backgroundColor: '#AABBCC',
    },
  },
]

const GraphSidebar = () => {
  const { type } = useSidebarTypeStore((state) => state)

  return (
    <>
      {settings.map((item) => (
        <Menu.Item
          key={item.value}
          onClick={() => addComponent({ ...item, type })}
          onDragStart={(e) => {
            e.dataTransfer.setData('drag-component', JSON.stringify({ ...item, type }))
          }}
          className=" px-14 py-4 text-white hover:bg-primary-grey-200"
          color="none"
        >
          <div draggable={true} className="flex h-full w-full items-center gap-3">
            <PiRectangleLight size={25} />
            矩形
          </div>
        </Menu.Item>
      ))}
    </>
  )
}

export default GraphSidebar
