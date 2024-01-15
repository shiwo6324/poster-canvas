import { AppShell, Box, Button, Stack } from '@mantine/core'
import classNames from 'classnames'

import { useSidebarTypeStore } from 'src/store/sidebarStore'

export const isTextComponent = 1
export const isImgComponent = 2
export const isGraphComponent = 3

const Sidebar = () => {
  const { setType, type } = useSidebarTypeStore()
  return (
    <AppShell.Navbar p="md" w={'auto'} pos={'fixed'}>
      <Stack bg="var(--mantine-color-body)" align="center" gap="xs">
        <Button
          className={classNames(type === 1 ? '' : 'text-slate-500')}
          onClick={() => setType(1)}
          variant="transparent"
        >
          文本
        </Button>
        <Button
          className={classNames(type === 2 ? '' : 'text-slate-500')}
          onClick={() => setType(2)}
          variant="transparent"
        >
          图片
        </Button>
        <Button
          className={classNames(type === 3 ? '' : 'text-slate-500')}
          onClick={() => setType(3)}
          variant="transparent"
        >
          图形
        </Button>
      </Stack>
    </AppShell.Navbar>
  )
}

export default Sidebar
