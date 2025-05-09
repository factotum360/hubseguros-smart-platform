
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types/user";
import { toast } from "sonner";

// Enhanced context type with role validation
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth configuration
const AUTH_TOKEN_KEY = "hubseguros_auth_token";
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Sample users for development - will be replaced with API
const SAMPLE_USERS: Record<string, User> = {
  "admin@hubseguros.com": {
    id: "admin-1",
    name: "Admin User",
    email: "admin@hubseguros.com",
    role: UserRole.ADMIN,
    level: "avanzado"
  },
  "agencia@hubseguros.com": {
    id: "agency-1",
    name: "Agencia Demo",
    email: "agencia@hubseguros.com",
    role: UserRole.AGENCIA,
    level: "intermedio"
  },
  "agente@hubseguros.com": {
    id: "agent-1",
    name: "Agente Demo",
    email: "agente@hubseguros.com",
    role: UserRole.AGENTE,
    level: "principiante"
  },
  "cliente@hubseguros.com": {
    id: "client-1",
    name: "Cliente Demo",
    email: "cliente@hubseguros.com",
    role: UserRole.USUARIO,
    level: "principiante"
  }
};

// Helper function to get stored token
const getStoredAuthData = (): { user: User | null; expiry: number | null } => {
  const storedData = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!storedData) return { user: null, expiry: null };
  
  try {
    const parsedData = JSON.parse(storedData);
    return {
      user: parsedData.user,
      expiry: parsedData.expiry
    };
  } catch (error) {
    console.error("Failed to parse auth data:", error);
    return { user: null, expiry: null };
  }
};

// Helper function to save auth data
const saveAuthData = (user: User) => {
  const expiry = Date.now() + SESSION_EXPIRY;
  localStorage.setItem(
    AUTH_TOKEN_KEY,
    JSON.stringify({ user, expiry })
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const { user, expiry } = getStoredAuthData();
    
    if (user && expiry && expiry > Date.now()) {
      setUser(user);
    } else if (expiry && expiry <= Date.now()) {
      // Handle expired session
      localStorage.removeItem(AUTH_TOKEN_KEY);
      toast.warning("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
    }
    
    setIsLoading(false);
  }, []);

  // Login function with validation
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      
      // In development, check against sample users
      const lowerEmail = email.toLowerCase();
      const user = SAMPLE_USERS[lowerEmail];
      
      if (!user) {
        throw new Error("Credenciales incorrectas");
      }
      
      // In production, this would validate password with API
      if (password.length < 4) {
        throw new Error("Contraseña incorrecta");
      }
      
      // Set user in state and persist
      setUser(user);
      saveAuthData(user);
      
      toast.success(`¡Bienvenido ${user.name}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error de autenticación";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function with cleanup
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    toast.info("Has cerrado sesión");
  };

  // Role validation function
  const hasPermission = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user,
        isLoading,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
