import { fetchTemplates, getCanvasList } from '@/src/request/canvas'
import { addComponent, useEditStore } from '@/src/store/editStore'
import { useSidebarTypeStore } from '@/src/store/sidebarStore'
import { CompType } from '@/src/types/const'
import { Box, Grid, Image } from '@mantine/core'
import React from 'react'

const TemplateSidebar = () => {
  const { addTemplateToCanvas } = useEditStore()
  const { type } = useSidebarTypeStore((state) => state)

  const [list, setList] = React.useState([])
  const fresh = () => {
    fetchTemplates((res: any) => {
      setList(res.content)
    })
  }
  React.useEffect(() => {
    fresh()
  }, [])
  if (type !== CompType.TEMPLATE) return null

  return (
    <Grid columns={8} p={10} className="relative z-50 h-full overflow-y-scroll shadow-xl">
      {list.map((item) => (
        <Grid.Col span={4} key={item.id} onClick={() => addTemplateToCanvas(item)}>
          <div className="flex flex-col items-center">
            <span>{item.title}</span>
            <div className="h-28 w-28">
              <Image src={item.thumbnail.full} className="h-full w-full" fit="contain" />
            </div>
          </div>
          {/* <Box draggable={true} w={125} h={120} style={{ ...item.style }} /> */}
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default TemplateSidebar
