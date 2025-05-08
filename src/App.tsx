
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                {/* Default dashboard redirect */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/polizas" element={<Policies />} />
                
                {/* Role-specific routes */}
                {/* Usuario routes */}
                <Route path="/usuario/dashboard" element={<UserDashboard />} />
                <Route path="/usuario/dashboard/:section" element={<UserDashboard />} />
                
                {/* Agente routes */}
                <Route path="/agente/dashboard" element={<AgentDashboard />} />
                <Route path="/agente/dashboard/:section" element={<AgentDashboard />} />
                
                {/* Agencia routes */}
                <Route path="/agencia/dashboard" element={<AgencyDashboard />} />
                <Route path="/agencia/dashboard/:section" element={<AgencyDashboard />} />
                
                {/* Catch all protected routes */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
