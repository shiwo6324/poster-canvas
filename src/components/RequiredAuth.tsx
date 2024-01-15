import Login from './Login'
import { Outlet } from 'react-router-dom'
import { AppShell, Group } from '@mantine/core'

const RequiredAuth = () => {
  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm' }} padding="xs">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Login />
        </Group>
      </AppShell.Header>

      <AppShell.Main px={100} pt={60}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default RequiredAuth
