
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole, UserLevel } from "@/types/user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Datos de ejemplo para simulación
const MOCK_USER: User = {
  id: "1",
  name: "Usuario Demo",
  email: "demo@factotum.com",
  role: UserRole.AGENTE,
  level: UserLevel.PRINCIPIANTE
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const storedUser = localStorage.getItem("hubsegurosUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulación de autenticación
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // En una implementación real, esto vendría del backend
        setUser(MOCK_USER);
        localStorage.setItem("hubsegurosUser", JSON.stringify(MOCK_USER));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hubsegurosUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {!isLoading && children}
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
