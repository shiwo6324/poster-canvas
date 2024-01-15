import React from 'react'
import Sidebar from './components/Sidebar'
import { Box, Flex } from '@mantine/core'
import TextSidebar from './components/TextSidebar'
import Canvas from './components/Canvas'

const EditPage = () => {
  return (
    <div>
      <Sidebar />
      <Flex>
        <Box
          w={300}
          style={{
            height: 'calc(100vh - 70px)',
          }}
        >
          <TextSidebar />
        </Box>
        <Canvas />
      </Flex>
    </div>
  )
}

export default EditPage
