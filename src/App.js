import { Routes, Route } from 'react-router-dom'
import  LoginPage from './pages/LoginPage'

export default function App() {
  console.log("Current Path:", window.location.pathname); // Log current path

  const routes = [
    { path: "/", Component: <LoginPage />},
    ]
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route path={path} element={Component} />
        ))
      }
    </Routes>
  );
}