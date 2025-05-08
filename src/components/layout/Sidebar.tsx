
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  Menu,
  ShieldCheck,
  AlertTriangle,
  DollarSign,
  FileText,
  Calculator,
  Users,
  ShoppingCart,
  UserPlus,
  ClipboardList,
  Calendar,
  BarChart2,
  Receipt,
  GitBranch,
  Landmark,
  LineChart,
  Folder,
  Settings,
  Home,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { SIDEBAR_CONFIG, SidebarItem } from "@/config/sidebar.config"; 
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  
  // New state to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const sidebarConfig = SIDEBAR_CONFIG[user.role] || null;
  if (!sidebarConfig) return null;

  const getIcon = (iconName?: string) => {
    const iconProps = { className: "h-5 w-5" };
    
    switch (iconName) {
      case 'Home': return <Home {...iconProps} />;
      case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
      case 'AlertTriangle': return <AlertTriangle {...iconProps} />;
      case 'DollarSign': return <DollarSign {...iconProps} />;
      case 'FileText': return <FileText {...iconProps} />;
      case 'Calculator': return <Calculator {...iconProps} />;
      case 'Users': return <Users {...iconProps} />;
      case 'ShoppingCart': return <ShoppingCart {...iconProps} />;
      case 'UserPlus': return <UserPlus {...iconProps} />;
      case 'ClipboardList': return <ClipboardList {...iconProps} />;
      case 'Calendar': return <Calendar {...iconProps} />;
      case 'BarChart2': return <BarChart2 {...iconProps} />;
      case 'Receipt': return <Receipt {...iconProps} />;
      case 'GitBranch': return <GitBranch {...iconProps} />;
      case 'Landmark': return <Landmark {...iconProps} />;
      case 'LineChart': return <LineChart {...iconProps} />;
      case 'Folder': return <Folder {...iconProps} />;
      case 'Settings': return <Settings {...iconProps} />;
      case 'Bell': return <Bell {...iconProps} />;
      default: return <FileText {...iconProps} />;
    }
  };
  
  const renderSidebarItem = (item: SidebarItem, basePath: string) => {
    const itemPath = `${basePath}/${item.key}`;
    const isActive = location.pathname === itemPath || 
                    location.pathname.startsWith(`${itemPath}/`);
    
    return (
      <Link
        key={item.key}
        to={itemPath}
        className={cn(
          "flex items-center h-[40px] px-4 text-sm text-gray-300 hover:text-white transition-colors",
          isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600/10",
          collapsed && "justify-center"
        )}
      >
        <span className={cn(
          "flex items-center",
          !collapsed && "min-w-[24px]"
        )}>
          {getIcon(item.icon)}
        </span>
        
        {!collapsed && (
          <span className="ml-3 truncate">{item.label}</span>
        )}
        
        {!collapsed && item.badge && (
          <Badge 
            variant={item.badge.variant as any || "default"} 
            className="ml-auto"
          >
            {item.badge.value}
          </Badge>
        )}
      </Link>
    );
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const renderSidebarSections = () => {
    return sidebarConfig.dashboard.sections.map((section) => (
      <div key={section.title} className="mb-6">
        {!collapsed && (
          <h3 className="px-4 mb-2 text-xs font-medium uppercase text-gray-400">
            {section.title}
          </h3>
        )}
        <div>
          {section.items.map(item => renderSidebarItem(item, sidebarConfig.dashboard.path))}
        </div>
      </div>
    ));
  };

  const dashboardPath = `/${user.role.toLowerCase()}/dashboard`;

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-[#1B2437] transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="h-[64px] px-4 flex items-center justify-between">
        {!collapsed && (
          <h2 className="font-semibold text-xl text-white">SeguroHub</h2>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle} 
          className={cn(
            "text-gray-400 hover:text-white hover:bg-transparent",
            collapsed && "mx-auto"
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4">
        <Link
          to={dashboardPath}
          className={cn(
            "flex items-center h-[40px] px-4 text-sm text-gray-300 hover:text-white transition-colors",
            location.pathname === dashboardPath ? "bg-blue-600 text-white" : "hover:bg-blue-600/10",
            collapsed && "justify-center"
          )}
        >
          <Home className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Dashboard</span>}
        </Link>
      </div>

      <ScrollArea className="flex-1 py-4">
        {renderSidebarSections()}
      </ScrollArea>
    </div>
  );
}
