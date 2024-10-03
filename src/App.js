import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  console.log("Current Path:", window.location.pathname); // Log current path

  const routes = [
    { path: "/", element: <SignupPage /> },
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