import { UserRole } from "@/types/user";

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  key: string;
  label: string;
  icon: string;
}

export type SidebarConfig = Record<UserRole, {
  dashboard: {
    path: string;
    sections: SidebarSection[];
  }
}>;

export const SIDEBAR_CONFIG: SidebarConfig = {
  [UserRole.USUARIO]: {
    dashboard: {
      path: '/usuario/dashboard',
      sections: [
        {
          title: 'PRINCIPALES',
          items: [
            { key: 'mis-polizas', label: 'Mis Pólizas', icon: 'ShieldCheck' },
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
            { key: 'tareas', label: 'Tareas', icon: 'CheckSquare' },
            { key: 'calendario', label: 'Calendario', icon: 'Calendar' }
          ]
        },
        {
          title: 'REPORTES',
          items: [
            { key: 'estadisticas', label: 'Estadísticas', icon: 'BarChart2' },
            { key: 'cotizaciones', label: 'Cotizaciones', icon: 'FileText' },
            { key: 'facturas', label: 'Facturas', icon: 'File' }
          ]
        }
      ]
    }
  },

  [UserRole.AGENCIA]: {
    dashboard: {
      path: '/agencia/dashboard',
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
            { key: 'facturas', label: 'Facturas', icon: 'File' }
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
  }
};

// Helper function to get full path for a section item
export function getItemPath(role: UserRole, sectionKey: string, itemKey: string): string {
  const basePath = SIDEBAR_CONFIG[role].dashboard.path;
  return `${basePath}/${itemKey}`;
}