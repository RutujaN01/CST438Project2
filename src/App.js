import HomePage from './pages/HomePage'; 
import LandingPage from './pages/LandingPage'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  console.log("Current Path:", window.location.pathname); // Log current path

  const routes = [
    { path: "/", Component: <LandingPage /> }, 
    { path: "/home", Component: <HomePage /> }, 
    { path: "/signup", Component: <SignupPage /> },
    { path: "/login", Component: <LoginPage /> },
  ];

  return (
    <>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
