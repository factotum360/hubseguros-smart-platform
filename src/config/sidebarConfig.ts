
import { UserRole } from "@/types/user";

export interface SidebarItem {
  key: string;
  icon?: string;
  label: string;
  path?: string;
  children?: SidebarItem[];
}

export type SidebarConfig = Record<UserRole, SidebarItem[]>;

export const SIDEBAR_CONFIG: SidebarConfig = {
  [UserRole.USUARIO]: [
    {
      key: 'dashboard',
      icon: 'DashboardOutlined',
      label: 'Panel Principal',
      path: '/dashboard',
      children: [
        { key: 'resumen', label: 'Resumen General', path: '/dashboard/resumen' },
        { key: 'vencimientos', label: 'Próximos Vencimientos', path: '/dashboard/vencimientos' }
      ]
    },
    {
      key: 'polizas',
      icon: 'SecurityScanOutlined',
      label: 'Mis Pólizas',
      path: '/polizas',
      children: [
        { key: 'activas', label: 'Pólizas Activas', path: '/polizas/activas' },
        { key: 'renovaciones', label: 'Por Renovar', path: '/polizas/renovaciones' },
        { key: 'historico', label: 'Histórico', path: '/polizas/historico' }
      ]
    }
  ],
  
  [UserRole.AGENTE]: [
    {
      key: 'dashboard',
      icon: 'FundOutlined',
      label: 'Dashboard',
      path: '/dashboard',
      children: [
        { key: 'metricas', label: 'Métricas Principales', path: '/dashboard/metricas' },
        { key: 'comisiones', label: 'Comisiones', path: '/dashboard/comisiones' }
      ]
    },
    {
      key: 'clientes',
      icon: 'SecurityScanOutlined',
      label: 'Clientes',
      path: '/clientes',
      children: [
        { key: 'lista', label: 'Listado', path: '/clientes/lista' },
        { key: 'nuevo', label: 'Nuevo Cliente', path: '/clientes/nuevo' }
      ]
    },
    {
      key: 'polizas',
      icon: 'SecurityScanOutlined',
      label: 'Pólizas',
      path: '/polizas',
      children: [
        { key: 'activas', label: 'Activas', path: '/polizas/activas' },
        { key: 'vencimientos', label: 'Vencimientos', path: '/polizas/vencimientos' },
        { key: 'nuevas', label: 'Nueva Póliza', path: '/polizas/nueva' }
      ]
    }
  ],

  [UserRole.AGENCIA]: [
    {
      key: 'dashboard',
      icon: 'AreaChartOutlined',
      label: 'Dashboard Ejecutivo',
      path: '/dashboard',
      children: [
        { key: 'general', label: 'Vista General', path: '/dashboard/general' },
        { key: 'financiero', label: 'Financiero', path: '/dashboard/financiero' }
      ]
    },
    {
      key: 'agentes',
      icon: 'SecurityScanOutlined',
      label: 'Agentes',
      path: '/agentes',
      children: [
        { key: 'lista', label: 'Listado', path: '/agentes/lista' },
        { key: 'nuevo', label: 'Nuevo Agente', path: '/agentes/nuevo' },
        { key: 'rendimiento', label: 'Rendimiento', path: '/agentes/rendimiento' }
      ]
    },
    {
      key: 'polizas',
      icon: 'SecurityScanOutlined',
      label: 'Pólizas',
      path: '/polizas',
      children: [
        { key: 'resumen', label: 'Resumen', path: '/polizas/resumen' },
        { key: 'reportes', label: 'Reportes', path: '/polizas/reportes' }
      ]
    }
  ]
};
