import { 
  Users, 
  Shield, 
  AlertTriangle, 
  ShoppingCart, 
  DollarSign,
  UserPlus,
  ClipboardList,
  Calendar,
  BarChart2,
  FileText,
  Receipt
} from "lucide-react";

export type UserRole = 'USUARIO' | 'AGENTE' | 'AGENCIA';

interface NavigationItem {
  title: string;
  icon: any;
  path: string;
  roles: UserRole[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const navigation: NavigationSection[] = [
  {
    title: "PRINCIPALES",
    items: [
      {
        title: "Clientes",
        icon: Users,
        path: "/dashboard/clientes",
        roles: ['AGENTE', 'AGENCIA']
      },
      {
        title: "Pólizas",
        icon: Shield,
        path: "/dashboard/polizas",
        roles: ['USUARIO', 'AGENTE', 'AGENCIA']
      },
      {
        title: "Siniestros",
        icon: AlertTriangle,
        path: "/dashboard/siniestros",
        roles: ['USUARIO', 'AGENTE', 'AGENCIA']
      },
      {
        title: "Ventas",
        icon: ShoppingCart,
        path: "/dashboard/ventas",
        roles: ['AGENTE', 'AGENCIA']
      },
      {
        title: "Cobros",
        icon: DollarSign,
        path: "/dashboard/cobros",
        roles: ['AGENTE', 'AGENCIA']
      }
    ]
  },
  {
    title: "GESTIÓN",
    items: [
      {
        title: "Leads",
        icon: UserPlus,
        path: "/dashboard/leads",
        roles: ['AGENTE', 'AGENCIA']
      },
      {
        title: "Tareas",
        icon: ClipboardList,
        path: "/dashboard/tareas",
        roles: ['AGENTE', 'AGENCIA']
      },
      {
        title: "Calendario",
        icon: Calendar,
        path: "/dashboard/calendario",
        roles: ['AGENTE', 'AGENCIA']
      }
    ]
  },
  {
    title: "REPORTES",
    items: [
      {
        title: "Estadísticas",
        icon: BarChart2,
        path: "/dashboard/estadisticas",
        roles: ['AGENTE', 'AGENCIA']
      },
      {
        title: "Cotizaciones",
        icon: FileText,
        path: "/dashboard/cotizaciones",
        roles: ['USUARIO', 'AGENTE', 'AGENCIA']
      },
      {
        title: "Facturas",
        icon: Receipt,
        path: "/dashboard/facturas",
        roles: ['USUARIO', 'AGENTE', 'AGENCIA']
      }
    ]
  }
];

export const getUserNavigation = (userRole: UserRole) => {
  return navigation.reduce((acc: NavigationSection[], section) => {
    const filteredItems = section.items.filter(item => 
      item.roles.includes(userRole)
    );
    
    if (filteredItems.length > 0) {
      acc.push({
        title: section.title,
        items: filteredItems
      });
    }
    
    return acc;
  }, []);
};