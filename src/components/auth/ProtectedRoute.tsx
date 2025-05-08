
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/user";

// Define access control for paths
const roleAccess: Record<string, UserRole[]> = {
  '/usuario': [UserRole.USUARIO, UserRole.AGENTE, UserRole.AGENCIA],
  '/agente': [UserRole.AGENTE, UserRole.AGENCIA],
  '/agencia': [UserRole.AGENCIA]
};

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has access to this path based on their role
  const pathPrefix = '/' + location.pathname.split('/')[1]; // Get first segment of path
  const allowedRoles = roleAccess[pathPrefix];
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User doesn't have access to this path, redirect to their role's dashboard
    const redirectPaths = {
      [UserRole.USUARIO]: '/usuario/dashboard',
      [UserRole.AGENTE]: '/agente/dashboard',
      [UserRole.AGENCIA]: '/agencia/dashboard'
    };
    
    return <Navigate to={redirectPaths[user.role] || '/dashboard'} replace />;
  }

  // User is authenticated and has access
  return <Outlet />;
};

export default ProtectedRoute;
