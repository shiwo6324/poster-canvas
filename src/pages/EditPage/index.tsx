import { Box, Flex } from '@mantine/core'
import Canvas from 'src/components/canvas'
import Sidebar from 'src/components/sidebar'
import SidebarList from 'src/components/sidebar-list'

import CanvasHeader from 'src/components/canvas-header'
import { useEditStore } from 'src/store/editStore'
import { useZoomStore } from 'src/store/zoom-store'

const EditPage = () => {
  const { canvas } = useEditStore()
  const { zoom } = useZoomStore()
  return (
    <div>
      <CanvasHeader />
      <Sidebar />
      <Flex>
        <Box
          w={350}
          style={{
            height: 'calc(100vh - 70px)',
          }}
        >
          <SidebarList />
        </Box>
        <div
          className="flex w-full justify-center py-9 "
          style={{
            // 将 canvas 容器的高度乘以 canvas 的缩放比例， +100 的目的是底部留空间
            minHeight: (zoom / 100) * canvas.style.height + 100,
          }}
        >
          <Canvas />
        </div>
        <div className="relative">
          <div className="fixed right-0 h-10 w-20 cursor-pointer text-xs">rightsidebar</div>
        </div>
      </Flex>
    </div>
  )
}

export default EditPage
