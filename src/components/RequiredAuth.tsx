import { Layout } from 'antd'
import Login from './Login'
import { Outlet } from 'react-router-dom'

const RequiredAuth = () => {
  const { Header } = Layout

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 10,
    lineHeight: '64px',
    backgroundColor: 'black',
  }
  return (
    <Layout>
      <Header style={headerStyle}>
        <Login />
      </Header>
      <Outlet />
    </Layout>
  )
}

export default RequiredAuth
