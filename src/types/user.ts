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
  status: UserStatus;
  phone?: string;
  avatar?: string;
  achievements?: Achievement[];
  createdAt: Date;
  updatedAt: Date;
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