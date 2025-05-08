import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { MainLayout } from "@/components/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Policies from "./pages/Policies";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserDashboard from "./pages/dashboards/UserDashboard";
import AgentDashboard from "./pages/dashboards/AgentDashboard";
import AgencyDashboard from "./pages/dashboards/AgencyDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            
            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                {/* Dashboard principal y redirección por defecto */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/polizas" element={<Policies />} />
                
                {/* Rutas específicas por rol */}
                {/* Rutas de Usuario */}
                <Route path="/usuario">
                  <Route index element={<Navigate to="/usuario/dashboard" />} />
                  <Route path="dashboard" element={<UserDashboard />} />
                  <Route path="dashboard/:section" element={<UserDashboard />} />
                </Route>
                
                {/* Rutas de Agente */}
                <Route path="/agente">
                  <Route index element={<Navigate to="/agente/dashboard" />} />
                  <Route path="dashboard" element={<AgentDashboard />} />
                  <Route path="dashboard/:section" element={<AgentDashboard />} />
                </Route>
                
                {/* Rutas de Agencia */}
                <Route path="/agencia">
                  <Route index element={<Navigate to="/agencia/dashboard" />} />
                  <Route path="dashboard" element={<AgencyDashboard />} />
                  <Route path="dashboard/:section" element={<AgencyDashboard />} />
                </Route>
                
                {/* Captura todas las rutas protegidas no definidas */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Route>
            
            {/* Captura de rutas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;