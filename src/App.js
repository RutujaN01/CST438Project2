import { Routes, Route } from 'react-router-dom'
import { Home }from './pages/Home'

export default function App() {
  const routes = [
    { path: "/", Component: <Home />},
    ]
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route path={path} element={Component} />
        ))
      }
    </Routes>
  )
}
