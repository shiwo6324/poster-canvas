import React from 'react'
import { Box, Flex } from '@mantine/core'
import Canvas from 'src/components/canvas'
import Sidebar from 'src/components/sidebar'
import SidebarList from 'src/components/sidebar-list'

const EditPage = () => {
  return (
    <div>
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
        <div className="flex w-full justify-center">
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
