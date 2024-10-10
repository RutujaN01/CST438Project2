import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import LandingPage from './pages/LandingPage'; 



// require('dotenv').config()
export default function App() {
  console.log("Current Path:", window.location.pathname); 

  const routes = [

    { path: "/wishlist", element: <WishlistPage /> }
    { path: "/", Component: <LandingPage /> }, 
    { path: "/home", Component: <HomePage /> }, 
    { path: "/signup", element: <SignupPage /> },
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
