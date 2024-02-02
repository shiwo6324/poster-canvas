import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import EditPage from './pages/EditPage'
import ListPage from './pages/ListPage'
import RequiredAuth from './components/RequiredAuth'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RequiredAuth />}>
        <Route path="edit" element={<EditPage />} />
        <Route index path="list" element={<ListPage />} />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}

export default App
