export enum UserRole {
  USUARIO = 'USUARIO',
  AGENTE = 'AGENTE',
  AGENCIA = 'AGENCIA'
}

export enum UserLevel {
  PRINCIPIANTE = 'principiante',
  INTERMEDIO = 'intermedio',
  AVANZADO = 'avanzado',
  EXPERTO = 'experto'
}

export enum UserStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  SUSPENDIDO = 'suspendido',
  PENDIENTE = 'pendiente'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  level: UserLevel;
  status?: UserStatus; // Hecho opcional para mantener compatibilidad
  phone?: string;
  avatar?: string;
  achievements?: Achievement[];
  createdAt?: Date; // Hecho opcional para mantener compatibilidad
  updatedAt?: Date; // Hecho opcional para mantener compatibilidad
  lastLogin?: Date;
  preferences?: UserPreferences;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  points: number;
  completedAt?: Date;
  image?: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  timeZone: string;
}

// Utility type para el mock user
export type MockUser = Pick<User, 'id' | 'name' | 'email' | 'role' | 'level'>;

// Helper functions
export function isValidRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

export function isValidLevel(level: string): level is UserLevel {
  return Object.values(UserLevel).includes(level as UserLevel);
}

export function isValidStatus(status: string): status is UserStatus {
  return Object.values(UserStatus).includes(status as UserStatus);
}