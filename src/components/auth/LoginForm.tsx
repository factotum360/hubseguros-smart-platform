import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    showPassword: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Por favor ingresa tu correo y contraseña");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return;
    }
    
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      toast.success("¡Bienvenido a HubSeguros!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error("No pudimos iniciar sesión. Por favor verifica tus credenciales.");
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
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="correo@ejemplo.com" 
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                required
                autoComplete="email"
                aria-label="Correo electrónico"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link 
                to="/recuperar-contrasena" 
                className="text-sm text-hubseguros-primary hover:text-blue-800 transition-colors"
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
                className="pl-10"
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
          </div>
          <Button 
            type="submit" 
            className="w-full bg-hubseguros-primary hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta? 
          <Link 
            to="/registro" 
            className="ml-1 text-hubseguros-primary hover:text-blue-700 font-medium transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}