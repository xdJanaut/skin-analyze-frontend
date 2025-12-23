import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if user has a token (is logged in)
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If token exists, show the protected page
  return children;
}

export default ProtectedRoute;