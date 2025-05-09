import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { MainLayout } from "@/components/layout/MainLayout";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/types/user";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy-loaded page components for better performance
const Home = lazy(() => import("./pages/Home")); // Agregamos Home
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Policies = lazy(() => import("./pages/Policies"));
const UserDashboard = lazy(() => import("./pages/dashboards/UserDashboard"));
const AgentDashboard = lazy(() => import("./pages/dashboards/AgentDashboard"));
const AgencyDashboard = lazy(() => import("./pages/dashboards/AgencyDashboard"));
const AdminDashboard = lazy(() => import("./pages/dashboards/AdminDashboard"));

// Loading fallback
const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
  </div>
);

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
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} /> {/* Landing page */}
              <Route path="/home" element={<Home />} /> {/* Ruta alternativa */}
              <Route path="/iniciar-sesion" element={<Login />} />
              <Route path="/registro" element={<Register />} />

              {/* Protected routes with layout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  {/* Common dashboard redirect */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/polizas" element={<Policies />} />

                  {/* Client routes */}
                  <Route path="/cliente" element={<ProtectedRoute requiredRoles={[UserRole.USUARIO, UserRole.AGENTE, UserRole.AGENCIA, UserRole.ADMIN]} />}>
                    <Route index element={<Navigate to="/cliente/dashboard" />} />
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="dashboard/:section" element={<UserDashboard />} />
                  </Route>

                  {/* Agent routes */}
                  <Route path="/agente" element={<ProtectedRoute requiredRoles={[UserRole.AGENTE, UserRole.AGENCIA, UserRole.ADMIN]} />}>
                    <Route index element={<Navigate to="/agente/dashboard" />} />
                    <Route path="dashboard" element={<AgentDashboard />} />
                    <Route path="dashboard/:section" element={<AgentDashboard />} />
                  </Route>

                  {/* Agency routes */}
                  <Route path="/agencia" element={<ProtectedRoute requiredRoles={[UserRole.AGENCIA, UserRole.ADMIN]} />}>
                    <Route index element={<Navigate to="/agencia/dashboard" />} />
                    <Route path="dashboard" element={<AgencyDashboard />} />
                    <Route path="dashboard/:section" element={<AgencyDashboard />} />
                  </Route>
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<ProtectedRoute requiredRoles={[UserRole.ADMIN]} />}>
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="dashboard/:section" element={<AdminDashboard />} />
                  </Route>

                  {/* Catch any other protected routes */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
              </Route>

              {/* Catch-all 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;