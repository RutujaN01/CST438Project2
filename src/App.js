import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import LandingPage from './pages/LandingPage'; 
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; 
import WishlistPage from 'pages/WishlistPage';
import CategoryPage from 'pages/CategoryPage';

export default function App() {
  console.log("Current Path:", window.location.pathname); 

  const routes = [
    { path: "/", element: <LandingPage /> }, 
    { path: "/home", element: <HomePage /> }, 
    { path: "/login", element: <LoginPage /> }, 
    { path: "/signup", element: <SignupPage /> }, 
    { path: "/wishlist", element: <WishlistPage /> },
    { path: "/category/:category", element: <CategoryPage /> },

  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
