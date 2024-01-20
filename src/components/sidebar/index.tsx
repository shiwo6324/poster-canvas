import { AppShell, Button, Stack } from '@mantine/core'

import classNames from 'classnames'

import { useSidebarTypeStore } from 'src/store/sidebarStore'
import { CompType } from 'src/types/const'

const Sidebar = () => {
  const { setType, type } = useSidebarTypeStore()
  return (
    <AppShell.Navbar p="md" w={'auto'} pos={'fixed'}>
      <Stack bg="var(--mantine-color-body)" align="center" gap="xs">
        <Button
          className={classNames(type === CompType.TEXT ? '' : 'text-slate-500')}
          onClick={() => setType(CompType.TEXT)}
          variant="transparent"
        >
          文本
        </Button>
        <Button
          className={classNames(type === CompType.IMAGE ? '' : 'text-slate-500')}
          onClick={() => setType(CompType.IMAGE)}
          variant="transparent"
        >
          图片
        </Button>
        <Button
          className={classNames(type === CompType.GRAPH ? '' : 'text-slate-500')}
          onClick={() => setType(CompType.GRAPH)}
          variant="transparent"
        >
          图形
        </Button>
      </Stack>
    </AppShell.Navbar>
  )
}

export default Sidebar
