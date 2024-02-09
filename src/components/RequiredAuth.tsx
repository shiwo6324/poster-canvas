import Login from './Login'
import { Outlet, useLocation } from 'react-router-dom'
import { AppShell, Group } from '@mantine/core'
import React from 'react'
import CanvasHeader from './canvas-header'

const RequiredAuth = () => {
  const location = useLocation()
  const [isEditPage, setIsEditPage] = React.useState(false)
  React.useEffect(() => {
    const isEdit = location.pathname.split('/').includes('edit')
    setIsEditPage(isEdit)
  }, [])
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      aside={{ width: 300, breakpoint: 'md' }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {isEditPage && <CanvasHeader />}
          {!isEditPage && <Login />}
        </Group>
      </AppShell.Header>

      <AppShell.Main pl={100}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default RequiredAuth
