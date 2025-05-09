
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { UserRole } from "@/types/user";
import { ErrorBoundary } from "react-error-boundary";
import { AlertCircle } from "lucide-react";

// Map of default routes by user role
const DEFAULT_ROUTES: Record<UserRole, string> = {
  [UserRole.USUARIO]: '/cliente/dashboard',
  [UserRole.AGENTE]: '/agente/dashboard',
  [UserRole.AGENCIA]: '/agencia/dashboard',
  [UserRole.ADMIN]: '/admin/dashboard'
};

// Error fallback component
function ErrorFallback() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
      <p className="text-gray-600 mb-6">
        Ha ocurrido un error al cargar esta página.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Recargar página
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          Ir al dashboard
        </button>
      </div>
    </div>
  );
}

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    // Try to load collapsed state from localStorage
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // Redirect to role-specific dashboard if at root protected route
  useEffect(() => {
    if (user && location.pathname === "/dashboard") {
      const redirectPath = DEFAULT_ROUTES[user.role];
      
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        toast.success(`Bienvenido a tu panel de ${user.role.toLowerCase()}`);
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
}
