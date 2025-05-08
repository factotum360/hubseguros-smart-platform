
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
  CheckSquare,
  Calendar,
  BarChart2,
  File,
  GitBranch,
  Landmark,
  LineChart,
  Folder,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { SIDEBAR_CONFIG } from "@/config/sidebarConfig";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const sidebarConfig = SIDEBAR_CONFIG[user.role] || null;
  if (!sidebarConfig) return null;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="h-5 w-5" />;
      case 'AlertTriangle': return <AlertTriangle className="h-5 w-5" />;
      case 'DollarSign': return <DollarSign className="h-5 w-5" />;
      case 'FileText': return <FileText className="h-5 w-5" />;
      case 'Calculator': return <Calculator className="h-5 w-5" />;
      case 'Users': return <Users className="h-5 w-5" />;
      case 'ShoppingCart': return <ShoppingCart className="h-5 w-5" />;
      case 'UserPlus': return <UserPlus className="h-5 w-5" />;
      case 'CheckSquare': return <CheckSquare className="h-5 w-5" />;
      case 'Calendar': return <Calendar className="h-5 w-5" />;
      case 'BarChart2': return <BarChart2 className="h-5 w-5" />;
      case 'File': return <File className="h-5 w-5" />;
      case 'GitBranch': return <GitBranch className="h-5 w-5" />;
      case 'Landmark': return <Landmark className="h-5 w-5" />;
      case 'LineChart': return <LineChart className="h-5 w-5" />;
      case 'Folder': return <Folder className="h-5 w-5" />;
      case 'Settings': return <Settings className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  const dashboardPath = sidebarConfig.dashboard.path;
  const basePath = dashboardPath;

  const renderSidebarSections = () => {
    return sidebarConfig.dashboard.sections.map((section) => {
      const isExpanded = expandedSections[section.title] || false;

      return (
        <div key={section.title} className="mb-4">
          {!collapsed && (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between text-xs font-bold text-muted-foreground",
                collapsed && "px-2"
              )}
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform", 
                  isExpanded && "transform rotate-180"
                )} 
              />
            </Button>
          )}
          
          <div className={cn(
            "mt-1 space-y-1",
            collapsed ? "block" : (isExpanded ? "block" : "hidden")
          )}>
            {section.items.map(item => {
              const itemPath = `${basePath}/${item.key}`;
              const isActive = location.pathname === itemPath || 
                              location.pathname.startsWith(`${itemPath}/`);
              
              return (
                <TooltipProvider key={item.key} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={itemPath}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        {getIcon(item.icon)}
                        {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
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
        <Button variant="ghost" size="icon" onClick={onToggle} className={cn(collapsed && "mx-auto")}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        {renderSidebarSections()}
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
