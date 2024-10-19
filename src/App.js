import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import LandingPage from './pages/LandingPage'; 
import AdminPage from 'pages/AdminPage';
import ProfilePage from 'pages/ProfilePage';
import SearchPage from 'pages/SearchPage';

import PrivateRoute from './PrivateRoute'; 


export default function App() {
  console.log("Current Path:", window.location.pathname);

  const routes = [
    { path: "/wishlist", element: <WishlistPage /> },
    { path: "/", element: <LandingPage /> }, 
    { path: "/signin", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
  ];

  const protectedRoutes = [
    { path: "/home", element: <HomePage /> }, 
    { path: "/admin", element: <AdminPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/search", element: <SearchPage /> },

  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {protectedRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<PrivateRoute element={element} />} />
      ))}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}