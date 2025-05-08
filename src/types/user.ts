
export enum UserRole {
  USUARIO = 'USUARIO',
  AGENTE = 'AGENTE', 
  AGENCIA = 'AGENCIA'
}

export enum UserLevel {
  PRINCIPIANTE = 'principiante',
  INTERMEDIO = 'intermedio'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  level: UserLevel;
  achievements?: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  points: number;
}
