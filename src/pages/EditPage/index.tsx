import { AppShell, Box, Flex } from '@mantine/core'
import Canvas from 'src/components/canvas'
import Sidebar from 'src/components/sidebar'
import SidebarList from 'src/components/sidebar-list'

import CanvasHeader from 'src/components/canvas-header'
import { useEditStore } from 'src/store/editStore'
import { useZoomStore } from 'src/store/zoom-store'
import { useClickOutside } from '@mantine/hooks'
import { useSidebarTypeStore } from '@/src/store/sidebarStore'
import { CompType } from '@/src/types/const'
import EditSidebar from '@/src/components/edit-sidebar'

const EditPage = () => {
  const { canvas } = useEditStore()
  const { zoom } = useZoomStore()
  const { setType } = useSidebarTypeStore()

  return (
    <div>
      <Sidebar />
      <Flex className="">
        <Box
          id="sidebar"
          w={280}
          style={{
            height: 'calc(100vh - 70px)',
          }}
          className="fixed "
        >
          <SidebarList />
        </Box>
        <div
          className="flex w-full justify-center py-9 "
          style={{
            // 将 canvas 容器的高度乘以 canvas 的缩放比例， +100 的目的是底部留空间
            minHeight: (zoom / 100) * canvas.style.height + 100,
          }}
          onClick={(e: any) => {
            setType(CompType.EMPTY)
          }}
        >
          <Canvas />
        </div>
        <AppShell.Aside>
          <EditSidebar />
        </AppShell.Aside>

        {/* <Box
          style={{
            height: 'calc(100vh - 70px)',
          }}
        >
          <EditSidebar />
        </Box> */}
        {/* <EditSidebar /> */}
        {/* <div className=" h-10 w-96 cursor-pointer bg-red-300 text-xs">rightsidebar</div> */}
      </Flex>
    </div>
  )
}

export default EditPage
