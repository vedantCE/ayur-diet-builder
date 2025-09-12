import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Utensils,
  FileText,
  GraduationCap,
  User,
  Heart,
  Settings,
  LogOut,
  Smartphone,
  Building2
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const practitionerItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Patients", url: "/patient-profile", icon: Users },
    { title: "Diet Builder", url: "/food-selection", icon: Utensils },
    { title: "Reports", url: "/reports", icon: FileText },
    { title: "Education", url: "/education", icon: GraduationCap },
  ];

  const patientItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Profile", url: "/patient-profile", icon: User },
    { title: "My Diet Chart", url: "/diet-chart", icon: Heart },
    { title: "Education", url: "/education", icon: GraduationCap },
  ];

  const generalItems = [
    { title: "Mobile Preview", url: "/mobile", icon: Smartphone },
    { title: "Integrations", url: "/integrations", icon: Building2 },
  ];

  const menuItems = user?.role === 'practitioner' ? practitionerItems : patientItems;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-healing rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sidebar-foreground">Ayurveda Diet</p>
              <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role} Portal</p>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools & Integration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && user && (
          <div className="space-y-3">
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-gradient-wisdom rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}