import { UserRole } from '@/types/user';

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  key: string;
  label: string;
  icon: string;
  path?: string;
  badge?: {
    value: number | string;
    variant?: 'default' | 'success' | 'warning' | 'error';
  };
}

export type SidebarConfig = Record<UserRole, {
  dashboard: {
    path: string;
    title: string;
    description: string;
    sections: SidebarSection[];
  }
}>;

export const SIDEBAR_CONFIG: SidebarConfig = {
  [UserRole.USUARIO]: {
    dashboard: {
      path: '/cliente/dashboard',
      title: 'Panel de Cliente',
      description: 'Bienvenido a tu panel de control',
      sections: [
        {
          title: 'PRINCIPALES',
          items: [
            { 
              key: 'mis-polizas', 
              label: 'Mis Pólizas', 
              icon: 'ShieldCheck',
              badge: {
                value: 2,
                variant: 'success'
              }
            },
            { key: 'siniestros', label: 'Siniestros', icon: 'AlertTriangle' },
            { key: 'pagos', label: 'Pagos', icon: 'DollarSign' }
          ]
        },
        {
          title: 'GESTIÓN',
          items: [
            { key: 'documentos', label: 'Documentos', icon: 'FileText' },
            { key: 'cotizaciones', label: 'Cotizaciones', icon: 'Calculator' }
          ]
        }
      ]
    }
  },

  [UserRole.AGENTE]: {
    dashboard: {
      path: '/agente/dashboard',
      title: 'Panel de Agente',
      description: 'Gestión de clientes, pólizas y ventas',
      sections: [
        {
          title: 'PRINCIPALES',
          items: [
            { 
              key: 'clientes', 
              label: 'Clientes', 
              icon: 'Users',
              badge: {
                value: 24,
                variant: 'default'
              }
            },
            { key: 'polizas', label: 'Pólizas', icon: 'ShieldCheck' },
            { key: 'siniestros', label: 'Siniestros', icon: 'AlertTriangle' },
            { key: 'ventas', label: 'Ventas', icon: 'ShoppingCart' },
            { key: 'cobros', label: 'Cobros', icon: 'DollarSign' }
          ]
        },
        {
          title: 'GESTIÓN',
          items: [
            { key: 'leads', label: 'Leads', icon: 'UserPlus' },
            { key: 'tareas', label: 'Tareas', icon: 'ClipboardList' },
            { key: 'calendario', label: 'Calendario', icon: 'Calendar' }
          ]
        },
        {
          title: 'REPORTES',
          items: [
            { key: 'estadisticas', label: 'Estadísticas', icon: 'BarChart2' },
            { key: 'cotizaciones', label: 'Cotizaciones', icon: 'FileText' },
            { key: 'facturas', label: 'Facturas', icon: 'Receipt' }
          ]
        }
      ]
    }
  },

  [UserRole.AGENCIA]: {
    dashboard: {
      path: '/agencia/dashboard',
      title: 'Panel de Agencia',
      description: 'Gestión integral de la agencia',
      sections: [
        {
          title: 'PRINCIPALES',
          items: [
            { key: 'clientes', label: 'Clientes', icon: 'Users' },
            { key: 'polizas', label: 'Pólizas', icon: 'ShieldCheck' },
            { key: 'siniestros', label: 'Siniestros', icon: 'AlertTriangle' },
            { key: 'ventas', label: 'Ventas', icon: 'ShoppingCart' },
            { key: 'cobros', label: 'Cobros', icon: 'DollarSign' }
          ]
        },
        {
          title: 'GESTIÓN',
          items: [
            { key: 'leads', label: 'Leads', icon: 'UserPlus' },
            { key: 'agentes', label: 'Agentes', icon: 'Users' },
            { key: 'ramos', label: 'Ramos', icon: 'GitBranch' },
            { key: 'aseguradoras', label: 'Aseguradoras', icon: 'Landmark' }
          ]
        },
        {
          title: 'REPORTES',
          items: [
            { key: 'estadisticas', label: 'Estadísticas', icon: 'LineChart' },
            { key: 'cotizaciones', label: 'Cotizaciones', icon: 'FileText' },
            { key: 'archivos', label: 'Archivos', icon: 'Folder' },
            { key: 'facturas', label: 'Facturas', icon: 'Receipt' }
          ]
        },
        {
          title: 'SISTEMA',
          items: [
            { key: 'configuracion', label: 'Configuración', icon: 'Settings' }
          ]
        }
      ]
    }
  },

  [UserRole.ADMIN]: {
    dashboard: {
      path: '/admin/dashboard',
      title: 'Panel de Administración',
      description: 'Gestión global del sistema',
      sections: [
        {
          title: 'PRINCIPALES',
          items: [
            { 
              key: 'overview', 
              label: 'Vista General', 
              icon: 'Home',
              badge: {
                value: 'nuevo',
                variant: 'success'
              }
            },
            { key: 'users', label: 'Usuarios', icon: 'Users' },
            { key: 'agencies', label: 'Agencias', icon: 'Building' },
            { key: 'agents', label: 'Agentes', icon: 'UserPlus' }
          ]
        },
        {
          title: 'SISTEMA',
          items: [
            { key: 'roles', label: 'Roles', icon: 'Shield' },
            { key: 'permissions', label: 'Permisos', icon: 'Lock' },
            { key: 'logs', label: 'Logs del Sistema', icon: 'FileText' },
            { key: 'backups', label: 'Copias de Seguridad', icon: 'Database' }
          ]
        },
        {
          title: 'CONFIGURACIÓN',
          items: [
            { key: 'settings', label: 'Configuración Global', icon: 'Settings' },
            { key: 'integrations', label: 'Integraciones', icon: 'Plug' },
            { key: 'apikeys', label: 'API Keys', icon: 'Key' }
          ]
        }
      ]
    }
  }
};

// Helper functions
export function getItemPath(role: UserRole, itemKey: string): string {
  const basePath = SIDEBAR_CONFIG[role].dashboard.path;
  return `${basePath}/${itemKey}`;
}

export function getDashboardInfo(role: UserRole) {
  return {
    title: SIDEBAR_CONFIG[role].dashboard.title,
    description: SIDEBAR_CONFIG[role].dashboard.description
  };
}

export function getSectionItems(role: UserRole, sectionTitle: string): SidebarItem[] {
  return SIDEBAR_CONFIG[role].dashboard.sections
    .find(section => section.title === sectionTitle)?.items || [];
}
