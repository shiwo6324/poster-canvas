import { useLocation } from 'react-router-dom'
import CanvasHeader from './canvas-header'
import ListHeader from './list-header'

const Header = () => {
  const location = useLocation()
  if (location.pathname.includes('edit')) {
    return <CanvasHeader />
  }
  return <ListHeader />
}

export default Header
