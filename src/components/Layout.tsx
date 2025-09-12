import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showSidebar = isAuthenticated && location.pathname !== "/" && location.pathname !== "/auth";

  if (showSidebar) {
    return (
      <SidebarProvider>
        <div className="min-h-screen w-full flex">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-12 flex items-center border-b bg-background px-4">
              <SidebarTrigger />
            </header>
            <main className="flex-1 animate-fade-in">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;