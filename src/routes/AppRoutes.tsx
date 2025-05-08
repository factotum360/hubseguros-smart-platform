import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '@/types/user';

// Optimización del lazy loading eliminando callbacks innecesarios
const importPage = (path: string) => lazy(() => import(path));

// Páginas con lazy loading optimizado
const LoginPage = importPage('@/components/auth/Login');
const RegisterPage = importPage('@/components/auth/Register');
const NotFoundPage = importPage('@/components/NotFound');
const PoliciesPage = importPage('@/components/Policies');
const DashboardLayout = importPage('@/components/layout/DashboardLayout');

// Interfaces TypeScript
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

// Componente de ruta protegida optimizado
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  // TODO: Implementar lógica real de autenticación
  const userRole = UserRole.USUARIO;
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Componente principal de rutas
const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/policies" element={<PoliciesPage />} />

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
                  <Route path="notificaciones" element={<div>Notificaciones</div>} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;