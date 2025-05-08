import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, Lock, User, Building2 } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    companyName: "",
    userType: "",
    showPassword: false,
    showConfirmPassword: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setFormData(prev => ({
      ...prev,
      [field === 'password' ? 'showPassword' : 'showConfirmPassword']: 
      !prev[field === 'password' ? 'showPassword' : 'showConfirmPassword']
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || 
        !formData.firstName || !formData.lastName || !formData.userType) {
      toast.error("Por favor completa todos los campos requeridos");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }

    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        userType: formData.userType
      });
      
      toast.success("¡Registro exitoso! Bienvenido a HubSeguros");
      navigate("/dashboard");
    } catch (error) {
      toast.error("No pudimos completar tu registro. Por favor intenta nuevamente.");
      console.error("Error en registro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Crear cuenta</CardTitle>
        <CardDescription className="text-center">
          Únete a la plataforma líder en gestión de seguros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Pérez"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="juan.perez@ejemplo.com"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
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
                autoComplete="new-password"
              />
              <Tooltip content={formData.showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {formData.showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type={formData.showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10"
                required
                autoComplete="new-password"
              />
              <Tooltip content={formData.showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {formData.showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nombre de la empresa (Opcional)</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Nombre de tu empresa"
                value={formData.companyName}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userType">Tipo de usuario</Label>
            <Select onValueChange={handleSelectChange} value={formData.userType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USUARIO">Usuario Individual</SelectItem>
                <SelectItem value="AGENTE">Agente de Seguros</SelectItem>
                <SelectItem value="AGENCIA">Agencia de Seguros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-hubseguros-primary hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta? 
          <Link 
            to="/login" 
            className="ml-1 text-hubseguros-primary hover:text-blue-700 font-medium transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}