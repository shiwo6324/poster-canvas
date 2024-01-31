import { useEditStore } from '@/src/store/editStore'
import { Style } from '@/src/types/editStoreTypes'
import React from 'react'

interface EditMenuProps {
  style: React.CSSProperties
  selectedComponentsSize: number
}

const EditMenu = ({ style, selectedComponentsSize }: EditMenuProps) => {
  const { deleteComponents, copyComponents, bringToFront, bringToBack } = useEditStore()
  if (selectedComponentsSize === 0) return null

  return (
    <div className="relative" style={style}>
      <ul className="absolute -right-32 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 shadow-lg">
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100" onClick={copyComponents}>
          复制
        </li>
        <li
          className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"
          onClick={deleteComponents}
        >
          删除组件
        </li>
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">上移一层</li>
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">下移一层</li>
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100" onClick={bringToFront}>
          置顶
        </li>
        <li className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100" onClick={bringToBack}>
          置底
        </li>
      </ul>
    </div>
  )
}

export default EditMenu
