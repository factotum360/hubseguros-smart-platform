
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { SIDEBAR_CONFIG } from "@/config/sidebarConfig";

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

  // Redirect to role-specific dashboard if at the root protected route
  useEffect(() => {
    if (user && location.pathname === "/dashboard") {
      const rolePaths = {
        USUARIO: '/usuario/dashboard',
        AGENTE: '/agente/dashboard',
        AGENCIA: '/agencia/dashboard'
      };
      
      const redirectPath = rolePaths[user.role];
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        toast({
          title: "Bienvenido a HubSeguros",
          description: `Accediendo a tu panel personalizado de ${user.role.toLowerCase()}.`,
        });
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
