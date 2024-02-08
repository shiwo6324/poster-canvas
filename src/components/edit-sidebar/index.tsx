import { useEditStore } from '@/src/store/editStore'
import { Input, Group, Text } from '@mantine/core'
import React from 'react'
import EditCanvas from './edit-canvas'
import EditComponent from './edit-component'
import EditMutiComponents from './edit-muti-components'
import { CompType } from '@/src/types/const'

// 编辑画布属性
// 编辑单个组件属性
// 编辑多个组件属性
const EditSidebar = () => {
  const { canvas, selectedComponents } = useEditStore()
  const index = [...selectedComponents][0]
  const component = canvas.content.components[index]
  let selectedComponent
  let isGroup = false
  if (selectedComponents.size === 1) {
    selectedComponent = component
    isGroup = selectedComponent.type === CompType.GROUP
  }
  return (
    <section className="sticky right-0 flex h-full min-w-[227px] select-none flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 max-sm:hidden">
      {selectedComponents.size === 0 ? (
        <EditCanvas canvas={canvas} />
      ) : selectedComponents.size === 1 && !isGroup ? (
        <EditComponent component={component} />
      ) : (
        <EditMutiComponents isGroup={isGroup} />
      )}
    </section>
  )
}

export default EditSidebar
