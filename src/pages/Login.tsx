
import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect, memo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

// Memorized benefits list component
const BenefitsList = memo(() => (
  <ul className="space-y-3 mt-8">
    {[
      "Organiza tu cartera de clientes y pólizas",
      "Ahorra tiempo en tareas administrativas",
      "Impulsa tus ventas con herramientas inteligentes",
      "Soporte humano cuando lo necesites"
    ].map((benefit, index) => (
      <li key={index} className="flex items-center gap-2">
        <div className="bg-white/20 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span>{benefit}</span>
      </li>
    ))}
  </ul>
));

BenefitsList.displayName = 'BenefitsList';

const LoginPage = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated based on role
  useEffect(() => {
    if (isAuthenticated && user) {
      const roleRoutes = {
        'USUARIO': '/cliente/dashboard',
        'AGENTE': '/agente/dashboard',
        'AGENCIA': '/agencia/dashboard',
        'ADMIN': '/admin/dashboard'
      };
      
      navigate(roleRoutes[user.role] || '/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section - Marketing */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center items-start">
        <div className="max-w-md mx-auto md:mx-0 md:ml-auto text-white space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Bienvenido a HubSeguros
          </h1>
          <p className="text-lg font-medium opacity-90">
            La plataforma digital para gestionar y hacer crecer tu negocio de seguros.
          </p>
          <BenefitsList />
        </div>
      </div>

      {/* Right section - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
