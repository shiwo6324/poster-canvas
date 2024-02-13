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
    value: '../../../public/canvas/bg1.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/bg2.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/certificate.jpg',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/chuliu.jpeg',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/girl.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/green-learning.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/icon.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/lock.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/rainbow1.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/react-head.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/red-girl.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/rinbbon1.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/sale.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/star1.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/star2.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/tree.png',
    style: defaultStyle,
  },
  {
    value: '../../../public/canvas/yellow-star.png',
    style: defaultStyle,
  },
]

const ImageSidebar = () => {
  const { type } = useSidebarTypeStore((state) => state)

  if (type !== CompType.IMAGE) return null
  return (
    <div className="custom-scrollbar z-50 flex h-[600px] flex-col  gap-3 overflow-y-scroll py-4">
      {settings.map((item) => (
        <div
          key={item.value}
          onClick={() => addComponent({ ...item, type })}
          onDragStart={(e) => {
            e.dataTransfer.setData(
              'drag-component',
              JSON.stringify({ ...item, type }),
            )
          }}
        >
          <div
            draggable={true}
            className="flex cursor-pointer 
                   items-center justify-center border border-solid
                    border-slate-300 hover:border-amber-300 hover:text-amber-300"
          >
            <Image src={item.value} w={125} h={100} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImageSidebar
