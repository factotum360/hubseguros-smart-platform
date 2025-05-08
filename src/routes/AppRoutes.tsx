import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '@/types/user';

// Lazy loading de componentes
const Login = lazy(() => import('@/components/auth/Login'));
const Register = lazy(() => import('@/components/auth/Register'));
const NotFound = lazy(() => import('@/components/NotFound'));
const Policies = lazy(() => import('@/components/Policies'));

// Layouts
const DashboardLayout = lazy(() => import('@/components/layout/DashboardLayout'));

// Rutas protegidas por rol
const ProtectedRoute = ({ children, allowedRoles }: { 
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) => {
  // TODO: Implementar lógica de autenticación
  const userRole = UserRole.USUARIO; // Temporal, debe venir del contexto de auth
  const isAuthenticated = true; // Temporal, debe venir del contexto de auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/policies" element={<Policies />} />

        {/* Rutas de Usuario */}
        <Route
          path="/usuario/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.USUARIO]}>
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<div>Dashboard Usuario</div>} />
                  <Route path="mis-polizas" element={<div>Mis Pólizas</div>} />
                  <Route path="siniestros" element={<div>Siniestros</div>} />
                  <Route path="pagos" element={<div>Pagos</div>} />
                  <Route path="documentos" element={<div>Documentos</div>} />
                  <Route path="cotizaciones" element={<div>Cotizaciones</div>} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas de Agente */}
        <Route
          path="/agente/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.AGENTE]}>
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<div>Dashboard Agente</div>} />
                  <Route path="clientes" element={<div>Clientes</div>} />
                  <Route path="polizas" element={<div>Pólizas</div>} />
                  <Route path="siniestros" element={<div>Siniestros</div>} />
                  <Route path="ventas" element={<div>Ventas</div>} />
                  <Route path="cobros" element={<div>Cobros</div>} />
                  <Route path="leads" element={<div>Leads</div>} />
                  <Route path="tareas" element={<div>Tareas</div>} />
                  <Route path="calendario" element={<div>Calendario</div>} />
                  <Route path="estadisticas" element={<div>Estadísticas</div>} />
                  <Route path="cotizaciones" element={<div>Cotizaciones</div>} />
                  <Route path="facturas" element={<div>Facturas</div>} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas de Agencia */}
        <Route
          path="/agencia/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.AGENCIA]}>
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<div>Dashboard Agencia</div>} />
                  <Route path="clientes" element={<div>Clientes</div>} />
                  <Route path="polizas" element={<div>Pólizas</div>} />
                  <Route path="siniestros" element={<div>Siniestros</div>} />
                  <Route path="ventas" element={<div>Ventas</div>} />
                  <Route path="cobros" element={<div>Cobros</div>} />
                  <Route path="leads" element={<div>Leads</div>} />
                  <Route path="agentes" element={<div>Agentes</div>} />
                  <Route path="ramos" element={<div>Ramos</div>} />
                  <Route path="aseguradoras" element={<div>Aseguradoras</div>} />
                  <Route path="estadisticas" element={<div>Estadísticas</div>} />
                  <Route path="cotizaciones" element={<div>Cotizaciones</div>} />
                  <Route path="archivos" element={<div>Archivos</div>} />
                  <Route path="facturas" element={<div>Facturas</div>} />
                  <Route path="configuracion" element={<div>Configuración</div>} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto y 404 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;