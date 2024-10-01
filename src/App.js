import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import LandingPage from './pages/LandingPage'; 

export default function App() {
  const routes = [
    { path: "/", Component: <LandingPage /> }, 
    { path: "/home", Component: <HomePage /> }, 
  ];

  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
  );
}
