import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';

// require('dotenv').config()
export default function App() {
  console.log("Current Path:", window.location.pathname); 

  const routes = [
    { path: "/", element: <WishlistPage /> },
    { path: "/login", element: <LoginPage /> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {/* Catch-all route for invalid paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}