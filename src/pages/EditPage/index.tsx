import { AppShell, Box, Flex } from '@mantine/core'
import Canvas from '@/src/components'
import Sidebar from '@/src/components/left-sidebar'
import SidebarList from 'src/components/sidebar-list'

import CanvasHeader from 'src/components/canvas-header'
import { useEditStore } from 'src/store/editStore'
import { useZoomStore } from 'src/store/zoom-store'
import { useClickOutside } from '@mantine/hooks'
import { useSidebarTypeStore } from '@/src/store/sidebarStore'
import { CompType } from '@/src/types/const'
import EditSidebar from '@/src/components/edit-sidebar'

const EditPage = () => {
  const { canvas, setSelectedComponent } = useEditStore()
  const { zoom } = useZoomStore()
  const { setType } = useSidebarTypeStore()

  return (
    <div>
      <Sidebar />
      <Flex className="">
        <div
          id="container"
          className="flex w-full justify-center py-9 "
          style={{
            // 将 canvas 容器的高度乘以 canvas 的缩放比例， +100 的目的是底部留空间
            minHeight: (zoom / 100) * canvas.content.style.height + 100,
          }}
          onClick={(e: any) => {
            setType(CompType.EMPTY)
            if (e.target.id === 'container') {
              setSelectedComponent(-1)
            }
          }}
        >
          <Canvas />
        </div>
        <AppShell.Aside className="bg-primary-black">
          <EditSidebar />
        </AppShell.Aside>
      </Flex>
    </div>
  )
}

export default EditPage
