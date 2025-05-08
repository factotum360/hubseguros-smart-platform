
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Users,
  BarChart,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { SIDEBAR_CONFIG, SidebarItem } from "@/config/sidebarConfig";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const sidebarItems = SIDEBAR_CONFIG[user.role] || [];

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'DashboardOutlined':
        return <LayoutDashboard className="h-5 w-5" />;
      case 'SecurityScanOutlined':
        return <ShieldCheck className="h-5 w-5" />;
      case 'FundOutlined':
        return <BarChart className="h-5 w-5" />;
      case 'AreaChartOutlined':
        return <BarChart className="h-5 w-5" />;
      default:
        return <LayoutDashboard className="h-5 w-5" />;
    }
  };

  const toggleExpandItem = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderSidebarItems = (items: SidebarItem[]) => {
    return items.map((item) => {
      const isActive = location.pathname === item.path || 
                      (item.children && item.children.some(child => location.pathname === child.path));
      const isExpanded = expandedItems[item.key];

      return (
        <div key={item.key} className="mb-2">
          {item.children ? (
            <>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  collapsed && "px-2"
                )}
                onClick={() => toggleExpandItem(item.key)}
              >
                <div className="flex items-center">
                  {getIcon(item.icon)}
                  {!collapsed && <span className="ml-2">{item.label}</span>}
                </div>
                {!collapsed && (
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform", 
                      isExpanded && "transform rotate-180"
                    )} 
                  />
                )}
              </Button>
              {isExpanded && !collapsed && (
                <div className="pl-9 mt-1 space-y-1">
                  {item.children.map(child => (
                    <Link
                      key={child.key}
                      to={child.path || "#"}
                      className={cn(
                        "block px-2 py-1 rounded-md text-sm",
                        location.pathname === child.path && "bg-sidebar-accent/50 font-medium"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link to={item.path || "#"}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  collapsed && "px-2"
                )}
              >
                {getIcon(item.icon)}
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        "border-r h-screen flex flex-col bg-sidebar transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <h2 className="font-semibold text-xl text-hubseguros-primary">HubSeguros</h2>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        {renderSidebarItems(sidebarItems)}
      </ScrollArea>

      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-gray-500">
            {user.name} ({user.role})
          </div>
        )}
      </div>
    </div>
  );
}
