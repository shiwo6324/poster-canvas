import { Outlet } from 'react-router-dom'
import { AppShell, Group } from '@mantine/core'
import Auth from './Auth'
import Header from './header'

const RequiredAuth = () => {
  // const location = useLocation()
  // const [isEditPage, setIsEditPage] = React.useState(false)
  // React.useEffect(() => {
  //   const isEdit = location.pathname.split('/').includes('edit')
  //   setIsEditPage(isEdit)
  // }, [])
  return (
    <AppShell
      header={{ height: 60 }}
      // navbar={{ width: 200, breakpoint: 'sm' }}
      aside={{ width: 310, breakpoint: 'md' }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Header />
          <Auth />
        </Group>
      </AppShell.Header>

      <AppShell.Main className="border-none bg-primary-black" pl={100}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default RequiredAuth
