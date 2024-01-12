import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import EditPage from './pages/EditPage'
import ListPage from './pages/ListPage'
import RequiredAuth from './components/RequiredAuth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequiredAuth />}>
          <Route index element={<EditPage />} />
          <Route path="list" element={<ListPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
