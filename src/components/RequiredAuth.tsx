import Login from './Auth'
import { Outlet, useLocation } from 'react-router-dom'
import { AppShell, Group } from '@mantine/core'
import React from 'react'
import CanvasHeader from './canvas-header'
import Auth from './Auth'

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
      // navbar={{ width: 200, breakpoint: 'sm' }}
      aside={{ width: 310, breakpoint: 'md' }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {isEditPage && <CanvasHeader />}
          {!isEditPage && <Auth />}
        </Group>
      </AppShell.Header>

      <AppShell.Main pl={100}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default RequiredAuth
