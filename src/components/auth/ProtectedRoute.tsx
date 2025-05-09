
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/user";
import { Loader2 } from "lucide-react";

// Define route access levels with role hierarchies
const ROUTE_ACCESS: Record<string, UserRole[]> = {
  '/cliente': [UserRole.USUARIO, UserRole.AGENTE, UserRole.AGENCIA, UserRole.ADMIN],
  '/agente': [UserRole.AGENTE, UserRole.AGENCIA, UserRole.ADMIN],
  '/agencia': [UserRole.AGENCIA, UserRole.ADMIN],
  '/admin': [UserRole.ADMIN]
};

// Home routes by role
const HOME_ROUTES: Record<UserRole, string> = {
  [UserRole.USUARIO]: '/cliente/dashboard',
  [UserRole.AGENTE]: '/agente/dashboard',
  [UserRole.AGENCIA]: '/agencia/dashboard',
  [UserRole.ADMIN]: '/admin/dashboard'
};

interface ProtectedRouteProps {
  requiredRoles?: UserRole[];
}

const ProtectedRoute = ({ requiredRoles }: ProtectedRouteProps = {}) => {
  const { isAuthenticated, user, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
  }

  // If specific roles are required, check permissions
  if (requiredRoles && requiredRoles.length > 0 && !hasPermission(requiredRoles)) {
    // User doesn't have the required role, redirect to their home route
    return <Navigate to={user ? HOME_ROUTES[user.role] : '/iniciar-sesion'} replace />;
  }

  // Check path-based role access
  const pathPrefix = '/' + location.pathname.split('/')[1];
  const allowedRoles = ROUTE_ACCESS[pathPrefix];
  
  if (allowedRoles && user && !hasPermission(allowedRoles)) {
    return <Navigate to={HOME_ROUTES[user.role]} replace />;
  }

  // User is authenticated and has proper access
  return <Outlet />;
};

export default ProtectedRoute;
