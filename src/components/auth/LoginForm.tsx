
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      // Note: Navigation is handled in the Login page based on user role
    } catch (error) {
      // Error is already handled in useAuth hook with toast notifications
      console.error("Error en inicio de sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Bienvenido a HubSeguros</CardTitle>
        <CardDescription className="text-center">
          La plataforma integral para la gestión de seguros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="correo@ejemplo.com" 
                value={formData.email}
                onChange={handleInputChange}
                className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                required
                autoComplete="email"
                aria-label="Correo electrónico"
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
                Contraseña
              </Label>
              <Link 
                to="/recuperar-contrasena" 
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                id="password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                required
                autoComplete="current-password"
                aria-label="Contraseña"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                      aria-label={formData.showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {formData.showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formData.showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
              Recordar mi sesión
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
          
          <div className="text-center text-sm text-gray-500 mt-2">
            <p>Credenciales de prueba:</p>
            <p>cliente@hubseguros.com / admin@hubseguros.com / agente@hubseguros.com / agencia@hubseguros.com</p>
            <p>Contraseña: 1234</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta? 
          <Link 
            to="/registro" 
            className="ml-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
