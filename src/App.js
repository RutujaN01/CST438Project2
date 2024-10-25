import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CategoryPage from 'pages/CategoryPage';
import WishlistPage from './pages/WishlistPage';
import LandingPage from './pages/LandingPage'; 
import AdminPage from 'pages/AdminPage';
import ProfilePage from 'pages/ProfilePage';
import SearchPage from 'pages/SearchPage';

import PrivateRoute from './PrivateRoute'; 
import ItemsPage from 'pages/ItemsPage';


export default function App() {
  console.log("Current Path:", window.location.pathname);

  const routes = [
    { path: "/wishlist", element: <WishlistPage /> },
    { path: "/", element: <LandingPage /> }, 
    { path: "/home", element: <HomePage /> }, 
    { path: "/signup", element: <SignupPage /> }, 
    { path: "/wishlist", element: <WishlistPage /> },
    { path: "/category/:category", element: <CategoryPage /> },
    { path: "/login", element: <LoginPage /> },
  ];

  const protectedRoutes = [
    { path: "/home", element: <HomePage /> }, 
    { path: "/admin", element: <AdminPage /> },
    { path: "/admin/items", element: <ItemsPage /> },
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